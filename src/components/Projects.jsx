import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
        gallery: c.gallery || [],
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
        gallery: c.gallery || [],
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
  const [zoomImg, setZoomImg] = useState(null); // 点击放大的图片
  const items = buildItems();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (zoomImg) setZoomImg(null);
        else setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomImg, selected]);

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
              }}
              onMouseLeave={() => {
                setHovered(-1);
              }}
              onTouchStart={() => {
                setHovered(i);
              }}
              onTouchEnd={() => {
                setHovered(-1);
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
          <div className="pm-rows">
            <div className="pm-row">
              {renderRow(h1, setH1, 0)}
            </div>
            <div className="pm-row">
              {renderRow(h2, setH2, Math.floor(items.length / 2))}
            </div>
          </div>
        )}

        {/* 详情子面板：用 portal 渲染到 body 级，脱离 projects section 的 z1 上下文，
            保证遮罩（z200）与关闭按钮（z210）在导航栏（z100）之上 */}
        {selected &&
          createPortal(
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
                onClick={(e) => {
                  // 点击面板内容区退出详情；链接/按钮/媒体（视频/照片）不退出
                  if (e.target.closest("a, button, .detail-media")) return;
                  closeDetail();
                }}
              >
                {selected.type && (
                  <span className="detail-type mono">{selected.type}</span>
                )}
                <h3 className="detail-name">{selected.name}</h3>

                {selected.data ? (
                  <>
                    {/* 游戏内容 */}
                    {selected.data.summary && (
                      <section className="detail-block">
                        <span className="dp-label mono">游戏内容</span>
                        <p className="detail-summary">{selected.data.summary}</p>
                      </section>
                    )}

                    {/* 工作内容：纯段落显示（与游戏内容一致，无卡片框） */}
                    {selected.data.points?.length > 0 && (
                      <section className="detail-block">
                        <span className="dp-label mono">工作内容</span>
                        {selected.data.points.map((pt, i) => (
                          <p className="detail-summary" key={i}>
                            {pt.text}
                          </p>
                        ))}
                      </section>
                    )}

                    {/* 游戏图片：位于工作内容与 jam站点 之间，project-N 文件夹内
                        除 cover.* 外的所有 png/jpg，按文件名排序，两列展示 */}
                    {selected.gallery?.length > 0 && (
                      <section className="detail-block">
                        <span className="dp-label mono">游戏图片</span>
                        <div className="detail-media">
                          {selected.gallery.map((src) => (
                            <img
                              key={src}
                              src={src}
                              alt={`${selected.name} 截图`}
                              loading="lazy"
                              draggable="false"
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止冒泡到详情面板
                                setZoomImg(src);
                              }}
                            />
                          ))}
                        </div>
                      </section>
                    )}

                    {/* jam站点/获奖 — 暂时隐藏 */}
                    {/* {selected.data.links?.length > 0 && (
                      <section className="detail-block">
                        <span className="dp-label mono">jam站点/获奖</span>
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
                      </section>
                    )} */}
                  </>
                ) : (
                  <p className="detail-summary">
                    项目详情待补充，可在 src/data.js 中添加该项目。
                  </p>
                )}
              </div>
            </div>,
            document.body
          )}

        {/* 图片放大查看：全屏遮罩 + 居中大图，点击遮罩或图片关闭 */}
        {zoomImg &&
          createPortal(
            <div
              className="detail-zoom"
              onClick={() => setZoomImg(null)}
            >
              <img src={zoomImg} alt="放大查看" draggable="false" />
            </div>,
            document.body
          )}
      </div>
    </section>
  );
}
