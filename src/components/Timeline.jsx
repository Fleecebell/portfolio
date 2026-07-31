import Reveal from "./Reveal";

/**
 * Timeline —— 奖项 / 履历通用时间线
 * items: [{ time, title, text }]，text 支持 \n 多行
 */
export default function Timeline({ items }) {
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
        </Reveal>
      ))}
    </div>
  );
}
