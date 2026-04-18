import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  Smartphone, 
  ArrowRight, 
  Github, 
  Chrome, 
  Apple, 
  MessageCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  QrCode
} from 'lucide-react';

export default function AuthPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email' | 'qr'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-surface font-sans overflow-hidden">
      {/* Left side: Branding/Illustration (Desktop only) */}
      <div className="hidden lg:flex lg:w-3/5 gradient-editorial relative flex-col justify-center items-start p-20 overflow-hidden text-white">
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ rotate: 360, x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl">
              <MessageCircle className="w-7 h-7 text-primary" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">传书</h1>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black mb-10 leading-[1.1] tracking-[-0.04em]"
          >
            连接人与人<br />
            连接人与 AI
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-xl mb-12 leading-relaxed font-medium max-w-md"
          >
            新一代智能即时通讯平台，融合真人社交与 AI Agent，开启通讯新纪元。
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-6 w-full"
          >
            {[
              { label: '真人社交', desc: '即时顺畅' },
              { label: 'AI 助手', desc: '定制角色' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="text-white font-bold text-xl mb-1">{item.label}</div>
                <div className="text-white/70 text-sm font-medium">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center p-8 md:p-20 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.03)] z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 ai-gradient-bg rounded-xl flex items-center justify-center shadow-xl">
                <MessageCircle className="text-white w-6 h-6" strokeWidth={3} />
              </div>
              <span className="text-2xl font-black ai-gradient-text tracking-tighter">传书</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-3xl font-black text-text-main mb-2 tracking-tight">
              {mode === 'login' ? '欢迎回来' : '创建账号'}
            </h3>
            <p className="text-text-muted font-medium text-sm">
              {mode === 'login' ? '选择登录方式继续探索' : '加入传书，开启智能通讯'}
            </p>
          </div>

          {/* Login/Register Mode Toggle */}
          <div className="flex bg-surface p-1 rounded-xl mb-8">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'login' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              登录
            </button>
            <button 
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'register' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              注册
            </button>
          </div>

          {/* Login Method Selector */}
          <div className="flex gap-8 border-b border-border-base mb-8">
            <button 
              onClick={() => setLoginMethod('phone')}
              className={`pb-4 text-sm font-bold transition-all relative ${loginMethod === 'phone' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              手机号
              {loginMethod === 'phone' && <motion.div layoutId="method-underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button 
              onClick={() => setLoginMethod('email')}
              className={`pb-4 text-sm font-bold transition-all relative ${loginMethod === 'email' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              邮箱
              {loginMethod === 'email' && <motion.div layoutId="method-underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />}
            </button>
            {mode === 'login' && (
              <button 
                onClick={() => setLoginMethod('qr')}
                className={`pb-4 hidden lg:block text-sm font-bold transition-all relative ${loginMethod === 'qr' ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
              >
                扫码
                {loginMethod === 'qr' && <motion.div layoutId="method-underline" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {loginMethod === 'qr' ? (
              <motion.div 
                key="qr"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center py-8"
              >
                <div className="w-48 h-48 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden group">
                  <QrCode className="w-full h-full text-gray-800" />
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-bold text-primary flex items-center gap-1">
                      点击刷新 <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-400 text-center">
                  使用 <span className="text-gray-700 font-medium">传书 移动端</span> 扫码
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleAuth} 
                className="space-y-4"
              >
                {/* Account Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                    {loginMethod === 'phone' ? '手机号码' : '邮箱地址'}
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                      {loginMethod === 'phone' ? <Smartphone size={18} /> : <Mail size={18} />}
                    </div>
                    <input 
                      type={loginMethod === 'phone' ? 'tel' : 'email'}
                      placeholder={loginMethod === 'phone' ? '+86 138 0000 0000' : 'name@example.com'}
                      className="w-full bg-white border border-border-base rounded-xl py-3.5 pl-11 pr-4 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-[#f0f7ff] transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password/Code Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {mode === 'register' ? '设置密码' : '登录密码'}
                    </label>
                    {mode === 'login' && (
                      <button type="button" className="text-xs font-black uppercase tracking-tight text-primary hover:underline">
                        忘记密码?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-white border border-border-base rounded-xl py-3.5 pl-11 pr-12 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-[#f0f7ff] transition-all font-medium"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button 
                  disabled={isLoading}
                  className="w-full ai-gradient-bg text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative"
                >
                  {isLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      {mode === 'login' ? '立即登录' : '注册账号'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social Logins */}
          <div className="mt-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-semibold tracking-widest">第三方连接</span>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              {[
                { icon: Chrome, color: 'text-text-main' },
                { icon: Apple, color: 'text-text-main' },
                { icon: ShieldCheck, color: 'text-text-main' }
              ].map((social, i) => (
                <button key={i} className="w-12 h-12 flex items-center justify-center border border-border-base rounded-full hover:bg-surface transition-all text-text-muted hover:text-text-main hover:border-text-main">
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed">
            登录即代表您同意我们的 <span className="text-gray-700 font-medium underline">用户协议</span> 和 <span className="text-gray-700 font-medium underline">隐私政策</span>
          </p>
        </div>
      </div>
    </div>
  );
}
