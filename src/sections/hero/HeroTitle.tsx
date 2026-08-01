interface HeroTitleProps {
  title: string;
}

export default function HeroTitle({ title }: HeroTitleProps) {
  return (
    <h1 className="mx-auto max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
      {title}
    </h1>
  );
}
