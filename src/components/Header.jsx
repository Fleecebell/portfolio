import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { idx: "00", label: "自我介绍", href: "#top" },
  { idx: "01", label: "竞赛与获奖", href: "#awards" },
  { idx: "02", label: "履历与实习", href: "#experience" },
  { idx: "03", label: "项目与能力", href: "#projects" },
  { idx: "04", label: "联系与资料", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 滚动时高亮当前区块
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) =>
      document.querySelector(n.href)
    ).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
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
