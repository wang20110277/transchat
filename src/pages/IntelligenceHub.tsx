import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Plus, 
  Cpu, 
  Database, 
  ChevronRight, 
  Search,
  Settings2,
  Mic,
  Camera,
  ArrowLeft,
  Settings,
  Zap,
  Play,
  Terminal,
  FileCode,
  FileText,
  Clock,
  MoreVertical,
  Layers,
  ShieldAlert,
  CheckCircle2,
  Circle,
  BrainCircuit,
  Workflow,
  Wand2,
  Command,
  Layout,
  Code2,
  Globe2,
  X,
  Image as ImageIcon,
  Plug
} from 'lucide-react';

// --- Types ---
interface Skill {
  id: string;
  name: string;
  icon: any;
  description: string;
  category: 'web' | 'data' | 'system' | 'ai';
}

const AVAILABLE_SKILLS: Skill[] = [
  { id: 's1', name: '全网搜索', icon: Globe2, description: '接入 Google Search 实时获取网络资讯', category: 'web' },
  { id: 's2', name: 'Python 执行', icon: Code2, description: '在安全沙箱中运行 Python 代码', category: 'system' },
  { id: 's3', name: 'SQL 查询', icon: Database, description: '执行结构化查询并生成分析图表', category: 'data' },
  { id: 's4', name: 'PDF 处理', icon: FileText, description: '深度解析 PDF 文档内容与结构', category: 'data' },
  { id: 's5', name: '图像生成', icon: ImageIcon, description: '调用 Imagen 3 生成高质量图像', category: 'ai' },
  { id: 's6', name: 'API 调用', icon: Plug, description: '通过 OpenAPI 定义接入第三方服务', category: 'web' },
];

interface AIBot {
  id: string;
  name: string;
  avatar: string;
  description: string;
  model: string;
  knowledgeBases: number;
  status: 'online' | 'offline';
  category: '我的助手' | '推荐助手';
  isPrivate: boolean;
  isContributed?: boolean;
  isSubscribed?: boolean;
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  status: 'idle' | 'running' | 'offline';
  skills: string[];
  lastTask: string;
}

// --- Mock Data ---
const MOCK_BOTS: AIBot[] = [
  { id: 'b1', name: '法律顾问 - 律小能', avatar: 'https://picsum.photos/seed/b1/100', description: '专精于合同法与民事纠纷，为您提供专业的法律意见。', model: 'Gemini-1.5-Pro', knowledgeBases: 12, status: 'online', category: '推荐助手', isPrivate: false, isSubscribed: true },
  { id: 'b2', name: '极速翻译官', avatar: 'https://picsum.photos/seed/b2/100', description: '支持 50+ 语言实时互译，精准捕捉行文语气。', model: 'GPT-4o', knowledgeBases: 0, status: 'online', category: '我的助手', isPrivate: true, isContributed: false },
  { id: 'b3', name: '代码评审专家', avatar: 'https://picsum.photos/seed/b3/100', description: '深度理解 Git 差异，为您提供重构与优化建议。', model: 'Claude-3.5-Sonnet', knowledgeBases: 5, status: 'offline', category: '推荐助手', isPrivate: false, isSubscribed: false },
  { id: 'b4', name: '资产配置官', avatar: 'https://picsum.photos/seed/b4/100', description: '基于现代组合理论，为您定制家庭资产配置方案。', model: 'Gemini-1.5-Flash', knowledgeBases: 2, status: 'online', category: '我的助手', isPrivate: true, isContributed: true },
];

const MOCK_AGENTS: Agent[] = [
  { id: 'a1', name: '数据分析官', avatar: 'https://picsum.photos/seed/a1/100', description: '自动处理 CSV/Excel，提取关键指标并生成可视化报告。', status: 'running', skills: ['文件管理', '代码执行'], lastTask: '正在生成 Q1 营收趋势图...' },
  { id: 'a2', name: '信息采集员', avatar: 'https://picsum.photos/seed/a2/100', description: '全网检索资讯，自动去重并按主题分类归档。', status: 'idle', skills: ['浏览器控制', 'API调用'], lastTask: '10 分钟前完成了“低代码行业动态”采集' },
];

