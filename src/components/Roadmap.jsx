import Reveal from "./Reveal";
import data from "../data";

/**
 * Roadmap —— 学习路线（无独立导航项）
 */
export default function Roadmap() {
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">
                <span className="mono">*</span>
                Roadmap
              </span>
              <h2 className="section-title">成长路线</h2>
            </div>
            <p className="section-desc">Learning Roadmap</p>
          </header>
        </Reveal>

        <div className="roadmap-grid">
          {data.roadmap.map((phase, i) => (
            <Reveal
              className="roadmap-card"
              data-phase={`PHASE ${String(i + 1).padStart(2, "0")}`}
              delay={i * 90}
              key={phase.title}
            >
              <h4>{phase.title}</h4>
              <ul className="roadmap-items">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
