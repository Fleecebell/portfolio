import Reveal from "./Reveal";
import Section from "./Section";
import data from "../data";

const STATUS_ORDER = ["已具备", "补强中", "目标"];

export default function Skills() {
  const counts = {};
  data.skills.forEach((s) => {
    counts[s.status] = (counts[s.status] || 0) + 1;
  });

  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Skills"
      title="技能矩阵"
      desc="Skill Matrix"
    >
      <Reveal className="skill-summary">
        {STATUS_ORDER.map((status) => (
          <span className="s-item" data-status={status} key={status}>
            {status} · {counts[status] || 0} 组
          </span>
        ))}
        <span
          className="s-item"
          style={{ color: "var(--text-3)", marginLeft: "auto" }}
        >
          TOTAL · {data.skills.length} GROUPS
        </span>
      </Reveal>

      <div className="skill-grid">
        {data.skills.map((skill, i) => (
          <Reveal className="skill-card" delay={(i % 4) * 60} key={skill.group}>
            <div className="skill-card-head">
              <h4>{skill.group}</h4>
              <span
                className="skill-dot"
                data-status={skill.status}
                title={skill.status}
              />
            </div>
            <ul className="skill-items">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
