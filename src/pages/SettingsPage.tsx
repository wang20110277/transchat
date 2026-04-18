import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Cpu, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera,
  Moon,
  Globe,
  Wallet
} from 'lucide-react';

interface SettingsPageProps {
  onLogout: () => void;
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-surface font-sans">
      {/* Header Section */}
      <div className="p-4 border-b border-border-base bg-white flex-shrink-0">
        <h1 className="text-xl font-black text-text-main tracking-tight">个人设置</h1>
      </div>

      <div className="flex-1 overflow-y-auto bg-surface">
        <div className="max-w-xl mx-auto w-full p-4 space-y-6">
          
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-border-base p-6 flex items-center gap-6 shadow-sm"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface shadow-md">
                <img src="https://picsum.photos/seed/me/400" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg hover:scale-110 transition-transform">
                <Camera size={14} />
              </button>
            </div>

            <div className="text-left">
              <h2 className="text-lg font-black text-text-main tracking-tight">AI 用户</h2>
              <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Premium Agent Protocol</p>
              <button className="mt-2 text-xs font-black text-primary hover:underline">编辑个人资料</button>
            </div>
          </motion.div>

          {/* Settings Menu */}
          <div className="space-y-6 pb-20">
            <SettingsSection title="平台集成">
              <SettingsItem icon={Cpu} label="AI 模型与 API 密钥" sublabel="配置 Gemini, GPT-4, Claude" />
              <SettingsItem icon={Globe} label="语言与地区" sublabel="简体中文" />
            </SettingsSection>

            <SettingsSection title="隐私与安全">
              <SettingsItem icon={Shield} label="安全协议" sublabel="已开启双重认证" />
              <SettingsItem icon={Bell} label="新消息通知" sublabel="已开启桌面通知" />
              <SettingsItem icon={Moon} label="显示主题" sublabel="社论美学 (浅色)" />
            </SettingsSection>

            <SettingsSection title="账户操作">
              <button 
                onClick={onLogout}
                className="w-full group flex items-center justify-between p-4 bg-white border border-border-base rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100/50 text-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <LogOut size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-red-600 tracking-tight">退出登录</div>
                    <div className="text-[10px] font-bold text-red-400 uppercase">Terminate current session</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-red-300" />
              </button>
            </SettingsSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[10px] font-black text-text-muted px-2 tracking-[0.2em] uppercase">{title}</h3>
      <div className="bg-white border border-border-base rounded-2xl overflow-hidden shadow-sm">
        <div className="divide-y divide-border-base">
          {children}
        </div>
      </div>
    </div>
  );
}

function SettingsItem({ icon: Icon, label, sublabel }: { icon: any, label: string, sublabel?: string }) {
  return (
    <button className="w-full group flex items-center justify-between p-4 hover:bg-surface transition-all text-left">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-surface border border-border-base rounded-xl flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary transition-all">
          <Icon size={20} />
        </div>
        <div>
          <div className="text-sm font-black text-text-main tracking-tight group-hover:text-primary transition-colors">{label}</div>
          {sublabel && <div className="text-[10px] font-bold text-text-muted">{sublabel}</div>}
        </div>
      </div>
      <ChevronRight size={16} className="text-border-base group-hover:text-text-main transition-colors" />
    </button>
  );
}
