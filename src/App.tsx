'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronDown, 
  Wine, 
  FlaskConical, 
  Lock, 
  Share2, 
  Fingerprint, 
  Bookmark,
  Shuffle,
  Droplets,
  Twitter,
  Facebook,
  Instagram,
  Link2,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: 'landing' | 'workshop' | 'about') => void, currentView: string }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <div 
          className="text-2xl font-headline italic text-primary tracking-widest cursor-pointer"
          onClick={() => onNavigate('landing')}
        >
          Cherry Wine
        </div>
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => onNavigate('landing')} className={cn(
            "font-headline font-light uppercase tracking-widest transition-colors",
            currentView === 'landing' ? "text-primary border-b border-primary/30 pb-1" : "text-on-surface/60 hover:text-on-surface"
          )}>体验</button>
          <button onClick={() => onNavigate('about')} className={cn(
            "font-headline font-light uppercase tracking-widest transition-colors",
            currentView === 'about' ? "text-primary border-b border-primary/30 pb-1" : "text-on-surface/60 hover:text-on-surface"
          )}>关于</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('workshop')}
            className="bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-lg text-on-primary font-bold text-sm hover:opacity-90 transition-all active:scale-95"
          >
            开始调酒
          </button>
        </div>
      </div>
    </nav>
  );
};

export const Hero = ({ onStartWorkshop }: { onStartWorkshop: () => void }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="liquid-bg" />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-headline font-light tracking-tight leading-none mb-6">
            您的数字<br />
            <span className="italic font-light text-primary">调酒坊</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant font-light tracking-wide mb-12 max-w-xl mx-auto">
            探索樱桃与烈酒交织的无限可能。每一次指尖的调配，都是一场专属的微醺艺术之旅。
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStartWorkshop}
              className="group relative px-10 py-4 bg-gradient-to-br from-primary to-secondary rounded-sm font-bold text-on-primary tracking-widest overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,178,184,0.3)]"
            >
              <span className="relative z-10 uppercase">开始调酒</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Cherry Visual */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl opacity-20 pointer-events-none z-0"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <img 
          src="https://picsum.photos/seed/cherry/1200/1200?blur=10" 
          alt="Atmospheric background" 
          className="w-full h-full object-contain mix-blend-lighten"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
};

