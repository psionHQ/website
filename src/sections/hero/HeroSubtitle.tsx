interface HeroSubtitleProps {
  subtitle: string;
  supporting?: string;
}

export default function HeroSubtitle({ subtitle, supporting }: HeroSubtitleProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="max-w-xl text-pretty text-xl font-medium leading-snug text-foreground/80 sm:text-2xl">
        {subtitle}
      </p>
      {supporting && (
        <p className="max-w-lg text-pretty text-base leading-relaxed text-foreground/50 sm:text-lg">
          {supporting}
        </p>
      )}
    </div>
  );
}
