type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, text, align = "left", as = "h2" }: SectionHeadingProps) {
  const Heading = as;

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      ) : null}
      <Heading className="font-serif text-4xl leading-tight text-forest md:text-5xl">{title}</Heading>
      {text ? <p className="mt-5 text-lg leading-8 text-muted">{text}</p> : null}
    </div>
  );
}
