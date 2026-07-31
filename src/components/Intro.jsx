import Reveal from "./Reveal";
import data from "../data";

/**
 * Intro —— 作品集定位（4 个设计原则卡片，位于 Hero 之下）
 */
export default function Intro() {
  return (
    <section id="intro" className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="intro-grid">
          {data.intro.map((item, i) => (
            <Reveal className="intro-card" delay={i * 80} key={item.title}>
              <span className="intro-idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
