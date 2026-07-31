interface HeroSubtitleProps {
  subtitle: string;
}

export default function HeroSubtitle({ subtitle }: HeroSubtitleProps) {
  return (
    <p className="max-w-2xl text-pretty text-base text-foreground/70 sm:text-lg">
      {subtitle}
    </p>
  );
}
