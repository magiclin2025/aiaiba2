import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Bot, Box, Check, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Code2, Copy, CreditCard, Headphones, Info, Menu,
  MessageCircle, Moon, Orbit, ShieldCheck, Sparkles, Star, Sun, X, Zap,
} from "lucide-react";

const navItems = [
  { label: "首页", href: "#home" },
  { label: "ChatGPT", href: "#plans" },
  { label: "Gemini", href: "#plans" },
  { label: "Claude", href: "#plans" },
  { label: "Grok", href: "#plans" },
];

const checkoutUrl = "https://fe.dtyuedan.cn/shop/CZTTFS3B";

const plans = [
  { vendor: "OPENAI", name: "ChatGPT", variants: "Plus · 5× Pro · 20× Pro", price: "178", icon: Sparkles, accent: "#1769ff",
    features: ["GPT-5.6 Sol：Plus 支持 Medium / High", "Pro 另含 Extra High 与 Sol Pro", "GPT-5.5 Instant 默认 · Codex"] },
  { vendor: "GOOGLE", name: "Gemini", variants: "1 月 · 3 月 · 1 年", price: "188", icon: Star, accent: "#7c5cff", recommended: true,
    features: ["Gemini 3.1 Pro + 1M 上下文", "Nano Banana Pro 图像", "Gemini Notebook + 5TB"] },
  { vendor: "XAI", name: "Grok", variants: "月度 · 年度", price: "208", icon: Orbit, accent: "#17233e",
    features: ["Grok 4.5 + Search", "Imagine 图像与视频生成", "Voice 语音交互"] },
  { vendor: "ANTHROPIC", name: "Claude", variants: "Pro · Max 5× · Max 20×", price: "178", icon: Zap, accent: "#7658ff",
    features: ["Sonnet 5 + 更多可用模型", "Claude Code 编程助手", "Projects + Research"] },
];

const benefits = [
  { icon: ShieldCheck, label: "服务条件透明" },
  { icon: CreditCard, label: "卡密订单自动交付" },
  { icon: Headphones, label: "官网客服可核验" },
  { icon: BadgeCheck, label: "支付宝 / 微信" },
  { icon: Info, label: "售后规则清晰" },
];

const steps = [
  { number: "01", icon: CircleHelp, title: "选择适合的服务", text: "对比四大主流 AI 的套餐规格、账号要求和交付方式。" },
  { number: "02", icon: MessageCircle, title: "下单前确认条件", text: "不确定时先联系 Profriends，确认账号状态与售后边界。" },
  { number: "03", icon: Clock3, title: "完成订单与交付", text: "卡密订单自动交付，人工服务按照订单页面说明处理。" },
];

const faqs = [
  { q: "如何选择适合我的 AI 服务？", a: "ChatGPT 适合综合使用与编程，Claude 擅长长文本和代码，Gemini 适合 Google 生态，Grok 强调实时信息与多媒体。下单前也可以联系 Profriends 协助确认。" },
  { q: "卡密和人工服务有什么区别？", a: "卡密商品通常由系统自动发送激活信息；人工服务需要按照商品页要求提交必要资料，交付时间以订单状态为准。" },
  { q: "支持哪些支付方式？", a: "第三方收银台支持支付宝和微信支付，具体可用方式以结算页面实时展示为准。" },
];

