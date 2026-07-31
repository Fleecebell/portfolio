import { useRef } from "react";
import data from "../data";

export default function Hero() {
  const glowRef = useRef(null);

  // 鼠标跟随光晕
  const onMove = (e) => {
    const node = glowRef.current;
    if (!node) return;
    const rect = node.parentElement.getBoundingClientRect();
    node.style.left = `${e.clientX - rect.left}px`;
    node.style.top = `${e.clientY - rect.top}px`;
  };

  return (
    <section className="hero" id="top" onMouseMove={onMove}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-cursor-glow" ref={glowRef} />
      </div>

      <div className="container hero-inner">
        <div className="hero-main">
          <h1 className="hero-title">
            {data.profile.name}
            <span className="cursor" aria-hidden="true" />
          </h1>

          <div className="hero-tagline">
            <span className="mono" style={{ color: "var(--accent)" }}>
              Unity 客户端开发 · Unity Client Developer
            </span>
          </div>

          <p className="hero-summary">{data.profile.summary}</p>

          <div className="hero-actions">
            <a className="btn" href="#awards">
              竞赛与获奖
            </a>
            <a className="btn" href="#experience">
              履历与实习
            </a>
            <a className="btn" href="#projects">
              项目与能力
            </a>
            <a className="btn" href="#contact">
              联系与资料
            </a>
          </div>
        </div>

        <aside className="hero-card">
          <div className="hero-card-head">
            <img
              className="hero-card-avatar"
              src="./assets/avatar.jpg"
              alt="头像"
            />
            <div>
              <p className="hero-card-name">{data.profile.name}</p>
              <p className="hero-card-role">// Unity 客户端开发</p>
            </div>
          </div>

          <div className="hero-card-rows">
            <div className="hero-card-row">
              <span className="k mono">学校</span>
              <span className="v">{data.profile.school}</span>
            </div>
            <div className="hero-card-row">
              <span className="k mono">专业</span>
              <span className="v">{data.profile.major}</span>
            </div>
            <div className="hero-card-row">
              <span className="k mono">毕业</span>
              <span className="v">{data.profile.graduation}</span>
            </div>
            <div className="hero-card-row">
              <span className="k mono">方向</span>
              <span className="v">{data.profile.direction}</span>
            </div>
          </div>

          <span className="hero-card-online">STATUS · ACTIVE</span>
        </aside>
      </div>
    </section>
  );
}
