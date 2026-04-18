import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  HandMetal, 
  MapPin, 
  MessageCircle, 
  UserPlus, 
  Heart, 
  Share2, 
  ChevronRight,
  Sparkles,
  Camera,
  Smartphone,
  Orbit,
  Image,
  Smile
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  tagline: string;
  tags: string[];
  friends: number;
  posts: number;
  location: string;
}

const DISCOVERY_USERS: User[] = [
  { 
    id: 'u1', 
    name: '林深时见鹿', 
    avatar: 'https://picsum.photos/seed/u1/100', 
    cover: 'https://picsum.photos/seed/c1/800/400',
    tagline: '热衷于探索 AI 与设计的边界。', 
    tags: ['UI/UX', '摄影', '极简主义'],
    friends: 124,
    posts: 15,
    location: '上海'
  },
  { 
    id: 'u2', 
    name: '代码极客', 
    avatar: 'https://picsum.photos/seed/u2/100', 
    cover: 'https://picsum.photos/seed/c2/800/400',
    tagline: '终身学习者，喜欢构建有用的工具。', 
    tags: ['React', 'AI Agent', '健身'],
    friends: 342,
    posts: 42,
    location: '深圳'
  },
  { 
    id: 'u3', 
    name: '半夏', 
    avatar: 'https://picsum.photos/seed/u3/100', 
    cover: 'https://picsum.photos/seed/c3/800/400',
    tagline: '记录生活中的美好瞬间。', 
    tags: ['读书', '音乐', '旅行'],
    friends: 89,
    posts: 128,
    location: '成都'
  },
  { 
    id: 'u4', 
    name: '未来之眼', 
    avatar: 'https://picsum.photos/seed/u4/100', 
    cover: 'https://picsum.photos/seed/c4/800/400',
    tagline: '科技发烧友，最爱 AI 眼镜。', 
    tags: ['科技', '数码', '未来感'],
    friends: 156,
    posts: 3,
    location: '杭州'
  },
];

const INTEREST_TAGS = ['推荐', '技术', '设计', '摄影', '音乐', '运动', '美食', '电影'];

