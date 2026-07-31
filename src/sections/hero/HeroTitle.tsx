interface HeroTitleProps {
  title: string;
}

export default function HeroTitle({ title }: HeroTitleProps) {
  return (
    <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
      {title}
    </h1>
  );
}
