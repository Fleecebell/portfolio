import { useState } from "react";
import Reveal from "./Reveal";

/**
 * Timeline —— 奖项 / 履历通用时间线
 * items: [{ time, title, text, expand }]，text 支持 \n 多行
 * expand 存在时显示可展开的倒三角，点击展开/收起子框。
 *
 * 高度策略：网格始终独立高度（align-items: start，见 CSS），
 * 每个条目按自身内容高度——展开/收起互不影响，无跳变。
 * 按钮绝对定位在条目底部（不占文档流高度），子框文档流向下扩展。
 */
export default function Timeline({ items }) {
  const [open, setOpen] = useState(null); // 当前展开的条目下标

  return (
    <div className="timeline">
      {items.map((item, i) => (
        <Reveal key={i} className="timeline-item" delay={i * 60}>
          <time className="timeline-time">{item.time}</time>
          <div className="timeline-body">
            <h3>{item.title}</h3>
            {item.text && (
              <ul className="timeline-list">
                {item.text
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
              </ul>
            )}
          </div>

          {item.expand && (
            <div className="timeline-expand">
              <button
                className={`tl-toggle ${open === i ? "is-open" : ""}`}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-label={item.title + " 展开详情"}
              >
                <span className="tl-caret" />
              </button>
              <div
                className={`tl-detail ${open === i ? "is-open" : ""}`}
                role="region"
              >
                <p>{item.expand}</p>
              </div>
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
