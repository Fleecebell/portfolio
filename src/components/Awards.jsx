import Section from "./Section";
import Timeline from "./Timeline";
import data from "../data";

export default function Awards() {
  return (
    <Section
      id="awards"
      index="01"
      eyebrow="Awards"
      title="竞赛与获奖"
      desc="Competition & Honors"
    >
      <Timeline items={data.awards} />
    </Section>
  );
}
