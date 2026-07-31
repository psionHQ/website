import Navbar from "@/components/navbar/Navbar";
import Container from "./Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Navbar />
      </Container>
    </header>
  );
}
