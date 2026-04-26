import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, X, Minus, Maximize2,
  Monitor, PenTool, BookA, Calendar, SlidersHorizontal,
  Network
} from 'lucide-react';

const USER_NAME = "潘琳";
const WALLPAPER_URL = "/wallpaper.jpg"; 
const AVATAR_URL = "/avatar.jpg";       

const APPLE_FONT_CLASS = "font-[-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol']";

const RetroCursor = ({ x, y, visible }) => (
  <div
    className="fixed left-0 top-0 z-[9999] pointer-events-none"
    style={{
      transform: `translate(${x}px, ${y}px)`,
      opacity: visible ? 1 : 0
    }}
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'translate(-2px, -2px)' }}
    >
      <path d="M4 3L4 25L10 19L14 28L18 26L14 17L22 17L4 3Z" fill="black" />
      <path d="M4 3L22 17H14L18 26L14 28L10 19L4 25V3Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  </div>
);

// ==========================================
// 2. 状态 1：复古终端加载页 (Terminal)
// ==========================================
const TerminalScreen = ({ onComplete }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div className={`w-full h-screen bg-black text-[#0047AB] font-mono p-12 text-2xl flex flex-col justify-between cursor-pointer selection:bg-blue-900 ${APPLE_FONT_CLASS}`} onClick={onComplete}>
      <div className="flex justify-between items-start relative w-full">
        <motion.div
          className="w-full max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mb-12 mt-4 text-gray-400">Loading system components...</motion.p>
          {[
            { label: 'File：', val: 'Portfolio Website' },
            { label: 'Built with：', val: 'React, Tailwind, Framer Motion' },
            { label: 'Stack:', val: 'React, Next.js, Node, Figma' },
          ].map((item, i) => (
            <motion.div key={i} className="flex items-start gap-6 mt-3 min-w-[760px]" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <span className="inline-block w-48 shrink-0">{item.label}</span>
              <span>{item.val}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.img 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 0.8 }}
          src="/404.png" 
          alt="404 Error" 
          className="absolute right-8 top-0 w-[512px] object-contain drop-shadow-2xl" 
        />
      </div>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-auto mb-8"
      >
        <p className="text-3xl">Press<span className="font-bold text-white"> Enter</span> to load the system......</p>
      </motion.div>
    </div>
  );
};

// ==========================================
// 3. 状态 2：锁屏界面 (Lock Screen)
// ==========================================
const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`absolute inset-0 z-50 flex flex-col items-center justify-between py-24 bg-cover bg-center text-white ${APPLE_FONT_CLASS}`}
      style={{ backgroundImage: `url(${WALLPAPER_URL})` }}
      onClick={onUnlock}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-black/10" />
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-2xl font-medium tracking-wide drop-shadow-md">
          {time.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
        </p>
        <h1 className="text-8xl font-bold mt-2 tracking-tight drop-shadow-xl">
          {time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 pb-20">
        <img src={AVATAR_URL} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-white/30 object-cover shadow-2xl" />
        <h2 className="text-xl font-semibold drop-shadow-md">{USER_NAME}</h2>
        <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full pl-4 pr-1 py-1 w-56 shadow-inner border border-white/10">
          <input type="password" value="******" readOnly className="bg-transparent outline-none border-none text-white w-full tracking-widest text-lg" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUnlock();
            }}
            className="bg-[#fdfdfd]/30 hover:bg-white/50 transition p-1.5 rounded-full"
          >
            <ArrowRight size={18} />
          </button>
        </div>
        <p className="mt-2 text-[11px] text-white/65 drop-shadow-sm">🔒点击屏幕任意位置，即可解锁</p>
      </div>
    </motion.div>
  );
};

const profileTextContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.14,
    },
  },
};

const profileTextLineVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ProfileContent = () => (
  <div
    className={`flex flex-col md:flex-row gap-14 p-14 h-full bg-[#fdfdfd] text-gray-800 relative overflow-hidden ${APPLE_FONT_CLASS}`}
  >
    <motion.div
      className="w-[55%] flex flex-col justify-center"
      variants={profileTextContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-4xl font-black mb-4 tracking-tight text-gray-900 leading-tight"
        variants={profileTextLineVariants}
      >
        潘琳 <span className="font-semibold">  Linda Pan</span>
      </motion.h2>
      <motion.div className="flex gap-4 mb-7" variants={profileTextLineVariants}>
        <span
          className="text-lg font-bold"
          style={{
            background: 'linear-gradient(90deg, #5b5fff, #a166ff 75%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          #懂用户
        </span>
        <span
          className="text-lg font-bold"
          style={{
            background: 'linear-gradient(90deg, #5b5fff, #a166ff 75%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          #懂产品
        </span>
        <span
          className="text-lg font-bold"
          style={{
            background: 'linear-gradient(90deg, #5b5fff, #a166ff 75%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'inherit',
          }}
        >
          #懂业务
        </span>
      </motion.div>

      <motion.div className="text-[16px] text-gray-600 mb-10" style={{ lineHeight: '1.8', letterSpacing: '0.005em' }}>
        <motion.p variants={profileTextLineVariants}>
          我擅长深入洞察客户需求，通过
          <span className="relative inline-block font-medium text-gray-900 mx-0.5">
            定量定性调研拆解业务痛点
            <svg
              className="absolute w-full h-[13px] -bottom-[3px] left-0 pointer-events-none"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="underline-gradient-1" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#5b5fff" />
                  <stop offset="75%" stopColor="#a166ff" />
                </linearGradient>
              </defs>
              <path
                d="M2,7 Q10,11 18,7 Q26,3 34,7 Q42,11 50,7 Q58,3 66,7 Q74,11 82,7 Q90,3 98,7"
                fill="none"
                stroke="url(#underline-gradient-1)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          ，曾主导 0-1 搭建黄金脚本 AI Agent，实现 AI 赋能营销全链路提效，
          <span className="relative inline-block font-medium text-gray-900 mx-0.5">
            内容投放成本降低超 50%
            <svg
              className="absolute w-full h-[13px] -bottom-[3px] left-0 pointer-events-none"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="underline-gradient-2" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#5b5fff" />
                  <stop offset="75%" stopColor="#a166ff" />
                </linearGradient>
              </defs>
              <path
                d="M2,9 Q12,4 22,9 Q32,14 42,9 Q52,4 62,9 Q72,14 82,9 Q92,4 98,9"
                fill="none"
                stroke="url(#underline-gradient-2)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          ；具备以 AI + 数据驱动业务流程标准化与产品迭代，打通用户、产品与商业的增长闭环。
        </motion.p>
      </motion.div>

      <motion.div className="flex gap-15 mt-15" variants={profileTextLineVariants}>
        <div>
          <p className="font-bold text-gray-900 mb-1 text-sm">
            电话：
          </p>
          <p className="text-gray-600 text-sm">13585754192</p>
        </div>
        <div>
          <p className="font-bold text-gray-900 mb-1 text-sm">
            邮箱：
          </p>
          <p className="text-gray-600 text-sm">lindapan1011@163.com</p>
        </div>
      </motion.div>
    </motion.div>
    <div className="w-[45%] flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm aspect-[4/5] transform rotate-3 hover:rotate-1 transition-transform duration-500">
        <img
          src={AVATAR_URL}
          className="absolute inset-0 w-full h-full object-cover rounded-[2rem] border border-gray-100"
          alt="Profile"
          style={{
            boxShadow:
              '0 10px 38px 0 rgba(33, 46, 90, 0.28), 0 3px 10px rgba(33,46,90,0.14), 0 0px 0px 0 rgba(0,0,0,0.1)',
          }}
        />
      </div>
    </div>
  </div>
);

const ExperienceContent = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const experienceScrollRef = useRef(null);
  const [scrollbarState, setScrollbarState] = useState({
    show: false,
    thumbHeightPct: 24,
    thumbTopPct: 0
  });

  const gradientTextClassName = "font-bold bg-gradient-to-r from-[#5b5fff] to-[#a166ff] text-transparent bg-clip-text";

  const experienceHighlightMap = {
    anker: {
      0: ['构建用户需求模型'],
      1: ['深挖用户痛点'],
      2: ['IMC 方案策划与项目管理', '2025 H1 千万营收达成'],
      3: ['广告 ROAS 翻倍增长']
    },
    bytedance: {
      0: ['飞书使用场景和最佳实践'],
      1: ['输出 AI 产品与协同办公场景结合的洞察报告'],
      2: ['策划产品传播选题与内容方向']
    },
    loreal: {
      0: ['监测投放表现', '品类第一'],
      1: ['洞察品牌销售趋势', '市场分析', '消费者洞察']
    },
    unilever: {
      0: ['竞品分析', '新品概念设计'],
      1: ['新品开发', '消费者痛点', 'Concept Board'],
      2: ['数据分析', '可视化销售趋势'],
      3: ['项目支持', 'A/B Testing']
    },
    ailande: {
      0: ['对接产品研发、设计、运营'],
      2: ['阅读量提升 85%，涨粉 2k+']
    }
  };

  const renderHighlightedText = (text, phrases, keyPrefix) => {
    if (!phrases || phrases.length === 0) {
      return text;
    }

    const orderedPhrases = [...phrases].sort((a, b) => b.length - a.length);
    const escaped = orderedPhrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const matcher = new RegExp(`(${escaped.join('|')})`, 'g');
    const segments = text.split(matcher);

    return segments.map((segment, idx) => {
      if (!segment) {
        return null;
      }

      const phraseIdx = orderedPhrases.indexOf(segment);
      if (phraseIdx === -1) {
        return <React.Fragment key={`${keyPrefix}-plain-${idx}`}>{segment}</React.Fragment>;
      }

      return (
        <span key={`${keyPrefix}-em-${idx}`} className={gradientTextClassName}>
          {segment}
        </span>
      );
    });
  };

  const experiences = [
    {
      date: '2024.07 - 至今',
      role: '全球品牌经理',
      company: '安克创新｜eufy',
      companyKey: 'anker',
      location: '深圳',
      type: '全职',
      points: [
        '用户洞察与需求分析：通过 12 场用户访谈和 1000+ 份定量调研，深入理解母婴用户在喂养旅程核心场景中的行为习惯与痛点，拆解用户从认知—决策—购买—使用的完整用户旅程，识别影响转化的关键需求与决策因素；基于调研结果构建用户需求模型，提炼核心产品卖点与价值表达，为新品定位、功能沟通与增长策略提供依据',
        '新品上市：主导两款旗舰新品吸奶器+洗消烘全球上市策略制定与执行，深挖用户痛点并匹配产品功能卖点及情感价值，明确产品定位及差异化优势，协同 PM、GTM 和设计团队高质量完成整合传播策略与 20+ 套营销物料制作，首销一个月销额 2 倍达成',
        '整合营销：借势美国春促、母亲节、Prime Day 三大节点，主责 IMC 方案策划与项目管理，基于业务目标拆解达成路径，通过“专家权威背书+ KOC 种草引流+广告精准收割”，实现站内外高效协同，支撑美国市场 2025 H1 千万营收达成，ROI 提升至 3+（较 2024 H2 提升约 200%+）',
        '内容营销：通过拆解 200+ 条高表现内容，结合用户画像与行为数据，0-1 沉淀高效内容标签体系+高光帧画面，构建“前 3 秒钩子+场景化演绎+穿透性信息”爆款脚本模型，达成 Meta 平台 BGC 内容引流成本降低 50%，CTR 提升 2 倍，广告 ROAS 翻倍增长'
      ],
      cards: [
        { img: '/anker1.jpg', caption: '需求拆解' },
        { img: '/anker2.jpg', caption: 'Agent搭建' },
        { img: '/anker3.jpg', caption: '策略模型复盘' }
      ]
    },
    {
      date: '2023.07 - 2024.03',
      role: '产品营销',
      company: '字节跳动｜飞书',
      companyKey: 'bytedance',
      location: '上海',
      type: '实习',
      points: [
        '商业化产品赋能：梳理消费、零售、餐饮等行业 20+ 企业客户飞书使用场景和最佳实践，提炼产品功能与业务价值，设计 30+ 份客户案例材料，支持商业化团队客户沟通及销售解决方案',
        'AI 行业研究与产品洞察：定期跟踪大模型、AIGC 及 AI Agent 等技术发展趋势，整理 AI 企业协同应用场景，输出 AI 产品与协同办公场景结合的洞察报告，为产品传播与商业化策略提供参考',
        '产品增长与内容传播：结合企业协同与数字化管理场景，策划产品传播选题与内容方向，协同市场团队进行产品内容传播，提升潜在客户线索获取'
      ],
      cards: [
        { img: '/feishu1.jpg', caption: '飞书发布会' },
        { img: '/feishu2.jpg', caption: '公众号运营' },
        { img: '/feishu3.jpg', caption: '企业客户案例' }
      ]
    },
    {
      date: '2023.02 - 2023.06',
      role: '产品&数字营销',
      company: '欧莱雅｜巴黎欧莱雅',
      companyKey: 'loreal',
      location: '上海',
      type: '实习',
      points: [
        '社媒投放与内容策略：参与身体护理产品线的社媒投放与种草策略制定，基于产品卖点与用户需求挖掘传播角度，支持执行 100+ 条内容及视频素材审核与上线，并监测投放表现与舆情反馈，优化传播内容与素材方向，3 月产品 Search Index 保持品类第一',
        '数据分析与市场洞察：使用情报通、集瓜、SDDS 等数据工具，分析线上电商与线下零售渠道多品类 SKU 销售数据，从市场规模、品牌份额、竞品表现等维度构建分析报表，洞察品牌销售趋势与市场变化，输出市场分析与消费者洞察，为产品营销与市场策略提供数据支持'
      ],
      cards: [
        { img: '/loreal1.jpg' },
        { img: '/loreal2.jpg' },
        { img: '/loreal3.jpg' }
      ]
    },
    {
      date: '2022.12 - 2023.02',
      role: '市场营销',
      company: '联合利华｜奥妙',
      companyKey: 'unilever',
      location: '上海',
      type: '实习',
      points: [
        '竞品分析：基于智能家电行业前景，结合 20+ 份专业设备清洁市场分析报告，搜集国内外 4+ 个品牌自动投放产品相关素材，从产品成分、包装设计、定价策略等角度完成竞品分析 3+，为新品概念设计提供 Insight',
        '新品开发：参与奥妙、金纺专业设备清洁产品概念设计，结合 12 份 In-Home Visit 消费者调研，挖掘智能家电自动投放消费者痛点，独立负责 2 款智能投放新品 Concept Board 撰写，最终被应用为新品概念',
        '数据分析：利用商智等数据平台，从 Click、CVR 等角度追踪市场大盘、产品生意表现，输出周报 20+，可视化销售趋势，提供客群分析和高转化投放模式等洞察，优化后续资源投放策略',
        '项目支持：参与奥妙地面清洁液电商视觉焕新，对接设计 Agency，针对现有电商页面 KV 和详情页文案、排版、宣称等问题下达修改 Brief，针对新素材进行 A/B Testing，通过销售周报等数据总结 Learning'
      ],
      cards: []
    },
    {
      date: '2022.05 - 2022.12',
      role: '市场营销',
      company: '艾兰得',
      companyKey: 'ailande',
      location: '上海',
      type: '实习',
      points: [
        '新品发布：基于 DTC 新消费模式，针对大健康行业及头部品牌进行市场调研，输出 3+ 份市场调研报告，筛选可行新品研发方向，深度参与 5+ 款功能性零食新品发布，搭建新品上市交付时间表，对接产品研发、设计、运营，给出并收集产品优化建议，确保新品顺利上市',
        '视觉设计：深入研究 10+ 竞品品牌视觉设计风格，下达物料 Shooting Brief，把控产品物料拍摄与设计进度；提炼产品卖点，撰写 5+ 产品电商详情页文案与设计 Brief，对接法务审核、电商设计和店铺运营，完成 5+ 新品电商详情页上线，促进品牌店铺整体视觉优化升级',
        '社媒运营：结合品牌定位，运营品牌官方小红书账号，结合时新热点，独立完成月度选题策划 2+，负责内容编辑，制作并发布图文与视频笔记 40 余条，阅读量提升 85%，涨粉 2k+，有效提升品牌曝光'
      ],
      cards: []
    }
  ];

  const active = experiences[selectedIdx];
  
  useEffect(() => {
    const scrollEl = experienceScrollRef.current;
    if (!scrollEl) return;

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const maxScroll = Math.max(scrollHeight - clientHeight, 0);
      const hasOverflow = maxScroll > 2;

      if (!hasOverflow) {
        setScrollbarState({ show: false, thumbHeightPct: 24, thumbTopPct: 0 });
        return;
      }

      const thumbHeightPct = Math.max((clientHeight / scrollHeight) * 100, 16);
      const thumbTopPct = (scrollTop / maxScroll) * (100 - thumbHeightPct);
      setScrollbarState({
        show: true,
        thumbHeightPct,
        thumbTopPct
      });
    };

    scrollEl.scrollTop = 0;
    updateScrollbar();
    scrollEl.addEventListener('scroll', updateScrollbar);
    window.addEventListener('resize', updateScrollbar);

    return () => {
      scrollEl.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
    };
  }, [selectedIdx]);

  // For card tilt - hardcode simple angles for three cards
  const cardAngles = [-6, 2, 6]; // visually pleasing, mild tilt

  // Gradient style for 安克全职"全职"标签 (left and right)
  // 淡一点: 用更亮且更淡的色彩
  const gradientTextClass = "bg-gradient-to-r from-[#7b7ffe] to-[#bbaaf6] text-transparent bg-clip-text";
  const gradientBgClass = "bg-gradient-to-r from-[#ecedfc] to-[#e2dbf5]";

  return (
    <div className={`flex h-full bg-white ${APPLE_FONT_CLASS}`}>
      {/* 左侧边栏 - 保持原有的 macOS 风格 */}
      <div className="w-[260px] border-r border-gray-200/80 flex flex-col bg-[#f5f5f7] shrink-0">
        <div className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200/60">
          Experience
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-[2px]">
          {experiences.map((exp, idx) => {
            const isActive = selectedIdx === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                  isActive ? 'bg-[#fff7d6] text-gray-900 font-medium shadow-sm' : 'text-gray-700 hover:bg-[#fffbe8]'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className={`text-[13px] ${isActive ? 'font-bold' : 'font-semibold'} leading-snug mb-0.5`}>
                    {exp.role}
                    {exp.type === '实习' && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-white text-gray-500 border border-gray-200 align-middle shadow-sm">
                        实习
                      </span>
                    )}
                    {exp.type === '全职' && exp.companyKey === 'anker' && (
                      <span
                        className={`ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded border border-gray-200 align-middle shadow-sm text-[#7161db]`}
                        style={{
                          // 更淡更亮的线性渐变、主色淡化
                          background: 'linear-gradient(90deg,#ecedfc,#e2dbf5)',
                          color: '#7161db'
                        }}
                      >
                        全职
                      </span>
                    )}
                    {exp.type === '全职' && exp.companyKey !== 'anker' && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-white text-[#3b82f6] border border-gray-200 align-middle shadow-sm">
                        全职
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <div className={`text-[11px] ${isActive ? 'text-gray-600' : 'text-gray-500'} leading-snug truncate`}>
                    {exp.company}
                  </div>
                  {/* 完整显示时间段 */}
                  <div className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0 text-right ml-1">
                    {exp.date}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
        <div className="px-8 py-3 text-[12px] text-gray-400 text-center border-b border-gray-100 shrink-0 font-medium select-none bg-white/80 backdrop-blur-sm z-10">
          {active.date}
        </div>
        
        {/* 这里整体将正文内容上移一些（调整mt-0负margin） */}
        <div className="relative flex-1 min-h-0">
        <div ref={experienceScrollRef} className="h-full overflow-y-scroll px-12 py-10 pr-14">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col -mt-4"
          >
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-gray-900 tracking-tight mb-2">
                {active.role}
                {active.type === '实习' && (
                  <span className="ml-3 px-2 py-[2px] text-[12px] font-semibold rounded-md bg-[#f0f0f0] text-gray-600 border border-gray-200 align-middle">
                    实习
                  </span>
                )}
                {active.type === '全职' && active.companyKey === 'anker' && (
                  <span
                    className="ml-3 px-2 py-[2px] text-[12px] font-semibold rounded-md border border-gray-200 align-middle text-[#7161db]"
                    style={{
                      background: 'linear-gradient(90deg, #ecedfc, #e2dbf5)',
                      color: '#7161db'
                    }}
                  >
                    全职
                  </span>
                )}
                {active.type === '全职' && active.companyKey !== 'anker' && (
                  <span className="ml-3 px-2 py-[2px] text-[12px] font-semibold rounded-md bg-[#f0f0f0] text-[#3b82f6] border border-gray-200 align-middle">
                    全职
                  </span>
                )}
              </h2>
              <div className="flex justify-between items-center gap-6">
                <span className="text-[15px] font-medium text-gray-600">{active.company}</span>
                {active.location && (
                  // 右对齐工作地点及icon，整体往左挪动一点
                  <span className="flex items-center gap-2 text-[15px] text-gray-600 justify-end min-w-[60px] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                      <path d="M10 2.75C6.82436 2.75 4.25 5.21815 4.25 8.30667C4.25 12.0027 9.27815 16.8896 9.49134 17.0903C9.63692 17.2256 9.81671 17.3 10 17.3C10.1833 17.3 10.3631 17.2256 10.5087 17.0903C10.7219 16.8896 15.75 12.0027 15.75 8.30667C15.75 5.21815 13.1756 2.75 10 2.75ZM10 9.9C9.04243 9.9 8.25 9.12568 8.25 8.21923C8.25 7.31278 9.04243 6.53846 10 6.53846C10.9576 6.53846 11.75 7.31278 11.75 8.21923C11.75 9.12568 10.9576 9.9 10 9.9Z"/>
                    </svg>
                    <span>{active.location}</span>
                  </span>
                )}
              </div>
            </div>
            
            {/* 描述内容区 - 自动识别冒号并加粗总结 */}
            <div className="space-y-4 mb-12">
              {active.points.map((point, i) => {
                // 兼容中文冒号和英文冒号进行切割
                const parts = point.split(/[：:]/); 
                const highlightPhrases = experienceHighlightMap[active.companyKey]?.[i] || [];
                return (
                  <div key={i} className="flex gap-4 text-[14px] text-gray-700 leading-relaxed">
                    <span className="mt-2.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    <span className="flex-1">
                      {parts.length > 1 ? (
                        <>
                          {/* 冒号前的总结文案：加粗并使用更深的颜色 */}
                          <span className="font-bold text-gray-900">{parts[0]}：</span>
                          {renderHighlightedText(
                            parts.slice(1).join('：'),
                            highlightPhrases,
                            `${active.companyKey}-${i}`
                          )}
                        </>
                      ) : (
                        renderHighlightedText(point, highlightPhrases, `${active.companyKey}-${i}`)
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 欧莱雅正文不展示图片卡片 */}
            {active.companyKey !== 'loreal' && active.cards?.length > 0 && (
              <div
                className="mt-0.1 w-full pb-1 flex justify-center items-end gap-[1px] relative min-h-[12vw] select-none"
                style={{ transform: 'translateY(-12%)' }}
              >
                {/*
                  仅安克与飞书卡片启用轻微 hover 放大动效
                */}
                {(() => {
                  const enableCardHover = ['anker', 'bytedance'].includes(active.companyKey);
                  return active.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    className={`
                      flex-1
                      min-w-0
                      max-w-[36.4%] 
                      rounded-2xl
                      bg-white
                      shadow-[0_8px_24px_rgba(0,0,0,0.07)]
                      overflow-hidden
                      border
                      border-gray-100
                      cursor-default
                      pointer-events-auto
                      transition-transform
                      duration-300
                      flex
                      items-center
                      justify-center
                      mb-6
                    `}
                    style={{ aspectRatio: "16 / 10" }}
                    initial={false}
                    animate={{ scale: 0.92, rotate: cardAngles[i] }}
                    whileHover={
                      enableCardHover
                        ? { scale: 0.99, y: -2, transition: { duration: 0 } }
                        : undefined
                    }
                    transition={{ duration: 0 }}
                    tabIndex={-1}
                  >
                    <div className="w-full h-full bg-gray-50 flex flex-col">
                      <img
                        src={card.img}
                        alt={`highlight-${i}`}
                        className={`w-full ${card.caption ? 'h-[calc(100%-28px)]' : 'h-full'} object-cover`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('bg-gray-100', 'flex', 'items-center', 'justify-center');
                          e.target.parentElement.innerHTML = '<span class="text-[10px] text-gray-400">待上传</span>';
                        }}
                      />
                      {card.caption && (
                        <div className="h-7 flex items-center justify-center text-[11px] text-gray-500 font-medium tracking-wide">
                          {card.caption}
                        </div>
                      )}
                    </div>
                  </motion.div>
                  ));
                })()}
              </div>
            )}
          </motion.div>
        </div>
        <div className="absolute right-2 top-6 bottom-6 w-[8px] pointer-events-none">
          <div className="relative h-full w-full rounded-full bg-[#f2f2f2] border border-[#e5e5e5]">
            {scrollbarState.show && (
              <div
                className="absolute left-[1px] right-[1px] rounded-full bg-[#c3c3c3]"
                style={{
                  height: `${scrollbarState.thumbHeightPct}%`,
                  top: `${scrollbarState.thumbTopPct}%`
                }}
              />
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

const SkillsContent = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const skills = [
    {
      icon: <Monitor size={18} strokeWidth={1.5} />,
      title: 'AI 能力',
      desc: '熟练操作基础 Vide Coding 及 Agent 搭建，熟悉大模型能力边界及应用场景',
      tags: ['Cursor', 'Claude Code', 'Trae', 'Coze', 'Vibe Coding', 'Vercel'],
      image: '/skill1.png',
      cardBg: '#e8e7f4'
    },
    {
      icon: <Network size={18} strokeWidth={1.5} />,
      title: '业务能力',
      desc: '熟练使用以下工具进行需求梳理与方案设计、平面内容制作、图像视频生成、基础数据分析',
      tags: ['Figma', 'PS', 'PR','AU','AE','XMind'],
      image: '/skill2.png',
      cardBg: '#eaf3ff'
    },
    {
      icon: <BookA size={18} strokeWidth={1.5} />,
      title: '语言能力',
      desc: '英语口语流利，专八优秀，可作为工作语言',
      tags: ['TEM 8', 'TEM 6','CET 6','CET 4','商务英语'],
      image: '/skill3.png',
      cardBg: '#f6efe7'
    }
  ];
  return (
    <div className={`h-full bg-[#fdfdfd] flex flex-col p-8 select-none ${APPLE_FONT_CLASS}`}>
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h2 className="text-[30px] font-bold text-gray-900 leading-tight tracking-tight">My Tech Stack & Methods</h2>
          <p className="text-gray-600 text-[12px] mt-2 max-w-sm leading-relaxed">
            擅长深入洞察客户需求，拆解业务痛点，用 AI 赋能业务提质、提效
          </p>
        </div>
      </div>
      <div className="flex-1 flex gap-3 min-h-0 w-full max-w-[960px] mx-auto">
        {skills.map((skill, idx) => {
          const isActive = activeIdx === idx;
          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`
                relative
                rounded-[24px]
                shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                overflow-hidden
                cursor-pointer
                flex flex-col
                group
                transition-colors
                `}
              style={{
                backgroundColor: skill.cardBg,
              }}
              initial={false}
              animate={{ flex: isActive ? 1.75 : 0.85 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              // 小屏幕 touch 高亮也需要支持
              onClick={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              tabIndex={0}
            >
              {/* 非激活状态显示的图标 */}
              {!isActive && (
                <div className="p-5 pb-0 shrink-0 transition-colors" style={{ backgroundColor: skill.cardBg }}>
                  <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-white/50">
                    {skill.icon}
                  </div>
                </div>
              )}

              <div className="flex-1 relative min-h-0">
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: 0.1 }}
                      className="absolute inset-0 flex flex-col"
                    >
                      {/* 1. 图片区：在上部，无阴影，h 占60%，不需要留边距 */}
                      <div className="w-full h-[60%] overflow-hidden shrink-0">
                        <img src={skill.image} alt={skill.title} className="w-full h-full object-cover" />
                      </div>
                      {/* 2. 文字区：在下部 */}
                      <div className="flex-1 flex flex-col min-w-0 px-5 pt-5 pb-5">
                        <h3 className="text-[18px] font-semibold text-gray-900 mb-1.5">{skill.title}</h3>
                        <p className="text-[12px] text-gray-600 leading-relaxed mb-4">{skill.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {/* 3. 标签：底色改为 bg-white */}
                          {skill.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`px-2.5 py-1 bg-white text-gray-600 text-[11px] rounded-full font-medium border border-gray-100`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
                    >
                      <h3 className="text-[13px] font-medium text-gray-900 truncate">{skill.title}</h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ProjectsContent = () => {
  const projects = [
    {
      year: '2025.3 - 2025.7',
      title: '黄金脚本 AI Agent',
      description: '项目背景：针对广告短视频内容生产效率低、爆款依赖经验、难规模复制的痛点，与 MKT AI 部门协作 0-1 搭建黄金脚本 AI Agent',
      link: 'https://www.anker.com',
      images: [
        '/项目1.png',
        '/项目2.png',
        '/项目3.mp4'
      ]
    }
  ];

  const isVideo = (url) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);

  return (
    <div className={`bg-[#fdfdfd] min-h-full ${APPLE_FONT_CLASS}`}>
      {projects.map((project, idx) => (
        <div key={idx} className="flex flex-col md:flex-row">
          <motion.div
            className="md:w-[42%] md:sticky md:top-0 md:self-start flex flex-col justify-center p-10 md:p-12 shrink-0"
            variants={profileTextContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={profileTextLineVariants}
              className="text-sm font-medium text-gray-500 w-fit mb-6 tracking-wide"
            >
              {project.year}
            </motion.span>
            <motion.h3
              variants={profileTextLineVariants}
              className="text-[26px] leading-tight font-bold mb-5 tracking-tight inline-block text-gray-900"
              // 移除 gradient 和 transparent，仅用黑色
            >
              {project.title}
            </motion.h3>
            <motion.div
              variants={profileTextLineVariants}
              className="text-[15px] text-gray-500 leading-relaxed mb-10 space-y-4"
            >
              {project.description.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
            <div className="border-t border-gray-200 mb-7 mt-0" />
            <motion.div variants={profileTextLineVariants} className="mb-6">
              <h4 className="text-[13px] font-semibold text-gray-900 mb-3 tracking-wide">工作内容</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-[#5b5fff] text-[13px] font-bold shrink-0 mt-0.5">01</span>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-800">构建内容标签树：</span>
                    基于母婴人群洞察，设计覆盖产品卖点（FABE 模型）、内容类型、视频风格、人物设定和视听语言的内容标签树，为 AI 分析提供结构化语料
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#5b5fff] text-[13px] font-bold shrink-0 mt-0.5">02</span>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-800">AI 工作流设计：</span>
                    主导设计"素材分析——爆款模式提炼——自动脚本生成"的 AI Agent 流程；输入 200+ 条高表现视频，AI 自动归纳爆款共性规律并沉淀为脚本框架、新脚本及 VO 文案
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={profileTextLineVariants}
              className="bg-gradient-to-br from-[#f8f9ff] to-[#f0f2ff] border border-[#e8eaff] rounded-xl p-5 mb-8"
            >
              <h4 className="text-[13px] font-semibold text-gray-900 mb-3 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5b5fff]"></span>
                效果验证
              </h4>
              <p className="text-[13px] text-gray-700 leading-[1.8]">
                Prime Day 期间完成 8 条 AI 脚本视频剪辑与广告投放验证，其中 4 条脚本成功出单，
                <span className="font-bold text-[#5b5fff]"> 引流成本 </span>
                vs 非 AI 二剪内容
                <span className="font-bold text-[#5b5fff]"> 降低 51% </span>
                ，
                <span className="font-bold text-[#5b5fff]"> 加购成本 </span>
                vs KOL 内容
                <span className="font-bold text-[#5b5fff]"> 降低 59% </span>
              </p>
            </motion.div>
          </motion.div>
          <div className="md:w-[58%] p-6 md:p-10 space-y-6">
            {project.images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100/50"
              >
                {isVideo(src) ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover block"
                  />
                ) : (
                  <img src={src} alt={`Project ${i + 1}`} className="w-full h-auto object-cover block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 4. 状态 3&4：桌面系统 UI与窗口逻辑 (Desktop)
// ==========================================
const DesktopScreen = () => {
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const desktopAreaRef = useRef(null);
  const [draggingFolderId, setDraggingFolderId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [movedFolderIds, setMovedFolderIds] = useState({});
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: -22 });
  const [isDraggingWindow, setIsDraggingWindow] = useState(false);
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const month = time.getMonth() + 1;
  const date = time.getDate();
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayStr = days[time.getDay()];
  const timeStr = time.toLocaleTimeString('zh-CN', { hour12: false });
  const formattedDate = `${month}月${date}日 ${dayStr} ${timeStr}`;

  const dockItems = [
    { id: 'profile', imgSrc: '/intro.png', label: 'About Me' },
    { id: 'experience', imgSrc: '/work.png', label: 'Working Experience' },
    { id: 'projects', imgSrc: '/project.png', label: 'Project' },
    { id: 'skills', imgSrc: '/skill.png', label: 'Skills' },
    { id: 'trash', imgSrc: '/trash.png', label: 'Trash' },
  ];

  const desktopFolders = [
    { id: 'profile', label: 'About Me', imgSrc: '/intro.png' },
    { id: 'experience', label: 'Working Experience', imgSrc: '/work.png' },
    { id: 'projects', label: 'Project', imgSrc: '/project.png' },
    { id: 'skills', label: 'Skills', imgSrc: '/skill.png' }
  ];
  const [folderPositions, setFolderPositions] = useState(() =>
    desktopFolders.reduce((acc, folder, idx) => {
      acc[folder.id] = { x: 24, y: 20 + idx * 104 };
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!draggingFolderId) return undefined;

    const handleMouseMove = (event) => {
      const desktopArea = desktopAreaRef.current;
      if (!desktopArea) return;

      const areaRect = desktopArea.getBoundingClientRect();
      const iconWidth = 80;
      const iconHeight = 86;
      const nextX = event.clientX - areaRect.left - dragOffset.x;
      const nextY = event.clientY - areaRect.top - dragOffset.y;
      const clampedX = Math.max(0, Math.min(nextX, areaRect.width - iconWidth));
      const clampedY = Math.max(0, Math.min(nextY, areaRect.height - iconHeight));

      setFolderPositions((prev) => {
        const current = prev[draggingFolderId];
        if (!current) return prev;

        if (Math.abs(current.x - clampedX) > 2 || Math.abs(current.y - clampedY) > 2) {
          setMovedFolderIds((movedPrev) => ({ ...movedPrev, [draggingFolderId]: true }));
        }

        return {
          ...prev,
          [draggingFolderId]: { x: clampedX, y: clampedY },
        };
      });
    };

    const handleMouseUp = () => {
      setDraggingFolderId(null);
      setDragOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragOffset.x, dragOffset.y, draggingFolderId]);

  const handleFolderMouseDown = (event, folderId) => {
    event.preventDefault();
    const desktopArea = desktopAreaRef.current;
    const position = folderPositions[folderId];
    if (!desktopArea || !position) return;

    const areaRect = desktopArea.getBoundingClientRect();
    setDraggingFolderId(folderId);
    setDragOffset({
      x: event.clientX - areaRect.left - position.x,
      y: event.clientY - areaRect.top - position.y,
    });
    setMovedFolderIds((prev) => ({ ...prev, [folderId]: false }));
  };

  const handleFolderClick = (folderId) => {
    if (movedFolderIds[folderId]) {
      setMovedFolderIds((prev) => ({ ...prev, [folderId]: false }));
      return;
    }

    setActiveWindow(folderId);
  };

  useEffect(() => {
    if (!activeWindow || activeWindow === 'trash') return;
    setWindowPosition({ x: 0, y: -22 });
  }, [activeWindow]);

  useEffect(() => {
    if (!isDraggingWindow) return undefined;

    const handleWindowMouseMove = (event) => {
      const windowWidth = 1000;
      const windowHeight = 570;
      const topOffset = 32;

      const nextLeft = event.clientX - windowDragOffset.x;
      const nextTop = event.clientY - windowDragOffset.y;

      const clampedLeft = Math.max(0, Math.min(nextLeft, window.innerWidth - windowWidth));
      const clampedTop = Math.max(topOffset, Math.min(nextTop, window.innerHeight - windowHeight));

      setWindowPosition({
        x: clampedLeft - (window.innerWidth / 2 - windowWidth / 2),
        y: clampedTop - (window.innerHeight / 2 - windowHeight / 2),
      });
    };

    const handleWindowMouseUp = () => {
      setIsDraggingWindow(false);
      setWindowDragOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDraggingWindow, windowDragOffset.x, windowDragOffset.y]);

  const handleWindowMouseDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();

    const windowWidth = 1000;
    const windowHeight = 570;
    const currentLeft = window.innerWidth / 2 - windowWidth / 2 + windowPosition.x;
    const currentTop = window.innerHeight / 2 - windowHeight / 2 + windowPosition.y;

    setIsDraggingWindow(true);
    setWindowDragOffset({
      x: event.clientX - currentLeft,
      y: event.clientY - currentTop,
    });
  };

  const renderContent = () => {
    switch(activeWindow) {
      case 'profile': return <ProfileContent />;
      case 'experience': return <ExperienceContent />;
      case 'projects': return <ProjectsContent />;
      case 'skills': return <SkillsContent />;
      default: return null;
    }
  };

  const windowTitles = { profile: "About Me", experience: "Working Experience", projects: "Project", skills: "Skills" };

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-cover bg-center ${APPLE_FONT_CLASS}`} style={{ backgroundImage: `url(${WALLPAPER_URL})` }}>
      <div className={`absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 text-white text-[13px] z-50 shadow-sm border-b border-white/5 ${APPLE_FONT_CLASS}`}>
        <div className="flex items-center gap-4 font-medium drop-shadow-sm">
          <span className="font-bold cursor-default text-lg leading-none mb-1"></span>
          <span className="font-bold cursor-default">{USER_NAME} </span>
          <span className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition hidden md:block">File</span>
          <span className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition hidden md:block">Edit</span>
          <span className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition hidden md:block">View</span>
          <span className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded transition hidden md:block">Help</span>
        </div>
        <div className={`flex items-center gap-4 drop-shadow-sm font-medium tracking-wide ${APPLE_FONT_CLASS}`}>
          <img src="/my-wifi.png" alt="wifi" className="w-4 h-4 opacity-90 object-contain" />
          <div className="flex items-center gap-1.5 opacity-90">
            <span className={APPLE_FONT_CLASS}>75%</span>
            <img src="/my-battery.png" alt="battery" className="w-6 h-4 object-contain" />
          </div>
          <span className={`ml-1 ${APPLE_FONT_CLASS}`}>{formattedDate}</span>
        </div>
      </div>
      <div ref={desktopAreaRef} className="absolute top-8 left-0 right-0 bottom-24 z-10">
        {desktopFolders.map(folder => (
          <div 
            key={folder.id} 
            className={`absolute flex flex-col items-center gap-1.5 group w-20 p-1.5 hover:bg-white/25 hover:backdrop-blur-md hover:shadow-xl rounded-xl ${draggingFolderId === folder.id ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              left: folderPositions[folder.id]?.x ?? 0,
              top: folderPositions[folder.id]?.y ?? 0,
            }}
            onMouseDown={(event) => handleFolderMouseDown(event, folder.id)}
            onClick={() => handleFolderClick(folder.id)}
          >
            <div className="w-12 h-12 relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img src={folder.imgSrc} alt={folder.label} draggable={false} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <span className="text-white text-[11px] px-1 py-[2px] rounded text-center font-medium drop-shadow-md">
              {folder.label}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute right-12 bottom-12 z-1 text-[13px] text-white/60 drop-shadow-sm pointer-events-none select-none">
        ✍️ 温馨提示：桌面图标和弹窗窗口可随意拽拖或关闭
      </div>
      <AnimatePresence mode="wait">
        {activeWindow && activeWindow !== 'trash' && (
          <motion.div
            key="os-window"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ x: windowPosition.x, y: windowPosition.y }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[570px] bg-white backdrop-blur-3xl rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-40"
          >
            <div
              className={`h-8 bg-gray-100/80 border-b border-gray-200/80 flex items-center px-4 relative flex-shrink-0 backdrop-blur-xl ${isDraggingWindow ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleWindowMouseDown}
            >
              <div className="flex gap-2 absolute left-4">
                <button onMouseDown={(event) => event.stopPropagation()} onClick={() => setActiveWindow(null)} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center group"><X size={8} className="opacity-0 group-hover:opacity-100 text-[#990000]" /></button>
                <button onMouseDown={(event) => event.stopPropagation()} className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center group"><Minus size={8} className="opacity-0 group-hover:opacity-100 text-[#995500]" /></button>
                <button onMouseDown={(event) => event.stopPropagation()} className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center group"><Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-[#006500]" /></button>
              </div>
              <div className="w-full text-center text-[15px] font-semibold text-gray-700 tracking-wide">{windowTitles[activeWindow]}</div>
            </div>
            <div className="flex-1 overflow-y-auto bg-transparent">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-40 pointer-events-none">
      <div
        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[20px] px-3 py-2.5 flex gap-2.5 items-center pointer-events-auto"
      >
        {dockItems.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div
              className="relative group flex flex-col items-center"
              onClick={() => setActiveWindow(item.id)}
            >
              <div className="w-10 h-10 rounded-[10px] overflow-hidden flex items-center justify-center cursor-pointer bg-transparent transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:bg-transparent shadow-sm">
                <img 
                  src={item.imgSrc} 
                  alt={item.label} 
                  draggable={false}
                  className="w-full h-full object-cover bg-transparent" 
                />
              </div>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-black/70 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-white/10">
                {item.label}
              </div>
              {/* Active indicator */}
              {activeWindow === item.id && (
                <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full"></div>
              )}
            </div>
            {/* Divider before Trash */}
            {idx === dockItems.length - 2 && (
              <div className="w-px h-7 bg-white/15 mx-1"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
    </div>
  );
};

// ==========================================
// 5. 主入口 App 容器 
// ==========================================
export default function PortfolioApp() {
  const [appState, setAppState] = useState('terminal');
  const [cursorPosition, setCursorPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) setAppState('mobile');
      else if (appState === 'mobile') setAppState('terminal');
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [appState]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorVisible(true);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    document.documentElement.style.setProperty('cursor', 'none', 'important');
    document.body.style.setProperty('cursor', 'none', 'important');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');
    };
  }, []);

  if (appState === 'mobile') {
    return (
      <div className={`w-full h-screen bg-black text-white flex items-center justify-center text-center p-6 overflow-hidden ${APPLE_FONT_CLASS}`}>
        <p className="text-xl font-mono leading-loose tracking-wider">
          为了获得更好体验<br/>请使用桌面端访问<br/><br/>
          <span className="text-gray-500 text-sm">For a better experience<br/>use the desktop version</span>
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full h-screen overflow-hidden select-none bg-black cursor-none ${APPLE_FONT_CLASS}`}>
      {appState === 'terminal' && <TerminalScreen onComplete={() => setAppState('lockscreen')} />}
      <AnimatePresence>
        {appState === 'lockscreen' && <LockScreen key="lock" onUnlock={() => setAppState('desktop')} />}
      </AnimatePresence>
      {appState === 'desktop' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="w-full h-full">
          <DesktopScreen />
        </motion.div>
      )}
      <RetroCursor x={cursorPosition.x} y={cursorPosition.y} visible={cursorVisible} />
    </div>
  );
}