export default function DiscoveryPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeInterest, setActiveInterest] = useState('推荐');
  const [showFeed, setShowFeed] = useState(false);

  if (selectedUser) {
    return <UserProfile user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  if (showFeed) {
    return <SocialCircleFeed onBack={() => setShowFeed(false)} />;
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-surface font-sans">
      {/* Header */}
      <div className="bg-white p-4 border-b border-border-base flex-shrink-0">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-black text-text-main tracking-tight">社交圈</h1>
            <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:underline group">
              <Orbit size={14} className="group-hover:rotate-12 transition-transform" />
              <span>发现动态</span>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="搜索用户、动态、话题..."
              className="w-full bg-surface border border-border-base rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {INTEREST_TAGS.map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveInterest(tag)}
                className={`
                  px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                  ${activeInterest === tag ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:bg-white border border-border-base'}
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-surface">
        <div className="max-w-4xl mx-auto p-4">
          {/* Social Circle Entry - Prioritized at the top */}
          <div 
            onClick={() => setShowFeed(true)}
            className="mb-6 flex items-center gap-4 bg-white p-4 rounded-3xl border border-border-base shadow-sm cursor-pointer hover:bg-surface transition-colors group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
              <Orbit size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-text-main tracking-tight group-hover:text-green-600 transition-colors">社交圈</h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">Social Circle Feed</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2 mr-1">
                <img src={DISCOVERY_USERS[0].avatar} className="w-8 h-8 rounded-lg border-2 border-white shadow-sm" />
              </div>
              <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <ChevronRight size={18} className="text-text-muted" />
            </div>
          </div>

          {/* Quick Services Grid */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {[
              { label: '扫一扫', icon: Camera, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: '摇一摇', icon: Smartphone, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { label: '看一看', icon: Sparkles, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: '搜一搜', icon: Search, color: 'text-red-500', bg: 'bg-red-50' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`${item.bg} ${item.color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-active:scale-95 transition-all`}>
                  <item.icon size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black text-text-main uppercase tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-black text-text-muted tracking-[0.1em] uppercase px-1">特别推荐</h3>
            <div className="flex items-center text-[10px] font-black text-primary gap-1 cursor-pointer uppercase tracking-tight">
              <span>查看更多</span>
              <ChevronRight size={12} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISCOVERY_USERS.map((user) => (
              <motion.div 
                key={user.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-border-base flex flex-col gap-4 relative overflow-hidden group hover:border-primary transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border-base flex-shrink-0 group-hover:border-primary transition-colors">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-text-main text-sm truncate">{user.name}</h4>
                    <div className="flex items-center text-[10px] text-text-muted font-bold gap-1 uppercase tracking-tight">
                      <MapPin size={10} />
                      <span>{user.location}</span>
                    </div>
                  </div>
                  <button className="p-2 bg-surface text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                    <UserPlus size={18} />
                  </button>
                </div>

                <p className="text-xs text-text-muted line-clamp-2 font-medium">
                  {user.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {user.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-surface text-text-muted border border-border-base rounded text-[9px] font-black uppercase tracking-tight">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-border-base flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="text-left">
                      <div className="text-xs font-black text-text-main">{user.friends}</div>
                      <div className="text-[9px] text-text-muted uppercase font-bold tracking-tighter">好友</div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-text-main">{user.posts}</div>
                      <div className="text-[9px] text-text-muted uppercase font-bold tracking-tighter">动态</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="px-4 py-1.5 bg-primary/10 text-primary font-black rounded-lg text-xs hover:bg-primary hover:text-white transition-all uppercase tracking-tight"
                  >
                    查看资料
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Near Section */}
          <div className="mt-10 mb-4">
            <h3 className="text-xs font-black text-text-muted tracking-[0.1em] uppercase px-1">附近的人</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border-2 border-dashed border-border-base bg-surface/30">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
              <MapPin size={24} />
            </div>
            <p className="text-xs text-text-muted font-bold mb-4 uppercase tracking-tight">开启定位权限以发现周围的朋友</p>
            <button className="px-6 py-2 bg-text-main text-white font-black rounded-xl text-xs hover:bg-black transition-all uppercase tracking-[0.1em]">
              授权定位
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialCircleFeed({ onBack }: { onBack: () => void }) {
  const posts = [
    {
      id: 1,
      user: DISCOVERY_USERS[0],
      content: "今天上海的天气不错，适合出来拍外景。AI 辅助修图的效率越来越高了，感觉未来的设计流程会完全重塑。✨",
      images: ["https://picsum.photos/seed/moment1/800/600"],
      time: "10分钟前",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      user: DISCOVERY_USERS[1],
      content: "终于调通了新的 Agent 的推理引擎，长文本的处理能力有了质的飞跃。接下来准备尝试集成多模态输入。",
      images: ["https://picsum.photos/seed/moment2/800/600", "https://picsum.photos/seed/moment3/800/600"],
      time: "2小时前",
      likes: 42,
      comments: 12
    },
    {
      id: 3,
      user: DISCOVERY_USERS[2],
      content: "午间阅读时间。📖 《AI 提示工程指南》确实给了不少启发。在这个时代，提出好问题的能力比回答问题的能力更重要。",
      images: [],
      time: "5小时前",
      likes: 18,
      comments: 3
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-surface flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl p-4 md:p-5 border-b border-border-base sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 hover:bg-surface rounded-2xl transition-all active:scale-95 bg-surface md:bg-transparent">
            <ChevronRight size={22} className="rotate-180" />
          </button>
          <h2 className="text-xl font-black text-text-main tracking-tight">社交圈动态</h2>
        </div>
        <button className="p-2.5 text-primary hover:bg-primary/5 rounded-2xl transition-all active:scale-95">
          <Camera size={22} />
        </button>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Cover */}
        <div className="relative mb-16">
          <div className="h-48 md:h-56 rounded-[2rem] bg-gradient-to-br from-green-600 to-emerald-800 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10">
              <Orbit size={280} className="absolute -top-20 -right-20 text-white" />
            </div>
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h1 className="text-3xl font-black tracking-tight drop-shadow-sm">发现美好的瞬间</h1>
              <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Explore Your Social Orbit</p>
            </div>
          </div>
          <div className="absolute -bottom-8 right-8 z-20">
            <div className="w-24 h-24 rounded-3xl border-[6px] border-white overflow-hidden shadow-2xl bg-surface">
              <img src="https://picsum.photos/seed/me/100" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-3xl border border-border-base shadow-sm">
            <div className="flex items-start gap-4">
              <img src={post.user.avatar} className="w-10 h-10 rounded-xl shadow-md border border-border-base" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-text-main text-sm">{post.user.name}</h4>
                  <span className="text-[10px] text-text-muted font-bold uppercase">{post.time}</span>
                </div>
                <p className="mt-2 text-sm text-text-main leading-relaxed font-medium">
                  {post.content}
                </p>

                {post.images.length > 0 && (
                  <div className={`mt-4 grid gap-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((img, i) => (
                      <img key={i} src={img} className="rounded-2xl w-full h-48 object-cover border border-border-base shadow-sm" />
                    ))}
                  </div>
                )}

                <div className="flex gap-6 mt-6 pt-4 border-t border-border-base">
                  <button className="flex items-center gap-2 text-text-muted hover:text-red-500 transition-colors group">
                    <Heart size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors group">
                    <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-black">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-text-muted hover:text-indigo-500 transition-colors ml-auto">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center py-12">
          <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">没有更多动态了</p>
        </div>
      </div>
    </div>
  );
}

