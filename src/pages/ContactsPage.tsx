import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  UserPlus, 
  Users,
  Hash, 
  MapPin, 
  ChevronRight, 
  Star,
  MoreVertical,
  Filter
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: '阿强', avatar: 'https://picsum.photos/seed/a1/100', tagline: '保持饥饿，保持愚蠢。', status: 'online' },
  { id: '2', name: '李博', avatar: 'https://picsum.photos/seed/l1/100', tagline: '正在写代码...', status: 'away' },
  { id: '3', name: '王敏', avatar: 'https://picsum.photos/seed/w1/100', tagline: '忙碌中，有事留言。', status: 'offline', lastSeen: '2小时前' },
  { id: '4', name: '张伟', avatar: 'https://picsum.photos/seed/z1/100', tagline: '想去大理。', status: 'online' },
  { id: '5', name: '陈静', avatar: 'https://picsum.photos/seed/c1/100', tagline: '设计即生活。', status: 'online' },
  { id: '6', name: '赵六', avatar: 'https://picsum.photos/seed/z2/100', tagline: '早点下班。', status: 'offline', lastSeen: '昨天' },
];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-surface font-sans">
      {/* Header Section */}
      <div className="p-4 border-b border-border-base bg-white flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-black text-text-main tracking-tight">通讯录</h1>
          <button className="p-2 bg-surface text-primary rounded-lg hover:bg-primary/5 transition-colors">
            <UserPlus size={20} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索姓名、标签..."
            className="w-full bg-surface border border-border-base rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-y-auto bg-surface">
        <div className="max-w-4xl mx-auto w-full p-4">
          {/* Quick Shortcuts */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { icon: UserPlus, label: '新的申请', count: 3, color: 'bg-primary' },
              { icon: Users, label: '我的群组', count: 12, color: 'bg-accent' },
              { icon: Star, label: '常用联系人', count: 5, color: 'bg-yellow-400' },
              { icon: MapPin, label: '附近的人', count: 8, color: 'bg-green-500' },
            ].map((item, i) => (
              <motion.button 
                key={i}
                whileHover={{ y: -2 }}
                className="bg-white p-4 rounded-2xl border border-border-base flex flex-col items-start gap-2 hover:shadow-md transition-all text-left"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                  <item.icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-text-muted tracking-tight uppercase">{item.label}</div>
                  <div className="text-lg font-black text-text-main">{item.count}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Contact List (Structured Grid) */}
          <div className="bg-white border border-border-base rounded-2xl overflow-hidden shadow-sm shadow-black/5">
            <div className="p-4 border-b border-border-base flex items-center justify-between bg-surface/30">
              <h3 className="text-[10px] font-black text-text-muted tracking-[0.1em] uppercase">联系人列表</h3>
              <button className="p-2 text-text-muted hover:text-text-main transition-colors">
                <Filter size={16} />
              </button>
            </div>

            <div className="divide-y divide-border-base">
              {MOCK_CONTACTS.map((contact, idx) => (
                <motion.div 
                  key={contact.id}
                  className="group flex flex-row items-center justify-between p-4 hover:bg-surface transition-all cursor-pointer border-l-4 border-transparent hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border-base group-hover:border-primary transition-colors">
                        <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-500' : contact.status === 'away' ? 'bg-yellow-400' : 'bg-text-muted'}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-text-main leading-tight">{contact.name}</h4>
                      <p className="text-[11px] text-text-muted font-medium truncate max-w-[150px]">{contact.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] font-bold text-text-muted">{contact.status === 'online' ? '在线' : contact.lastSeen || '离线'}</div>
                    </div>
                    <ChevronRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-surface/30 border-t border-border-base text-center">
               <button className="text-[10px] font-black text-primary hover:underline tracking-widest uppercase">
                  查看全部 142 位联系人
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
