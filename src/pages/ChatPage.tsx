import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MoreHorizontal, 
  MessageSquare, 
  Users, 
  Compass, 
  Bot, 
  Zap, 
  Settings, 
  Plus, 
  MessageCircle,
  Send, 
  Image as ImageIcon, 
  Paperclip, 
  Mic, 
  Smile, 
  Video, 
  Phone,
  Info,
  Check,
  CheckCheck,
  ChevronLeft,
  Camera,
  Cpu
} from 'lucide-react';

// Types
type ChatType = 'person' | 'ai' | 'agent' | 'group';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: ChatType;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  status?: string;
}

const MOCK_CHATS: Chat[] = [
  { id: '1', name: '张小帅', avatar: 'https://picsum.photos/seed/p1/100', type: 'person', lastMessage: '那我们明天下午见？', time: '14:20', unread: 2, online: true },
  { id: '2', name: 'GPT-4o 助手', avatar: 'https://picsum.photos/seed/ai1/100', type: 'ai', lastMessage: '我已经为您整理好了方案，请查收。', time: '12:05', unread: 0, online: true, status: 'Gemini-1.5-Pro' },
  { id: '3', name: '设计灵感群', avatar: 'https://picsum.photos/seed/g1/100', type: 'group', lastMessage: '王五: 这个配色方案不错', time: '10:45', unread: 15, online: false },
  { id: '4', name: '文件管理 Agent', avatar: 'https://picsum.photos/seed/ag1/100', type: 'agent', lastMessage: '任务完成：已将 12 个文件归类到“设计”文件夹', time: '昨天', unread: 0, online: true },
  { id: '5', name: '李漂亮', avatar: 'https://picsum.photos/seed/p2/100', type: 'person', lastMessage: '[语音 5"]', time: '昨天', unread: 0, online: false },
];

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(MOCK_CHATS[1].id);
  const [activeTab, setActiveTab] = useState<'all' | 'person' | 'ai' | 'agent' | 'group'>('all');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);
  const [messageText, setMessageText] = useState('');

  const selectedChat = MOCK_CHATS.find(c => c.id === selectedChatId);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackToList = () => {
    setShowMobileList(true);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    if (isMobileView) setShowMobileList(false);
  };

  return (
    <div className="flex-1 flex overflow-hidden relative bg-surface">
      {/* Chat List Panel */}
        <div className={`
          ${isMobileView ? (showMobileList ? 'w-full' : 'absolute -left-full') : 'w-80'}
          bg-white border-r border-border-base flex flex-col transition-all duration-300 z-20
        `}>
          {/* Header */}
          <div className="p-4 border-b border-border-base">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-black text-text-main tracking-tight">消息</h1>
              <button className="p-2 bg-surface text-primary rounded-lg hover:bg-primary/5 transition-colors">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="搜索联系人、消息..."
                className="w-full bg-surface border border-border-base rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {['全部', '真人', 'AI助手', '智能体', '群组'].map((t, idx) => (
                <button 
                  key={t}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-2">
            {MOCK_CHATS.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`
                  px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors
                  ${selectedChatId === chat.id && !isMobileView ? 'bg-primary/5 border-r-2 border-primary' : 'hover:bg-gray-50'}
                `}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full overflow-hidden ${chat.type === 'ai' || chat.type === 'agent' ? 'ring-2 ring-purple-400 p-0.5' : ''}`}>
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full rounded-full object-cover" />
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {chat.type === 'ai' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Bot className="text-white w-3 h-3" />
                    </div>
                  )}
                  {chat.type === 'agent' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Zap className="text-white w-3 h-3" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-bold text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <div className="bg-primary text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Detail Panel */}
        <div className={`
          flex-1 bg-white flex flex-col z-10
          ${isMobileView ? (showMobileList ? 'hidden' : 'w-full') : ''}
        `}>
          {selectedChat ? (
            <>
              {/* Detail Header */}
              <div className="h-14 flex items-center justify-between px-4 border-b border-border-base flex-shrink-0 bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  {isMobileView && (
                    <button onClick={handleBackToList} className="p-2 -ml-2 text-text-muted hover:bg-surface rounded-lg">
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-text-main truncate">{selectedChat.name}</h2>
                      {selectedChat.online && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                    </div>
                    {selectedChat.status ? (
                      <span className="text-[10px] font-bold text-accent tracking-wider">{selectedChat.status}</span>
                    ) : (
                      <span className="text-[10px] text-text-muted font-medium uppercase tracking-tight">{selectedChat.online ? '当前在线' : '离线'}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <HeaderAction icon={Search} />
                  <HeaderAction icon={MoreHorizontal} />
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-surface">
                <div className="text-center">
                  <span className="text-[10px] text-text-muted bg-white border border-border-base px-3 py-1 rounded-full font-bold uppercase tracking-wider">今天 10:45</span>
                </div>

                {/* Received Message */}
                <div className="flex items-end gap-2 max-w-[80%]">
                  <img src={selectedChat.avatar} className="w-8 h-8 rounded-full mb-1" />
                  <div className="space-y-1">
                    <div className={`p-3 rounded-2xl rounded-bl-sm text-sm shadow-sm ${selectedChat.type === 'ai' ? 'bg-white border-l-4 border-purple-500' : 'bg-white text-gray-800'}`}>
                      {selectedChat.lastMessage}
                      {selectedChat.type === 'ai' && (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex gap-4">
                          <button className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors uppercase">复制</button>
                          <button className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors uppercase">重新生成</button>
                          <button className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors uppercase">好评</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sent Message */}
                <div className="flex items-end gap-2 max-w-[80%] ml-auto flex-row-reverse">
                  <img src="https://picsum.photos/seed/user/100" className="w-8 h-8 rounded-full mb-1" />
                  <div className="space-y-1">
                    <div className="p-3 rounded-2xl rounded-br-sm bg-primary text-white text-sm shadow-md shadow-primary/10">
                      好的，那我们待会联系。
                    </div>
                    <div className="flex justify-end pr-1">
                      <CheckCheck size={12} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Typing status for AI */}
                {selectedChat.type === 'ai' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot size={14} className="text-purple-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center shadow-sm">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-50 bg-white">
                <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <div className="flex gap-4 px-1 items-center">
                    <InputAction icon={ImageIcon} />
                    <InputAction icon={Paperclip} />
                    <InputAction icon={Video} />
                    <InputAction icon={Phone} />
                    <InputAction icon={Camera} />
                    <InputAction icon={Mic} />
                    <InputAction icon={Smile} />
                    {selectedChat.type === 'ai' && (
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400">模型:</span>
                        <select className="bg-transparent text-[10px] font-bold text-primary focus:outline-none">
                          <option>Gemini 1.5 Pro</option>
                          <option>GPT-4o</option>
                          <option>Claude 3.5</option>
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <textarea 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="输入消息..."
                      rows={1}
                      className="flex-1 bg-transparent border-none text-sm resize-none focus:ring-0 p-1 max-h-32 min-h-[36px]"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0
                        ${messageText.trim() ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-200 text-gray-400'}
                      `}
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-gray-900 font-bold mb-1">选择一个会话</h3>
              <p className="text-sm">在左侧选择好友或 AI 助手开始交流</p>
            </div>
          )}
        </div>
      </div>
  );
}

// Sub-components
function HeaderAction({ icon: Icon }: { icon: any }) {
  return (
    <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
      <Icon size={18} />
    </button>
  );
}

function InputAction({ icon: Icon }: { icon: any }) {
  return (
    <button className="text-gray-400 hover:text-primary transition-colors">
      <Icon size={18} />
    </button>
  );
}

// CSS Injection for scrollbar hiding
const style = document.createElement('style');
style.textContent = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.appendChild(style);
