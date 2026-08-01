import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import data from "../data";
import covers from "virtual:project-covers";

// 类型缩写：只保留 " / " 前的类型名（去掉 "GMTK GameJam 2025" 等比赛信息）
const shortType = (t) => (t ? String(t).split(" / ")[0].trim() : "");

// 轮播数据 = 扫描到的 project-N 封面（自动）+ data.js 中的完整项目信息
function buildItems() {
  const byNum = new Map(covers.map((c) => [c.num, c]));
  const items = [];
  const used = new Set();

  data.projects.forEach((p, i) => {
    const num = i + 1;
    const c = byNum.get(num);
    if (c && c.cover) {
      items.push({
        cover: c.cover,
        name: p.name,
        type: shortType(p.type),
        num,
        data: p,
      });
      used.add(num);
    }
  });

  covers.forEach((c) => {
    if (!used.has(c.num) && c.cover) {
      items.push({
        cover: c.cover,
        name: c.info?.name || `项目 ${c.num}`,
        type: shortType(c.info?.type),
        num: c.num,
        data: null,
      });
    }
  });

  return items;
}

export default function Projects() {
  const [h1, setH1] = useState(-1); // 第一排悬停
  const [h2, setH2] = useState(-1); // 第二排悬停
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false); // 鼠标悬停封面时两排统一暂停（保证交错恒定），离开封面恢复滚动
  const items = buildItems();

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const closeDetail = () => setSelected(null);

  // 一排轮播；offset 为内容起点偏移（第二排错开半周期，保证上下同作品距离最远）
  const renderRow = (hovered, setHovered, offset) => {
    const loop = [
      ...items.slice(offset),
      ...items,
      ...items.slice(0, offset),
    ];
    return (
      <div className="project-marquee">
        <div className="project-marquee-track">
          {loop.map((item, i) => (
            <div
              className={`project-marquee-card ${
                hovered === i ? "hovered" : ""
              }`}
              key={`${offset}-${item.num}-${i}`}
              onMouseEnter={() => {
                setHovered(i);
                setPaused(true);
              }}
              onMouseLeave={() => {
                setHovered(-1);
                setPaused(false);
              }}
              onTouchStart={() => {
                setHovered(i);
                setPaused(true);
              }}
              onTouchEnd={() => {
                setHovered(-1);
                setPaused(false);
              }}
              onClick={() => setSelected(item)}
            >
              <img
                src={item.cover}
                alt={`${item.name} 封面`}
                loading="lazy"
                draggable="false"
              />
              {hovered === i && (
                <div className="project-marquee-info">
                  {item.type && <span className="pm-type">{item.type}</span>}
                  <span className="pm-name">{item.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">
                <span className="mono">03</span>
                Projects
              </span>
              <h2 className="section-title">项目与能力</h2>
              <p className="section-count">
                此处收录 {items.length} 个作品
              </p>
            </div>
            <p className="section-desc">Selected Works · 点击封面查看详情</p>
          </header>
        </Reveal>

        {items.length === 0 ? (
          <Reveal>
            <div className="marquee-empty">
              <p>
                将封面图命名为 <code>cover.jpg</code>（或 png/webp）放入{" "}
                <code>public/assets/projects/project-N/</code>，轮播会自动显示
              </p>
            </div>
          </Reveal>
        ) : (
          <div className={`pm-rows ${paused ? "paused" : ""}`}>
            <div className="pm-row">
              {renderRow(h1, setH1, 0)}
            </div>
            <div className="pm-row">
              {renderRow(h2, setH2, Math.floor(items.length / 2))}
            </div>
          </div>
        )}

        {/* 详情子面板 */}
        {selected && (
          <div className="project-detail-mask" onClick={closeDetail}>
            {/* 关闭按钮挂在遮罩层（无 transform 动画），fixed 始终相对视口，
                不会因面板动画而瞬移 */}
            <button
              className="detail-close"
              aria-label="关闭"
              onClick={closeDetail}
            >
              ✕
            </button>
            <div
              className="project-detail-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.type && (
                <span className="detail-type mono">{selected.type}</span>
              )}
              <h3 className="detail-name">{selected.name}</h3>

              {selected.data ? (
                <>
                  {selected.data.summary && (
                    <p className="detail-summary">{selected.data.summary}</p>
                  )}
                  {selected.data.points?.length > 0 && (
                    <div className="detail-points">
                      {selected.data.points.map((pt, i) => (
                        <div className="detail-point" key={i}>
                          <span className="dp-label mono">{pt.label}</span>
                          <p className="dp-text">{pt.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {selected.data.tags?.length > 0 && (
                    <div className="detail-tags">
                      {selected.data.tags.map((t, i) => (
                        <span className="tag" key={i}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {selected.data.links?.length > 0 && (
                    <div className="detail-links">
                      {selected.data.links.map((l, i) => (
                        <a
                          className="btn"
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={i}
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="detail-summary">项目详情待补充，可在 src/data.js 中添加该项目。</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