export default function IntelligenceHub() {
  const [activeMainTab, setActiveMainTab] = useState<'assistant' | 'agent'>('assistant');
  const [activeSubTab, setActiveSubTab] = useState('全部');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(MOCK_AGENTS[0].id);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSkillRepo, setShowSkillRepo] = useState(false);

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-surface font-sans">
      {/* Header */}
      <div className="bg-white p-4 border-b border-border-base flex-shrink-0 z-20">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-black text-text-main tracking-tighter flex items-center gap-2">
                <BrainCircuit className="text-primary" size={24} />
                智能中心
              </h1>
              <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] mt-0.5">Intelligence Hub</p>
            </div>
            
            {/* Desktop Switcher */}
            <div className="hidden md:flex bg-surface p-1 rounded-xl">
              <button 
                onClick={() => setActiveMainTab('assistant')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${activeMainTab === 'assistant' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
              >
                <Bot size={14} />
                AI 助手
              </button>
              <button 
                onClick={() => setActiveMainTab('agent')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${activeMainTab === 'agent' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
              >
                <Zap size={14} />
                智能体
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Switcher Toggle */}
            <div className="flex md:hidden bg-surface p-1 rounded-xl border border-border-base">
              <button 
                onClick={() => setActiveMainTab('assistant')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeMainTab === 'assistant' ? 'bg-white shadow-sm text-primary' : 'text-text-muted'}`}
              >
                <Bot size={20} />
              </button>
              <button 
                onClick={() => setActiveMainTab('agent')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeMainTab === 'agent' ? 'bg-white shadow-sm text-primary' : 'text-text-muted'}`}
              >
                <Zap size={20} />
              </button>
            </div>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-10 h-10 md:w-auto md:px-5 md:py-2 ai-gradient-bg text-white font-black rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs uppercase tracking-tight shadow-lg shadow-primary/20"
            >
              <Plus size={14} strokeWidth={3} />
              <span className="hidden md:block">新建{activeMainTab === 'assistant' ? '助手' : '智能体'}</span>
            </button>
          </div>
        </div>
      </div>

      {activeMainTab === 'assistant' ? (
        <AssistantView activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />
      ) : (
        <AgentView selectedAgentId={selectedAgentId} setSelectedAgentId={setSelectedAgentId} />
      )}

      {/* Shared Create Modal Mock */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8">
                <h2 className="text-2xl font-black text-text-main mb-6 tracking-tight flex items-center gap-2">
                  <Plus className="text-primary" />
                  新建{activeMainTab === 'assistant' ? ' AI 助手' : ' 自动化智能体'}
                </h2>
                <div className="space-y-6">
                   <div className="flex gap-6 items-center">
                    <div className="w-20 h-20 bg-surface rounded-2xl border-2 border-dashed border-border-base flex items-center justify-center text-text-muted cursor-pointer hover:bg-white hover:border-primary transition-all group">
                      <Camera size={24} className="group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 space-y-2 text-left">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">设定名称 / Identity</label>
                      <input className="w-full bg-surface border border-border-base rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-sm" placeholder="例如：法律专家、数据分析助手..." />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">底层架构 / Model</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 border-2 border-primary bg-primary/5 rounded-xl text-xs font-black flex items-center gap-2 text-primary">
                        <Cpu size={14} />
                        Gemini 1.5 Pro
                      </button>
                      <button className="p-3 border-2 border-border-base rounded-xl text-xs font-black flex items-center gap-2 text-text-muted hover:border-primary hover:text-text-main transition-colors">
                        <Cpu size={14} />
                        GPT-4o
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">核心逻辑 / Prompting</label>
                    <textarea 
                      className="w-full bg-surface border border-border-base rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-xs h-32 resize-none" 
                      placeholder="在这里定义其人格、能力边界及交互规则..."
                    />
                  </div>

                  {activeMainTab === 'assistant' && (
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                      <ShieldAlert className="text-amber-500 mt-0.5" size={18} />
                      <div className="flex-1">
                        <p className="text-[11px] font-black text-amber-800 uppercase tracking-tight">私有化部署模式</p>
                        <p className="text-[10px] text-amber-700/70 font-medium leading-relaxed mt-1">
                          新建助手默认仅您个人可见。您可以后续选择将其贡献到“推荐助手”社区，经过审核后供传书所有用户订阅使用。
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Skills Section for Agents */}
                  {activeMainTab === 'agent' && (
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">赋能组件 / Skills</label>
                        <button 
                          onClick={() => setShowSkillRepo(true)}
                          className="text-[10px] font-black text-primary flex items-center gap-1 hover:underline"
                        >
                          <Plus size={12} />
                          技能仓库
                        </button>
                      </div>
                      
                      {selectedSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedSkills.map(id => {
                            const skill = AVAILABLE_SKILLS.find(s => s.id === id);
                            if (!skill) return null;
                            const Icon = skill.icon;
                            return (
                              <div key={id} className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary border border-primary/20 rounded-lg text-xs font-black">
                                <Icon size={12} />
                                {skill.name}
                                <button onClick={() => toggleSkill(id)} className="ml-1 hover:text-red-500">
                                  <X size={12} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <button 
                          onClick={() => setShowSkillRepo(true)}
                          className="w-full py-4 border-2 border-dashed border-border-base rounded-2xl flex flex-col items-center justify-center gap-2 text-text-muted hover:border-primary hover:text-primary transition-all group"
                        >
                          <Wand2 size={24} className="opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">暂无技能，点击从仓库加载</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-surface p-6 flex gap-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 text-xs font-black text-text-muted uppercase tracking-widest"
                >
                  取消
                </button>
                <button className="flex-1 py-3 ai-gradient-bg text-white font-black rounded-xl text-xs shadow-lg shadow-primary/20 active:scale-95 transition-all uppercase tracking-widest">
                  完成部署
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skill Repository Slider */}
      <AnimatePresence>
        {showSkillRepo && (
          <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSkillRepo(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full md:w-[450px] h-[80vh] md:h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border-base flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-text-main tracking-tighter">技能仓库</h3>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-0.5">Skill Repository</p>
                </div>
                <button 
                  onClick={() => setShowSkillRepo(false)}
                  className="p-2 hover:bg-surface rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 bg-surface border-b border-border-base">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input className="w-full bg-white border border-border-base rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20" placeholder="搜索技能组件..." />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {AVAILABLE_SKILLS.map(skill => {
                  const Icon = skill.icon;
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <div 
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`
                        p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4
                        ${isSelected ? 'bg-primary/5 border-primary' : 'bg-white border-border-base hover:border-text-muted'}
                      `}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-surface text-text-muted'}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-sm font-black text-text-main tracking-tight">{skill.name}</h4>
                          <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">{skill.category}</span>
                        </div>
                        <p className="text-[11px] text-text-muted font-medium line-clamp-1">{skill.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-border-base'}`}>
                        {isSelected && <CheckCircle2 size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 bg-surface border-t border-border-base">
                <button 
                  onClick={() => setShowSkillRepo(false)}
                  className="w-full py-4 bg-text-main text-white font-black rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-black/10 active:scale-95 transition-all"
                >
                  确认加载 ({selectedSkills.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub Views ---

function AssistantView({ activeSubTab, setActiveSubTab }: { activeSubTab: string, setActiveSubTab: (t: string) => void }) {
  const filteredBots = MOCK_BOTS.filter(bot => {
    if (activeSubTab === '全部') {
      return bot.category === '我的助手' || bot.isSubscribed;
    }
    return bot.category === activeSubTab;
  });

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="bg-white px-4 border-b border-border-base flex-shrink-0 overflow-x-auto no-scrollbar">
        <div className="max-w-6xl mx-auto flex gap-8">
          {['全部', '我的助手', '推荐助手'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`py-4 text-[10px] font-black transition-all relative uppercase tracking-[0.2em] whitespace-nowrap ${activeSubTab === tab ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              {tab}
              {activeSubTab === tab && <motion.div layoutId="sub-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBots.map(bot => (
              <motion.div 
                key={bot.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-[2rem] p-6 border border-border-base shadow-sm group hover:border-primary transition-all flex flex-col gap-5 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl border-2 border-surface p-0.5 overflow-hidden group-hover:border-primary transition-colors bg-surface shadow-sm">
                      <img src={bot.avatar} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${bot.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                  <div className="flex gap-2">
                    <button className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-primary rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"><Settings2 size={16} /></button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-black text-text-main text-base group-hover:text-primary transition-colors tracking-tight">{bot.name}</h3>
                  <p className="text-[11px] text-text-muted line-clamp-2 font-medium leading-relaxed">{bot.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-surface text-primary border border-border-base rounded-full text-[9px] font-black uppercase tracking-widest group-hover:bg-primary/10 transition-colors">
                    <Cpu size={12} />
                    {bot.model}
                  </div>
                  {bot.isPrivate && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-[9px] font-black uppercase tracking-widest">
                      <ShieldAlert size={12} />
                      私有化
                    </div>
                  )}
                  {bot.knowledgeBases > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-surface text-text-muted border border-border-base rounded-full text-[9px] font-black uppercase tracking-widest">
                      <Database size={12} />
                      {bot.knowledgeBases}KB
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-surface text-primary font-black rounded-2xl text-[10px] hover:bg-primary hover:text-white transition-all uppercase tracking-[0.2em] border border-border-base group-hover:border-primary">
                    即刻对话
                  </button>
                  {bot.isPrivate && (
                    <button 
                      className={`
                        px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all border
                        ${bot.isContributed 
                          ? 'bg-green-50 text-green-600 border-green-200 cursor-default' 
                          : 'bg-white text-text-muted border-border-base hover:border-primary hover:text-primary active:scale-95'}
                      `}
                      title={bot.isContributed ? "已贡献到社区" : "贡献到推荐助手社区"}
                    >
                      {bot.isContributed ? <CheckCircle2 size={16} /> : <Globe2 size={16} />}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-linear-to-br from-text-main to-gray-800 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />
            
            <div className="z-10 flex-1 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Integrated RAG Protocol</span>
                <h2 className="text-3xl font-black tracking-tighter leading-tight">通过知识库<br />解锁无限认知</h2>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-md font-medium">
                接入您的私有文档库，让 AI 深入理解您的专业领域。支持 PDF, TXT, Word 及网页深度抓取，构建您的专属大脑。
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-primary text-white font-black rounded-2xl text-[10px] transition-all hover:scale-105 shadow-xl shadow-primary/20 uppercase tracking-[0.2em]">
                  连接外部资产
                </button>
                <button className="px-8 py-3 bg-white/10 text-white font-black rounded-2xl text-[10px] transition-all hover:bg-white/20 border border-white/10 uppercase tracking-[0.2em]">
                  查看技术文档
                </button>
              </div>
            </div>
            <div className="z-10 w-40 h-40 md:w-56 md:h-56 bg-white/5 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center border border-white/10 rotate-[15deg] shadow-2xl group hover:rotate-0 transition-transform duration-700">
               <Database size={80} className="text-primary group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentView({ selectedAgentId, setSelectedAgentId }: { selectedAgentId: string | null, setSelectedAgentId: (id: string) => void }) {
  const selectedAgent = MOCK_AGENTS.find(a => a.id === selectedAgentId);

  return (
    <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
      {/* Agent Sidebar */}
      <div className={`
        ${selectedAgentId ? 'hidden md:flex' : 'flex'}
        w-full md:w-80 border-r border-border-base bg-white flex-col h-full flex-shrink-0
      `}>
        <div className="p-4 border-b border-border-base flex items-center justify-between bg-surface/30">
          <h2 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">存量任务列表</h2>
          <button className="p-1.5 text-text-muted hover:text-text-main"><Search size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {MOCK_AGENTS.map(agent => (
            <div 
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`
                mx-2 px-4 py-4 mb-1 rounded-2xl cursor-pointer transition-all border-2
                ${selectedAgentId === agent.id ? 'bg-surface border-primary shadow-sm' : 'border-transparent hover:bg-surface/50'}
              `}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border-base bg-white p-0.5">
                    <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className={`
                    absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
                    ${agent.status === 'running' ? 'bg-primary animate-pulse' : agent.status === 'idle' ? 'bg-green-500' : 'bg-gray-300'}
                  `} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm text-text-main truncate tracking-tight">{agent.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'running' ? 'bg-primary' : 'bg-green-500'}`} />
                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">{agent.status}</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-text-muted line-clamp-2 font-medium leading-[1.4]">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Detail */}
      {selectedAgent ? (
        <div className={`
          ${selectedAgentId ? 'flex' : 'hidden md:flex'}
          flex-1 flex flex-col bg-surface overflow-hidden
        `}>
          <div className="h-16 bg-white border-b border-border-base px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedAgentId(null)}
                className="md:hidden p-2 -ml-2 text-text-muted hover:text-primary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex flex-col">
                <h2 className="text-sm font-black text-text-main uppercase tracking-tight">{selectedAgent.name}</h2>
                <div className="flex gap-2 mt-1">
                  {selectedAgent.skills.map(s => (
                    <span key={s} className="text-[8px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">#{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2 bg-text-main text-white font-black rounded-xl text-[10px] hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-black/10 uppercase tracking-widest">
                <Play size={12} fill="white" strokeWidth={3} />
                <span className="hidden sm:inline">唤醒</span>
              </button>
              <button className="p-2 border border-border-base text-text-muted rounded-xl hover:text-text-main hover:border-text-main transition-all">
                <Settings2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-6 lg:flex-1 lg:overflow-y-auto">
              {/* Active Workflow Card */}
              <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-border-base shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Workflow size={120} className="text-text-main rotate-12" />
                </div>
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-surface text-primary rounded-3xl flex items-center justify-center border border-border-base shadow-sm flex-shrink-0">
                      <Terminal size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-black text-text-main tracking-tight">Q1 营收审计及深度清洗</h4>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-1">Session Protocol: 0x402</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <TaskDetailStep status="done" label="检测数据完整性并补全索引" time="12:01" />
                    <TaskDetailStep status="done" label="逻辑审计: 过滤非标准记录" time="12:03" />
                    <TaskDetailStep status="active" label="跨表联立: 匹配全局成本分布" time="12:05" />
                    <TaskDetailStep status="pending" label="自动生成可视化研判报告" />
                  </div>

                  <div className="pt-6 border-t border-border-base flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 px-4 py-2 bg-surface rounded-full border border-border-base w-full sm:w-auto">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full"
                      />
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">计算中</span>
                    </div>
                    <button className="text-[10px] font-black text-red-400 hover:text-red-600 transition-colors uppercase tracking-[0.2em]">强制中断</button>
                  </div>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    <Layers size={14} />
                    实时系统日志
                  </h3>
                </div>
                <div className="bg-text-main rounded-[1.5rem] p-5 text-[10px] font-mono text-white/40 leading-relaxed shadow-2xl border border-white/5 space-y-1">
                  <div className="flex gap-2">
                    <span className="text-primary font-black">[READY]</span>
                    <span>Env virtualized successfully.</span>
                  </div>
                  <div className="flex gap-2 text-white/80">
                    <span className="animate-pulse">_</span>
                    <span>Execution cursor at Line 245...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Monitor Panel */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-6 border border-border-base shadow-sm">
                 <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">关联资产</h4>
                 <div className="space-y-2">
                   <MonitorAsset icon={FileText} name="audit_report_q1.xlsx" size="2.4MB" status="已挂载" />
                   <MonitorAsset icon={FileCode} name="engine.kernel.py" size="12KB" status="运行中" active />
                 </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 border border-border-base shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                   <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">算力消耗</h4>
                   <span className="text-[8px] font-black text-green-500 uppercase px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">Optimal</span>
                 </div>
                 
                 <div className="space-y-6">
                    <MonitorMetric label="CPU Usage" value={42} color="bg-primary" />
                    <MonitorMetric label="RAM Capacity" value={68} color="bg-blue-500" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
           <Zap size={48} className="mb-4 opacity-5" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">请从侧边栏选择活跃智能体</p>
        </div>
      )}
    </div>
  );
}

// --- Internal Helper Components ---

function TaskDetailStep({ status, label, time }: { status: 'done' | 'active' | 'pending', label: string, time?: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`
        relative z-10 w-7 h-7 rounded-2xl flex items-center justify-center border-2
        ${status === 'done' ? 'bg-green-500 border-green-300 text-white' : status === 'active' ? 'bg-primary border-primary/30 text-white shadow-lg shadow-primary/20' : 'bg-surface border-border-base text-text-muted'}
      `}>
        {status === 'done' ? <CheckCircle2 size={16} /> : status === 'active' ? <Clock size={16} /> : <Circle size={16} />}
      </div>
      <div className="flex-1 pt-0.5">
        <p className={`text-sm font-black tracking-tight ${status === 'active' ? 'text-text-main' : 'text-text-muted opacity-80'}`}>{label}</p>
        {status === 'active' && <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">核对中...</span>}
      </div>
      {time && <span className="text-[10px] font-black text-text-muted opacity-40 pt-1">@{time}</span>}
    </div>
  );
}

function MonitorAsset({ icon: Icon, name, size, status, active }: { icon: any, name: string, size: string, status: string, active?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${active ? 'bg-surface border-primary' : 'bg-white border-border-base hover:bg-surface'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-surface text-text-muted'}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-black text-text-main truncate tracking-tight">{name}</div>
        <div className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">{size} • {status}</div>
      </div>
      <MoreVertical size={14} className="text-text-muted" />
    </div>
  );
}

function MonitorMetric({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-muted">
        <span>{label}</span>
        <span className="text-text-main">{value}%</span>
      </div>
      <div className="h-1.5 bg-surface border border-border-base rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
