import { Link } from "@tanstack/react-router";
import { Container, Hairline } from "@/components/ui/lux";
import { navItems } from "./Navbar";
import { studio } from "@/data/studio";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden pt-28 pb-12">
      <Container>
        <div className="display text-[clamp(3rem,12vw,10rem)] leading-none text-ivory/90">
          Bambral
        </div>
        <p className="label-tech mt-4">3D / CAD / Visualization</p>

        <Hairline className="mt-16" />

        <div className="grid gap-12 pt-10 md:grid-cols-4">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="label-tech">Navigate</span>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="w-fit text-sm text-muted-foreground transition-colors duration-500 hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="label-tech">Social</span>
            {studio.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-sm text-muted-foreground transition-colors duration-500 hover:text-ivory"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-tech">Legal</span>
            <span className="text-sm text-muted-foreground">Privacy</span>
            <span className="text-sm text-muted-foreground">Terms</span>
          </div>

          <div className="flex flex-col gap-3 md:text-right">
            <span className="label-tech md:self-end">Studio</span>
            <span className="text-sm text-muted-foreground">{studio.location}</span>
            <Link
              to="/configurator"
              className="w-fit text-sm text-champagne link-underline md:self-end"
            >
              Design a ring
            </Link>
          </div>
        </div>

        <Hairline className="mt-16" />
        <p className="label-tech pt-6">© {new Date().getFullYear()} Bambral 3D Studio</p>
      </Container>
    </footer>
  );
}