export const Features = () => {
  const features = [
    {
      icon: <Droplets className="text-primary w-8 h-8" />,
      title: "氛围调和",
      desc: "我们的WebGL引擎根据您的情绪将环境音与心情转化为独特的液态轮廓。"
    },
    {
      icon: <FlaskConical className="text-primary w-8 h-8" />,
      title: "分子逻辑",
      desc: "每一种原料都在分子级别被数字化，确保您的“樱桃”体验比现实更真实。"
    },
    {
      icon: <Lock className="text-primary w-8 h-8" />,
      title: "私人酒桶",
      desc: "将您的独特配方存储在仅通过生物特征密钥访问的数字金库中，在链上优雅地熟成。"
    }
  ];

  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl md:text-5xl font-light mb-4">工艺</h2>
        <p className="font-body text-on-surface-variant max-w-2xl mx-auto font-light">精密工程与艺术表达在每一滴酒中交汇。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="glass-panel p-10 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="font-headline text-2xl mb-4">{f.title}</h3>
            <p className="font-body text-on-surface-variant leading-relaxed font-light">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Testimonials = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-surface-container-low/30">
      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">社群</span>
            <h2 className="font-headline text-4xl md:text-6xl font-light">影子里的<span className="italic text-primary">同行评价</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-l border-primary/20 pl-8 py-4">
            <p className="font-headline text-2xl italic font-light mb-6 leading-relaxed">“我工作室的环境噪音与发酵逻辑之间的互动创造了一个我无法想象的年份。这是数字形式的高级艺术。”</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant" />
              <div>
                <p className="font-body font-bold text-sm tracking-widest uppercase">Julian V.</p>
                <p className="font-body text-xs text-on-surface-variant">声音建筑师</p>
              </div>
            </div>
          </div>
          <div className="border-l border-primary/20 pl-8 py-4">
            <p className="font-headline text-2xl italic font-light mb-6 leading-relaxed">“Cherry Wine不仅仅是一种饮品；它是一场感官劫持。私人酒桶功能让我能够为我最转瞬即逝的情绪策划分选集。”</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant" />
              <div>
                <p className="font-body font-bold text-sm tracking-widest uppercase">Elena S.</p>
                <p className="font-body text-xs text-on-surface-variant">视觉伦理学家</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "什么是数字发酵？",
      a: "数字发酵是风味、香气和质地剖面的算法表现。利用我们的专有引擎，这些元素会根据声音、光线和生物识别数据等环境输入进行演变，每次都会创造出独特的“年份”。"
    },
    {
      q: "我真的能尝到这些调配酒吗？",
      a: "Cherry Wine是专为数字媒介设计的感官体验。虽然它不提供实体液体，但大气和视觉反馈系统经过精心设计，可触发联觉反应，为老练的味蕾提供“幻影风味”体验。"
    },
    {
      q: "私人酒桶是如何工作的？",
      a: "私人酒桶是加密的存储槽，用于保存您独特的算法调配。就像真实的葡萄酒一样，这些数字剖面会随着时间的推移而熟成，因为基础代码会与全球网络趋势互动，微妙地改变其特征。"
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-8 py-32">
      <div className="text-center mb-16">
        <h2 className="font-headline text-4xl font-light mb-4 italic">常见问题</h2>
        <div className="h-px w-24 bg-primary/30 mx-auto" />
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-panel rounded-lg border border-outline-variant/10 overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="flex justify-between items-center w-full p-6 cursor-pointer hover:bg-surface-container-high transition-colors text-left"
            >
              <span className="font-headline text-xl font-light">{faq.q}</span>
              <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", openIndex === i && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 font-body text-on-surface-variant font-light leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export const CTA = () => {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 pb-32 pt-10">
      <div className="glass-panel p-16 md:p-24 rounded-2xl border border-outline-variant/10 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="relative z-10">
          <h2 className="font-headline text-5xl md:text-7xl font-light mb-8 italic">开启您的专属微醺</h2>
          <p className="font-body text-lg text-on-surface-variant mb-12 max-w-xl mx-auto font-light">
            探索 Cherry Wine 的无限灵感，定制属于您的独特风味。
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full md:w-auto whitespace-nowrap bg-white text-black px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm"
            >
              开启您的专属微醺
            </button>
          </div>
          <p className="mt-8 font-body text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em]">独特性是我们的核心原料。</p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </section>
  );
};

export const LegacyFooter = () => {
  return (
    <footer className="bg-background py-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-screen-2xl mx-auto">
        <div className="mb-8 md:mb-0">
          <div className="text-sm font-bold text-on-surface mb-2 tracking-[0.2em]">Cherry Wine</div>
          <div className="font-body text-[10px] tracking-tighter uppercase text-on-surface/40">
            © 2024 Cherry Wine. 版权所有。
          </div>
        </div>
        <div className="flex gap-10">
          <a href="#" className="font-body text-[10px] tracking-tighter uppercase text-on-surface/40 hover:text-primary transition-colors">隐私</a>
          <a href="#" className="font-body text-[10px] tracking-tighter uppercase text-on-surface/40 hover:text-primary transition-colors">条款</a>
          <a href="#" className="font-body text-[10px] tracking-tighter uppercase text-on-surface/40 hover:text-primary transition-colors">联系方式</a>
        </div>
        <div className="mt-8 md:mt-0 flex gap-6 text-primary-container">
          <Share2 className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
          <Fingerprint className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
          <Wine className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export const About = ({ onStartWorkshop }: { onStartWorkshop: () => void }) => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-light mb-8 italic text-primary">关于 Cherry Wine</h1>
        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-outline-variant/10 text-left space-y-6 font-body text-lg text-on-surface-variant font-light leading-relaxed shadow-2xl">
          <p>嗨！欢迎来到 <strong className="text-primary font-normal">Cherry Wine</strong>。这里是一个让你在线体验调酒乐趣的数字酒坊。</p>
          <p>不用买一堆瓶瓶罐罐，也不用担心弄得一团糟。你只需要动动手指，选选基酒、加点果汁、挑个好看的杯子，AI 就会帮你“调”出一杯独一无二的专属特调，还会给它起个好听的名字，写段有意思的品鉴词。</p>
          <p>不管你是调酒老手还是好奇小白，都能在这里找到属于你的微醺灵感。快去试试吧！</p>
        </div>
        <button
          onClick={onStartWorkshop}
          className="mt-12 px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-sm font-bold text-on-primary tracking-widest hover:opacity-90 transition-all hover:shadow-[0_0_30px_rgba(255,178,184,0.3)]"
        >
          去调一杯
        </button>
      </div>
    </section>
  );
};

