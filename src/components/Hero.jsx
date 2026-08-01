import { useEffect, useRef } from "react";
import Lanyard from "./Lanyard/Lanyard";
import data from "../data";

export default function Hero() {
  const videoRef = useRef(null);
  const posterRef = useRef(null);

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

    // 兜底切换时机：微信必然拦截自动播放 → 100ms 内直接切动画 WebP；
    // 其他浏览器给视频 800ms 播放机会再兜底
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    const fallbackDelay = isWeChat ? 100 : 800;
    const t = setTimeout(() => {
      if (v.paused || v.videoWidth === 0) showPoster();
    }, fallbackDelay);
    v.addEventListener(
      "playing",
      () => {
        played = true;
        clearTimeout(t);
        hidePoster();
        // 视频开始播放后，隐藏导航栏上的微信提示按钮
        document.querySelector(".hero-video-hint")?.remove();
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
    <section className="hero" id="top">
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
        <picture ref={posterRef} className="hero-video-poster">
          {/* 动画 WebP 兜底：微信/被拦截时背景依然在动；老浏览器回退静态首帧 */}
          <source srcSet="./assets/hero-bg.webp" type="image/webp" />
          <img src="./assets/hero-bg-poster.jpg" alt="" />
        </picture>
        <div className="hero-video-overlay" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
      </div>

      <div className="container hero-inner">
        {/* 挂牌（左列/上方）：在自我介绍之前 */}
        <aside className="hero-lanyard">
          <Lanyard gravity={[0, -40, 0]} />
        </aside>

        {/* 自我介绍（右列/下方），锚点 #intro 定位到标题 */}
        <div className="hero-main" id="intro">
          <h1 className="hero-title">
            {data.profile.name}
            <span className="cursor" aria-hidden="true" />
          </h1>

          <div className="hero-tagline">
            <span className="mono" style={{ color: "var(--accent)" }}>
              Unity 客户端开发
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
      </div>
    </section>
  );
}
