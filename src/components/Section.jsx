import Reveal from "./Reveal";

/**
 * Section —— 通用区块容器
 * index: 两位 mono 编号（如 "01"）
 * eyebrow: 英文小节名
 * title: 中文标题
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  desc,
  alt = false,
  children,
}) {
  return (
    <section id={id} className={`section ${alt ? "section-alt" : ""}`}>
      <div className="container">
        <Reveal>
          <header className="section-head">
            <div>
              <span className="eyebrow">
                <span className="mono">{index}</span>
                {eyebrow}
              </span>
              <h2 className="section-title">{title}</h2>
            </div>
            {desc && <p className="section-desc">{desc}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