const ShareModal = ({
  isOpen,
  onClose,
  imageUrl,
  cocktailName,
  cocktailDesc
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  cocktailName: string;
  cocktailDesc: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-surface-container-low border border-white/10 rounded-3xl overflow-hidden w-full max-w-md shadow-2xl flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-white/5">
          <h3 className="font-headline text-lg text-white">分享你的专属酒卡</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <div className="relative w-full h-[65%] bg-black">
              {imageUrl ? (
                <img src={imageUrl} alt="Cocktail" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-container-lowest">
                  <Wine className="w-10 h-10 text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 right-4">
                <div className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-[8px] tracking-[0.2em] font-label uppercase">
                  Cherry Wine Signature
                </div>
              </div>
            </div>
            <div className="relative w-full h-[35%] bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-4 flex flex-col justify-center">
              <h4 className="font-headline text-2xl text-white font-light tracking-tight mb-2 truncate">
                {cocktailName || '未命名特调'}
              </h4>
              <p className="text-white/60 font-body text-xs leading-relaxed line-clamp-2 font-light">
                {cocktailDesc || '这是一杯充满神秘色彩的未知饮品。'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-surface-container-highest/30 border-t border-white/5">
          <p className="text-xs text-center text-white/40 mb-4 tracking-widest uppercase">分享至</p>
          <div className="flex justify-center gap-4">
            <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-on-primary transition-all">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-on-primary transition-all">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-on-primary transition-all">
              <Instagram className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('链接已复制！');
              }}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-on-primary transition-all"
            >
              <Link2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const QuotaErrorModal = ({
  isOpen,
  onClose,
  message
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-surface-container-low border border-red-500/30 rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl"
      >
        <div className="flex justify-between items-center p-4 border-b border-white/5">
          <h3 className="font-headline text-lg text-red-400">API Quota Exceeded</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-white/80 font-body text-sm leading-relaxed mb-4">
            {message}
          </p>
          <p className="text-white/40 text-xs">
            Please check your ModelScope account quota or try again later.
          </p>
        </div>
        <div className="p-4 bg-surface-container-highest/30 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-label text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Workshop View ---

export const Workshop = () => {
  const [base, setBase] = useState<string | null>(null);
  const [mixers, setMixers] = useState<string[]>([]);
  const [garnishes, setGarnishes] = useState<string[]>([]);
  const [glassware, setGlassware] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cocktailName, setCocktailName] = useState('');
  const [cocktailDesc, setCocktailDesc] = useState('');
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [quotaError, setQuotaError] = useState<string | null>(null);

  const toggleMixer = (m: string) => {
    setMixers(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const toggleGarnish = (g: string) => {
    setGarnishes(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const isReadyToGenerate = base && mixers.length > 0 && garnishes.length > 0 && glassware;
  const imageSeed = isReadyToGenerate ? `${base}-${mixers.sort().join('-')}-${garnishes.sort().join('-')}-${glassware}` : null;

  const baseMap: Record<string, { name: string, amount: string, color: string }> = {
    vodka: { name: '伏特加', amount: '45ml', color: 'bg-primary' },
    gin: { name: '琴酒', amount: '45ml', color: 'bg-primary' },
    rum: { name: '朗姆酒', amount: '45ml', color: 'bg-primary' },
    whiskey: { name: '威士忌', amount: '45ml', color: 'bg-primary' },
    tequila: { name: '龙舌兰', amount: '45ml', color: 'bg-primary' },
    brandy: { name: '白兰地', amount: '45ml', color: 'bg-primary' },
    liqueur: { name: '利口酒', amount: '30ml', color: 'bg-primary' }
  };

  const mixerMap: Record<string, { name: string, amount: string, color: string }> = {
    '柠檬汁': { name: '柠檬汁', amount: '15ml', color: 'bg-secondary' },
    '青柠汁': { name: '青柠汁', amount: '15ml', color: 'bg-secondary' },
    '蔓越莓汁': { name: '蔓越莓汁', amount: '60ml', color: 'bg-secondary' },
    '苏打水': { name: '苏打水', amount: '120ml', color: 'bg-secondary' },
    '糖浆': { name: '糖浆', amount: '10ml', color: 'bg-secondary' },
    '冰块': { name: '冰块', amount: '适量', color: 'bg-secondary' },
    '苦精': { name: '苦精', amount: '2 dashes', color: 'bg-secondary' },
    '薄荷': { name: '薄荷', amount: '少许', color: 'bg-secondary' }
  };

  const garnishMap: Record<string, { name: string, amount: string, color: string }> = {
    '樱桃': { name: '樱桃', amount: '1枚', color: 'bg-tertiary-dim' },
    '橙片': { name: '橙片', amount: '1片', color: 'bg-tertiary-dim' },
    '青柠角': { name: '青柠角', amount: '1角', color: 'bg-tertiary-dim' },
    '薄荷叶': { name: '薄荷叶', amount: '1片', color: 'bg-tertiary-dim' },
    '橄榄': { name: '橄榄', amount: '1枚', color: 'bg-tertiary-dim' },
    '糖霜边': { name: '糖霜边', amount: '1圈', color: 'bg-tertiary-dim' },
    '鸡尾酒伞': { name: '鸡尾酒伞', amount: '1把', color: 'bg-tertiary-dim' }
  };

  const glasswareMap: Record<string, { name: string, amount: string, color: string }> = {
    'martini': { name: '马天尼杯', amount: '1个', color: 'bg-outline' },
    'old-fashioned': { name: '古典杯', amount: '1个', color: 'bg-outline' },
    'collins': { name: '柯林杯', amount: '1个', color: 'bg-outline' },
    'hurricane': { name: '飓风杯', amount: '1个', color: 'bg-outline' },
    'flute': { name: '笛形杯', amount: '1个', color: 'bg-outline' }
  };

  const handleRandomInspiration = () => {
    // 1. Random Base
    const baseKeys = Object.keys(baseMap);
    const randomBase = baseKeys[Math.floor(Math.random() * baseKeys.length)];
    
    // 2. Random Mixers (1 to 3)
    const mixerKeys = Object.keys(mixerMap);
    const numMixers = Math.floor(Math.random() * 3) + 1;
    const shuffledMixers = [...mixerKeys].sort(() => 0.5 - Math.random());
    const randomMixers = shuffledMixers.slice(0, numMixers);

    // 3. Random Garnishes (1 to 2)
    const garnishKeys = Object.keys(garnishMap);
    const numGarnishes = Math.floor(Math.random() * 2) + 1;
    const shuffledGarnishes = [...garnishKeys].sort(() => 0.5 - Math.random());
    const randomGarnishes = shuffledGarnishes.slice(0, numGarnishes);

    // 4. Random Glassware
    const glassKeys = Object.keys(glasswareMap);
    const randomGlass = glassKeys[Math.floor(Math.random() * glassKeys.length)];

    // Update state
    setBase(randomBase);
    setMixers(randomMixers);
    setGarnishes(randomGarnishes);
    setGlassware(randomGlass);
  };

  const getPrompt = () => {
    const baseName = base ? baseMap[base]?.name : '';
    const mixersName = mixers.length > 0 ? mixers.map(m => mixerMap[m]?.name).join('+') : '';
    const garnishesName = garnishes.length > 0 ? garnishes.map(g => garnishMap[g]?.name).join('+') : '';
    const glassName = glassware ? glasswareMap[glassware]?.name : '';

    const prefixParts = [baseName];
    if (mixersName) prefixParts.push(mixersName);
    if (garnishesName) prefixParts.push(garnishesName);
    if (glassName) prefixParts.push(glassName);

    const prefix = prefixParts.join('+');

    let desc = `一杯以${baseName}为基酒`;
    if (mixersName) desc += `、加入${mixersName.replace(/\+/g, '、')}`;
    if (garnishesName) desc += `、以${garnishesName.replace(/\+/g, '、')}点缀`;
    if (glassName) desc += `、使用${glassName}盛装的鸡尾酒`;

    const prompt = `${prefix}，${desc}，产品摄影，居中构图，干净背景，真实液体质感，高光通透，高清细节，商业饮品海报风格`;
    
    return prompt;
  };

  useEffect(() => {
    if (!isReadyToGenerate) return;

    const generateAll = async () => {
      setIsGenerating(true);
      setIsGeneratingText(true);
      try {
        // Generate Image via ModelScope API
        const promptText = getPrompt();
        const imageRes = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: promptText })
        }).then(res => res.json());
        
        // Handle Image
        if (imageRes.success && imageRes.imageData) {
          setImageUrl(imageRes.imageData);
        } else if (imageRes.error === 'quota_exceeded') {
          setQuotaError(imageRes.message || 'API quota exceeded');
        } else {
          console.error('Image generation failed:', imageRes.error);
        }
      } catch (error) {
        console.error("Failed to generate content:", error);
      } finally {
        setIsGenerating(false);
        setIsGeneratingText(false);
      }
    };

    const timeoutId = setTimeout(() => {
      generateAll();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [imageSeed]);

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto items-start">
        {/* Left Panel: Ingredients */}
        <aside className="flex flex-col md:col-span-4 lg:col-span-3 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl metal-highlight">
            <h2 className="font-headline text-xl text-primary mb-6">原料选择</h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs tracking-widest text-on-surface/40 uppercase font-label mb-3 block">选择基酒</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(baseMap).map(([key, val]) => (
                    <button 
                      key={key}
                      onClick={() => setBase(key)}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg border transition-all",
                        base === key ? "border-primary/20 bg-primary-container/20 text-primary" : "border-outline-variant hover:bg-surface-container-high text-on-surface/60"
                      )}
                    >
                      <span className="text-xs font-label">{val.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest text-on-surface/40 uppercase font-label mb-3 block">添加辅料</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(mixerMap).map((m) => (
                    <span 
                      key={m}
                      onClick={() => toggleMixer(m)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-label cursor-pointer transition-all",
                        mixers.includes(m) 
                          ? "bg-gradient-to-r from-primary/80 to-secondary/80 text-on-primary shadow-lg shadow-primary/10" 
                          : "bg-surface-bright text-on-surface border border-outline-variant hover:bg-primary/20 hover:border-primary"
                      )}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest text-on-surface/40 uppercase font-label mb-3 block">最后装饰</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(garnishMap).map(([key, val]) => (
                    <div 
                      key={key} 
                      onClick={() => toggleGarnish(key)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                        garnishes.includes(key) ? "bg-primary/10 border-primary/30" : "bg-surface-container-highest/50 border-outline-variant hover:border-primary/50"
                      )}
                    >
                      <span className={cn("text-sm font-label transition-colors", garnishes.includes(key) ? "text-primary" : "text-on-surface")}>{val.name}</span>
                      <div className={cn(
                        "w-4 h-4 rounded-sm border flex items-center justify-center transition-all",
                        garnishes.includes(key) 
                          ? "bg-primary border-primary text-on-primary" 
                          : "border-outline-variant bg-transparent"
                      )}>
                        {garnishes.includes(key) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest text-on-surface/40 uppercase font-label mb-3 block">选择杯具</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(glasswareMap).map(([key, val]) => (
                    <button 
                      key={key}
                      onClick={() => setGlassware(key)}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg border transition-all",
                        glassware === key ? "border-primary/20 bg-primary-container/20 text-primary" : "border-outline-variant hover:bg-surface-container-high text-on-surface/60"
                      )}
                    >
                      <span className="text-xs font-label">{val.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Interaction */}
        <section className="md:col-span-8 lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            {/* Shareable Card Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex flex-col">
              
              {/* Top: Image Section */}
              <div className="relative w-full h-[65%] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  {imageUrl ? (
                    <motion.img 
                      key={imageUrl}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={imageUrl} 
                      alt="Cocktail" 
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-lowest p-8 text-center">
                      <Wine className="w-16 h-16 text-on-surface/10 mb-4" />
                      <p className="text-on-surface/40 font-body text-sm tracking-widest leading-relaxed">
                        请在左侧选择<br/>
                        <span className="text-primary/60">基酒、辅料、装饰、杯具</span><br/>
                        开启您的专属调酒体验
                      </p>
                    </div>
                  )}
                </AnimatePresence>
                
                {isGenerating && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="flex flex-col items-center gap-4">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full"
                      />
                      <span className="text-primary font-label text-[10px] tracking-[0.3em] uppercase animate-pulse">调配中...</span>
                    </div>
                  </div>
                )}

                {/* Subtle gradient overlay for image depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-[9px] tracking-[0.2em] font-label uppercase">
                    Cherry Wine Signature
                  </div>
                </div>
              </div>

              {/* Bottom: Content Section */}
              <div className="relative w-full h-[35%] bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-6 sm:p-8 flex flex-col justify-between z-20">
                {/* Decorative Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <h1 className="font-headline text-3xl sm:text-4xl text-white font-light tracking-tight">
                      {!isReadyToGenerate && !imageUrl ? '等待调配' : (isGeneratingText ? '灵感涌现中...' : cocktailName)}
                    </h1>
                  </div>
                  
                  <p className="text-white/60 font-body text-sm leading-relaxed line-clamp-2 font-light">
                    {!isReadyToGenerate && !imageUrl ? '选择四种原料以生成您的专属酒卡' : (isGeneratingText ? '正在为您撰写专属的品鉴词...' : cocktailDesc)}
                  </p>
                </div>

                {/* Flavor Profile Mini-Tags */}
                <div className="flex items-center gap-3 mt-4">
                  {base && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-white/10 bg-white/5">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span className="text-[10px] text-white/70 font-label tracking-wider">{baseMap[base]?.name}基底</span>
                    </div>
                  )}
                  {mixers.length > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-white/10 bg-white/5">
                      <div className="w-1 h-1 rounded-full bg-secondary" />
                      <span className="text-[10px] text-white/70 font-label tracking-wider">{mixers.length}种风味</span>
                    </div>
                  )}
                  {(base || mixers.length > 0 || garnishes.length > 0 || glassware) && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-white/10 bg-white/5">
                      <div className="w-1 h-1 rounded-full bg-tertiary" />
                      <span className="text-[10px] text-white/70 font-label tracking-wider">特调</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleRandomInspiration}
              className="flex-1 py-4 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label rounded-xl transition-all border border-outline-variant/30 flex items-center justify-center gap-2 text-sm tracking-widest"
            >
              <Shuffle className="w-4 h-4 text-primary" />
              随机灵感
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm tracking-widest"
            >
              <Share2 className="w-4 h-4" />
              分享酒卡
            </button>
          </div>
        </section>

        {/* Right Panel: Recipe */}
        <section className="md:col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-container-high p-8 rounded-xl border border-outline-variant/20 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-headline text-2xl font-bold text-on-surface">我的独创酒谱</h3>
                <Bookmark className="text-secondary w-5 h-5" />
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-label tracking-widest text-on-surface/40 uppercase mb-3">配方比例</h4>
                  <ul className="space-y-4">
                    {!base && mixers.length === 0 && garnishes.length === 0 && !glassware && (
                      <li className="text-sm text-on-surface/40 italic">尚未添加任何原料</li>
                    )}
                    {base && (
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-1.5 h-1.5 rounded-full", baseMap[base]?.color)} />
                          <span className="text-sm">{baseMap[base]?.name}</span>
                        </div>
                        <span className="text-xs font-label text-on-surface/40">{baseMap[base]?.amount}</span>
                      </li>
                    )}
                    {mixers.map(m => (
                      <li key={m} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-1.5 h-1.5 rounded-full", mixerMap[m]?.color)} />
                          <span className="text-sm">{mixerMap[m]?.name}</span>
                        </div>
                        <span className="text-xs font-label text-on-surface/40">{mixerMap[m]?.amount}</span>
                      </li>
                    ))}
                    {garnishes.map(g => (
                      <li key={g} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-1.5 h-1.5 rounded-full", garnishMap[g]?.color)} />
                          <span className="text-sm">{garnishMap[g]?.name}</span>
                        </div>
                        <span className="text-xs font-label text-on-surface/40">{garnishMap[g]?.amount}</span>
                      </li>
                    ))}
                    {glassware && (
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-1.5 h-1.5 rounded-full", glasswareMap[glassware]?.color)} />
                          <span className="text-sm">{glasswareMap[glassware]?.name}</span>
                        </div>
                        <span className="text-xs font-label text-on-surface/40">{glasswareMap[glassware]?.amount}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="pt-6 border-t border-outline-variant/10">
                  <h4 className="text-[10px] font-label tracking-widest text-on-surface/40 uppercase mb-3">风味分析</h4>
                  <div className="flex gap-2">
                    <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="w-[70%] h-full bg-primary" />
                    </div>
                    <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="w-[40%] h-full bg-secondary" />
                    </div>
                    <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-tertiary" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-on-surface/40">烈度</span>
                    <span className="text-[10px] text-on-surface/40">甜度</span>
                    <span className="text-[10px] text-on-surface/40">清爽度</span>
                  </div>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="w-full py-3 border border-primary/40 text-primary text-xs font-label rounded uppercase tracking-widest hover:bg-primary/5 transition-colors"
                  >
                    生成分享海报
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isShareModalOpen && (
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            imageUrl={imageUrl}
            cocktailName={cocktailName}
            cocktailDesc={cocktailDesc}
          />
        )}
      </AnimatePresence>

      <QuotaErrorModal
        isOpen={!!quotaError}
        onClose={() => setQuotaError(null)}
        message={quotaError || ''}
      />
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'workshop' | 'about'>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar onNavigate={setView} currentView={view} />
      
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onStartWorkshop={() => setView('workshop')} />
            <Features />
            <Testimonials />
            <FAQ />
            <CTA />
          </motion.div>
        ) : view === 'about' ? (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <About onStartWorkshop={() => setView('workshop')} />
          </motion.div>
        ) : (
          <motion.div
            key="workshop"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Workshop />
            <Features />
            <Testimonials />
            <FAQ />
            <CTA />
          </motion.div>
        )}
      </AnimatePresence>

      <LegacyFooter />
    </div>
  );
}
