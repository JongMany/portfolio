import { PropsWithChildren } from "react";

const Section = ({ children }: PropsWithChildren) => {
  return (
    <section
      className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center`}
    >
      {children}
    </section>
  );
};

export default function Interface() {
  return (
    <div className="flex flex-col items-center w-screen">
      <Section>
        <h1>About</h1>
      </Section>
      <Section>
        <h1>Skills</h1>
      </Section>
      <Section>
        <h1>Project</h1>
      </Section>
      <Section>
        <h1>Contact</h1>
      </Section>
    </div>
  );
}

const AboutSection = () => {
  <Section>
    <h1>About</h1>
  </Section>;
};
