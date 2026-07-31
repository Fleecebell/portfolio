import Reveal from "./Reveal";
import Section from "./Section";
import data from "../data";

export default function AiWorkflow() {
  return (
    <Section
      id="workflow"
      index="05"
      eyebrow="AI Workflow"
      title="AI 辅助开发工作流"
      desc="AI-Assisted Development"
      alt
    >
      <div className="workflow-grid">
        {data.aiWorkflow.map((step, i) => (
          <Reveal className="workflow-card" delay={(i % 3) * 80} key={step.title}>
            <div className="workflow-num">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