function BrandMark({ size = 34 }: { size?: number }) {
  return <span className="brand-mark" style={{ width: size, height: size }} aria-hidden="true"><Sparkles size={size * .72} strokeWidth={1.8} /></span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText("Profriends");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="AIAIBA 首页"><BrandMark /><strong>AIAIBA</strong></a>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="theme-button" type="button" aria-label={dark ? "切换浅色模式" : "切换深色模式"} onClick={() => setDark(v => !v)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="experience-button" href={checkoutUrl} target="_blank" rel="noopener noreferrer">立即体验<span><ArrowRight size={17} /></span></a>
          <button className="menu-button" type="button" aria-label="打开菜单" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={23} /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside className="mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 30 }}>
              <div className="mobile-menu-head">
                <a className="brand" href="#home"><BrandMark size={30} /><strong>AIAIBA</strong></a>
                <button aria-label="关闭菜单" onClick={() => setMenuOpen(false)}><X size={22} /></button>
              </div>
              <nav>{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ChevronRight size={18} /></a>)}</nav>
              <a className="experience-button mobile-experience" href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>立即体验 <ArrowRight size={17} /></a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero section-orbits" id="home">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" />
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [.22, 1, .36, 1] }}>
            <div className="eyebrow">AIAIBA.org · 独立第三方 AI 会员服务</div>
            <h1>全球顶级 <em>AI 服务</em><span>一站式轻松开通</span></h1>
            <h2>ChatGPT · Claude · Gemini · Grok 会员开通</h2>
            <p>卡密自助与人工服务清晰区分 · 支持支付宝 / 微信 · 下单前展示账号要求</p>
          </motion.div>
          <motion.div className="ai-core-wrap" initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18, duration: .8 }} aria-hidden="true">
            <div className="core-glow" /><div className="core-orbit"><span className="orbit-ball" /></div>
            <motion.div className="ai-core" animate={{ y: [0, -8, 0], rotate: [-7, -4, -7] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><BrandMark size={82} /></motion.div>
            <Zap className="core-zap" size={30} fill="currentColor" />
          </motion.div>
          <div className="hero-actions">
            <a className="action-card" href={checkoutUrl} target="_blank" rel="noopener noreferrer"><span className="action-icon"><Box size={24} /></span><span><strong>立即购买</strong><small>进入第三方收银台完成订单</small></span><ChevronRight size={22} /></a>
            <a className="action-card" href={checkoutUrl} target="_blank" rel="noopener noreferrer"><span className="action-icon"><Info size={24} /></span><span><strong>了解服务</strong><small>查看开通流程与服务条件</small></span><ChevronRight size={22} /></a>
          </div>
          <div className="benefit-strip">{benefits.map(({ icon: Icon, label }) => <div key={label}><Icon size={21} /><span>{label}</span></div>)}</div>
          <div className="hero-note">
            <p>购买将跳转至第三方收银台；请以具体商品页的价格、账号要求和售后条件为准。</p>
            <p>下单前需要确认？官网客服微信 <button type="button" onClick={copyWechat} aria-label="复制客服微信 Profriends">Profriends <Copy size={14} /> {copied && <span className="copied">已复制</span>}</button></p>
          </div>
        </section>

        <section className="plans section-orbits" id="plans">
          <div className="orbit plans-orbit" />
          <div className="section-heading"><span>会员方案</span><h2>选择适合你的 AI</h2><p>4 大主流 AI 服务，每个类目提供多种规格方案。点击查看详情与全部价格。</p></div>
          <div className="plan-grid">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.article className={`plan-card ${plan.recommended ? "recommended" : ""}`} key={plan.name}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}
                  transition={{ delay: index * .08, duration: .55 }} style={{ "--plan-accent": plan.accent } as React.CSSProperties}>
                  {plan.recommended && <span className="recommended-badge">推荐</span>}
                  <div className="plan-icon"><Icon size={26} /></div><span className="plan-vendor">{plan.vendor}</span><h3>{plan.name}</h3>
                  <p className="plan-variants">{plan.variants}</p><div className="plan-price"><sup>¥</sup><strong>{plan.price}</strong><span>起</span></div>
                  <ul>{plan.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">查看 {plan.name} 套餐 <ArrowRight size={16} /></a>
                </motion.article>
              );
            })}
          </div>
          <div className="plan-help">
            <span className="help-icon"><Headphones size={23} /></span><div><strong>不确定选哪个方案？</strong><p>下单前可联系官网客服确认账号要求与交付方式</p></div>
            <div className="plan-help-actions"><button type="button" onClick={copyWechat}>联系 Profriends</button><a href={checkoutUrl} target="_blank" rel="noopener noreferrer">立即体验</a></div>
          </div>
        </section>

        <section className="how-section" id="how">
          <div className="section-heading"><span>使用流程</span><h2>简单三步，放心开通</h2><p>规则先说明，条件先确认，整个过程清晰可追踪。</p></div>
          <div className="step-grid">{steps.map(({ number, icon: Icon, title, text }) => <article key={number}><div className="step-top"><span>{number}</span><Icon size={27} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="service-section">
          <div className="service-visual section-orbits">
            <div className="service-core"><Bot size={52} /></div>
            <div className="service-chip chip-one"><Code2 size={18} /> 编程助手</div><div className="service-chip chip-two"><Sparkles size={18} /> 图像生成</div><div className="service-chip chip-three"><MessageCircle size={18} /> 实时问答</div>
          </div>
          <div className="service-copy">
            <span className="section-label">服务说明</span><h2>从产品详情开始，而不是盲目下单</h2>
            <p>不同 AI 产品对支付地区、账号状态和订阅方式的要求并不相同。我们将当前价格、交付方式、所需信息与售后限制清晰列出。</p>
            <ul><li><Check size={18} />卡密商品与人工服务明确区分</li><li><Check size={18} />下单前展示账号及密码要求</li><li><Check size={18} />不确定时可先联系 Profriends 核验</li></ul>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">查看会员方案 <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-intro"><span className="section-label">常见问题</span><h2>下单之前，先把问题说清楚</h2><p>如果这里没有你需要的答案，可直接联系 Profriends。</p></div>
          <div className="faq-list">{faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return <article key={item.q} className={isOpen ? "open" : ""}>
              <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span>{item.q}</span><ChevronDown size={21} /></button>
              <AnimatePresence initial={false}>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="faq-answer"><p>{item.a}</p></motion.div>}</AnimatePresence>
            </article>;
          })}</div>
        </section>

        <section className="contact-banner section-orbits" id="contact">
          <div className="contact-orbit" /><BrandMark size={54} /><span>准备好了吗？</span><h2>选择你的 AI，开始高效创作</h2>
          <p>下单前如需确认账号要求与交付方式，请联系官网客服 Profriends。</p>
          <div><a href="#plans">选择方案 <ArrowRight size={17} /></a><button type="button" onClick={copyWechat}>复制 Profriends <Copy size={16} /></button></div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><a className="brand" href="#home"><BrandMark size={30} /><strong>AIAIBA</strong></a><p>让顶级 AI 服务触手可及。</p></div>
        <div className="footer-links"><a href="#home">首页</a><a href="#plans">会员方案</a><a href="#how">使用流程</a><a href="#contact">联系客服</a></div>
        <p className="copyright">© 2026 AIAIBA.org · 独立第三方服务，与相关 AI 厂商无授权或关联关系。</p>
      </footer>
      <button className="floating-chat" type="button" onClick={copyWechat} aria-label="联系 Profriends"><MessageCircle size={24} /><span>{copied ? "已复制" : "Profriends"}</span></button>
    </div>
  );
}

export default App;
