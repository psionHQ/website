interface HeroSubtitleProps {
  subtitle: string;
}

export default function HeroSubtitle({ subtitle }: HeroSubtitleProps) {
  return (
    <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/60 sm:text-lg sm:leading-relaxed">
      {subtitle}
    </p>
  );
}
