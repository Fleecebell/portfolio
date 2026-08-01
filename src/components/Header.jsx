import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { idx: "00", label: "自我介绍", href: "#intro" },
  { idx: "01", label: "竞赛与获奖", href: "#awards" },
  { idx: "02", label: "履历与实习", href: "#experience" },
  { idx: "03", label: "项目与能力", href: "#projects" },
  { idx: "04", label: "联系与资料", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  // 微信端显示「点击播放高清背景」独立按钮（仅微信 UA）
  const [hintOn, setHintOn] = useState(() =>
    typeof navigator !== "undefined" && /MicroMessenger/i.test(navigator.userAgent)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 滚动时高亮当前区块：取视口 45% 高度处的水平线，穿过哪个 section 就高亮哪个。
  // 相比 IntersectionObserver 窄观察带方案，中心线必然经过每个 section（含超长的 Projects），不会漏触发。
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) =>
      document.querySelector(n.href)
    ).filter(Boolean);
    if (!sections.length) return;

    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.45;
      let current = "";
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (probe >= top && probe < bottom) {
          current = `#${s.id}`;
          break;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="回到首页">
          <img
            className="brand-avatar"
            src="./assets/avatar.jpg"
            alt="头像"
          />
          <span className="brand-name">羊毛Fleece_</span>
        </a>

        <nav className={`main-nav ${open ? "open" : ""}`} aria-label="主导航">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.idx}
              href={item.href}
              className={active === item.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <span className="nav-idx">{item.idx}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {hintOn && (
          <button
            className="hero-video-hint"
            onClick={() => {
              setHintOn(false);
              document.querySelector(".hero-video")?.play().catch(() => {});
            }}
          >
            点击播放高清背景
          </button>
        )}

        <button
          className="nav-toggle"
          aria-label="切换菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
