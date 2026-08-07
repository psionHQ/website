import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="PSIONHQ home">
      <Image
        src="/logo-icon.png"
        alt=""
        width={28}
        height={28}
        className="rounded-md"
        aria-hidden="true"
      />
      <span className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
        PSIONHQ
      </span>
    </Link>
  );
}
