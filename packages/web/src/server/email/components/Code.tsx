import { Section, type SectionProps } from "@react-email/components";

type Props = SectionProps & {
  code: number;
};

const Code = ({ code, ...props }: Props) => (
  <Section
    className={`bg-slate-100 p-4 rounded text-2xl text-center font-bold text-primary-main`}
    {...props}
  >
    {code}
  </Section>
);

export default Code;
