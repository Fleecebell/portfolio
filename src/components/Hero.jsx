import { useEffect, useRef } from "react";
import data from "../data";

export default function Hero() {
  const glowRef = useRef(null);
  const videoRef = useRef(null);
  const posterRef = useRef(null);

  // 鼠标跟随光晕
  const onMove = (e) => {
    const node = glowRef.current;
    if (!node) return;
    const rect = node.parentElement.getBoundingClientRect();
    node.style.left = `${e.clientX - rect.left}px`;
    node.style.top = `${e.clientY - rect.top}px`;
  };

  // 移动端兜底：自动播放被拦截时，显示视频首帧静态图
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const showPoster = () => {
      if (posterRef.current) posterRef.current.style.opacity = "1";
    };
    const hidePoster = () => {
      if (posterRef.current) posterRef.current.style.opacity = "0";
    };

    let played = false;
    const tryPlay = () => {
      if (played || !v.paused) {
        if (!v.paused) played = true;
        return;
      }
      v.play()
        .then(() => {
          played = true;
        })
        .catch(() => {
          // 自动播放被拦截（华为/微信/低电量/数据节约等）→ 等待用户交互重试
        });
    };

    // 页面加载后多次自动重试（最长 8 秒），覆盖浏览器异步解锁自动播放的场景
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    const retry = setInterval(tryPlay, 1500);
    setTimeout(() => clearInterval(retry), 8000);

    // 用户交互立即重试播放
    // 微信等内置浏览器要求 play() 必须在用户手势（非 passive 的 touch/click）内调用
    const onInteract = () => tryPlay();
    ["touchstart", "click"].forEach((ev) =>
      window.addEventListener(ev, onInteract, { capture: true, passive: false })
    );
    ["scroll", "keydown"].forEach((ev) =>
      window.addEventListener(ev, onInteract, { passive: true })
    );

    // 3 秒内未能开始播放（或无法解码）则显示静态首帧兜底
    const t = setTimeout(() => {
      if (v.paused || v.videoWidth === 0) showPoster();
    }, 3000);
    v.addEventListener(
      "playing",
      () => {
        played = true;
        clearTimeout(t);
        hidePoster();
      },
      { once: true }
    );
    return () => {
      clearTimeout(t);
      clearInterval(retry);
      ["touchstart", "click"].forEach((ev) =>
        window.removeEventListener(ev, onInteract, { capture: true })
      );
      ["scroll", "keydown"].forEach((ev) =>
        window.removeEventListener(ev, onInteract)
      );
    };
  }, []);

  return (
    <section className="hero" id="top" onMouseMove={onMove}>
      <div className="hero-bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="./assets/hero-bg-poster.jpg"
        >
          <source src="./assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <img
          ref={posterRef}
          className="hero-video-poster"
          src="./assets/hero-bg-poster.jpg"
          alt=""
        />
        <div className="hero-video-overlay" />
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