function UserProfile({ user, onBack }: { user: User, onBack: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-surface flex flex-col font-sans">
      {/* Cover and Back */}
      <div className="h-40 md:h-48 relative flex-shrink-0">
        <img src={user.cover} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/40 backdrop-blur-md rounded-xl text-white hover:bg-white/60 transition-all"
        >
          <ChevronRight size={18} className="rotate-180" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="max-w-3xl mx-auto w-full px-4 -mt-10 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl bg-surface">
              <img src={user.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="mb-1">
              <h2 className="text-2xl font-black text-text-main tracking-tight">{user.name}</h2>
              <p className="text-xs text-text-muted font-bold tracking-tight uppercase">{user.tagline}</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center md:justify-start">
            <button className="px-6 py-2 bg-primary text-white font-black rounded-lg shadow-md hover:scale-[1.02] transition-all flex items-center gap-2 text-xs uppercase tracking-tight">
              <MessageCircle size={14} />
              打招呼
            </button>
            <button className="p-2 border border-border-base bg-white text-text-muted rounded-lg hover:border-text-main transition-all">
              <UserPlus size={18} />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-4 gap-2 mt-8">
          {[
            { label: '共同兴趣', value: '4' },
            { label: '活跃度', value: '极高' },
            { label: '粉丝', value: user.friends },
            { label: '动态', value: user.posts },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-border-base flex flex-col items-center">
              <span className="text-[8px] text-text-muted font-black uppercase tracking-widest leading-none mb-1">{stat.label}</span>
              <span className="text-sm font-black text-text-main">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Content Tabs */}
        <div className="mt-8 flex border-b border-border-base">
          <button className="px-5 py-3 border-b-2 border-primary text-primary font-black text-[10px] uppercase tracking-widest">近期动态</button>
          <button className="px-5 py-3 text-text-muted font-black text-[10px] uppercase tracking-widest hover:text-text-main">相册</button>
          <button className="px-5 py-3 text-text-muted font-black text-[10px] uppercase tracking-widest hover:text-text-main">收藏</button>
        </div>

        {/* Dummy Feed */}
        <div className="mt-6 space-y-4">
          {[1].map(post => (
            <div key={post} className="p-5 bg-white rounded-2xl border border-border-base flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} className="w-6 h-6 rounded-full" />
                  <div className="text-xs font-black text-text-main">{user.name}</div>
                  <div className="text-[10px] text-text-muted font-bold">刚刚</div>
                </div>
                <MoreHorizontal size={14} className="text-text-muted cursor-pointer" />
              </div>
              <p className="text-xs text-text-main leading-relaxed font-medium">
                今天在研究最新的 AI 眼镜交互模态，真的被流式交互的速度震撼到了。
              </p>
              <div className="flex gap-4 mt-1 pt-3 border-t border-border-base">
                <button className="flex items-center gap-1.5 text-text-muted hover:text-red-500 transition-colors">
                  <Heart size={14} />
                  <span className="text-[10px] font-black">128</span>
                </button>
                <button className="flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors">
                  <MessageCircle size={14} />
                  <span className="text-[10px] font-black">24</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reuse Icon and styles from previous file if needed or declare locally
function MoreHorizontal({ size, className }: { size: number, className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
    </svg>
  );
}
