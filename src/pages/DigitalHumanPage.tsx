import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Video, 
  Search, 
  Plus, 
  Play, 
  Settings, 
  MoreVertical,
  User,
  MessageCircle,
  Zap,
  Mic,
  Camera,
  Heart
} from 'lucide-react';

interface DigitalHuman {
  id: string;
  name: string;
  avatar: string;
  category: string;
  description: string;
  status: 'online' | 'busy' | 'offline';
  capabilities: string[];
}

const MOCK_HUMANS: DigitalHuman[] = [
  {
    id: '1',
    name: '艾米 (Amy)',
    avatar: 'https://picsum.photos/seed/dh1/300',
    category: '虚拟主播',
    description: '擅长互动直播、情感咨询与双语服务。',
    status: 'online',
    capabilities: ['实时渲染', '语音识别', '情感陪伴']
  },
  {
    id: '2',
    name: '小川 (Chuan)',
    avatar: 'https://picsum.photos/seed/dh2/300',
    category: '品牌代言人',
    description: '专业的品牌推广大使，支持 24/7 在线业务咨询。',
    status: 'busy',
    capabilities: ['业务引导', '知识问答']
  },
  {
    id: '3',
    name: '灵儿',
    avatar: 'https://picsum.photos/seed/dh3/300',
    category: '数字导游',
    description: '带你云游四方，深度解读各地文化底蕴。',
    status: 'online',
    capabilities: ['多国语言', 'AR互动']
  }
];

export default function DigitalHumanPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'streaming' | 'business' | 'companion'>('all');

  return (
    <div className="flex-1 flex flex-col bg-surface overflow-hidden">
      {/* Tabs & Search */}
      <div className="bg-white border-b border-border-base px-4 py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: 'all', label: '全部' },
              { id: 'streaming', label: '虚拟主播' },
              { id: 'business', label: '业务专家' },
              { id: 'companion', label: '情感陪伴' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:bg-gray-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input 
              type="text" 
              placeholder="搜索数字人..."
              className="w-full bg-surface border border-border-base rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_HUMANS.map(human => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={human.id}
              className="bg-white rounded-3xl border border-border-base overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col"
            >
              {/* Media Section */}
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img 
                  src={human.avatar} 
                  alt={human.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-all">
                    <Play fill="white" size={24} className="ml-1" />
                  </button>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[10px] font-black text-text-main uppercase tracking-wider">{human.category}</span>
                </div>
                {human.status === 'online' && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-green-600">在线</span>
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-black text-text-main">{human.name}</h3>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-text-muted hover:text-primary transition-colors"><Heart size={18} /></button>
                    <button className="p-1.5 text-text-muted hover:text-primary transition-colors"><MoreVertical size={18} /></button>
                  </div>
                </div>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-4">{human.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {human.capabilities.map(cap => (
                    <span key={cap} className="px-2 py-1 bg-surface border border-border-base rounded-lg text-[10px] font-bold text-text-muted">{cap}</span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border-base flex gap-3">
                  <button className="flex-1 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                    <MessageCircle size={14} />
                    开始对话
                  </button>
                  <button className="w-10 h-10 bg-surface text-text-main rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all">
                    <Video size={14} />
                  </button>
                  <button className="w-10 h-10 bg-surface text-text-main rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all">
                    <Settings size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Create New Placeholder */}
          <button className="rounded-3xl border-2 border-dashed border-border-base flex flex-col items-center justify-center gap-4 p-8 hover:border-primary hover:bg-primary/5 transition-all text-text-muted hover:text-primary min-h-[400px]">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <p className="font-bold">新增数字人</p>
              <p className="text-xs mt-1">上传形象或使用模板生成</p>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Floating Stats (Optional Premium Feel) */}
      <div className="px-6 py-4 bg-white border-t border-border-base">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-black text-text-muted uppercase tracking-widest">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Mic size={14} /> 语音引擎: V3.5</span>
            <span className="flex items-center gap-2"><Camera size={14} /> 渲染引擎: RTX-On</span>
            <span className="flex items-center gap-2"><Zap size={14} /> 平均延迟: 120ms</span>
          </div>
          <div className="flex gap-4">
            <span className="text-primary tracking-tighter">Premium Enterprise Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
