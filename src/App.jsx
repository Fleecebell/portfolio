import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Awards from "./components/Awards";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// 全局鼠标跟随光晕（微弱、不拦截交互，覆盖全页）
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 240}px, ${e.clientY - 240}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="global-cursor-glow" aria-hidden="true" />;
}

export default function App() {
  // 手机版：页面加载后直接定位滚动到「自我介绍」（#intro），
  // 挂牌提示「点击挂牌以继续」引导用户回到顶部交互
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 641) return;
    const t = setTimeout(() => {
      const el = document.getElementById("intro");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900); // 等 hero 入场动画与挂牌 3D 初始化
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Awards />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <CursorGlow />
    </>
  );
}
