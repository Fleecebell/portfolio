import Section from "./Section";
import Timeline from "./Timeline";
import data from "../data";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="履历与实习"
      desc="Education & Career"
      alt
    >
      <Timeline items={data.experience} />
    </Section>
  );
}
