import Link from "next/link";
import { Logo } from "../logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Your partner for modern web solutions.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:items-end">
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <a
              href="mailto:sinaidigitalweb@gmail.com"
              className="hover:text-foreground"
            >
              sinaidigitalweb@gmail.com
            </a>
            <a
              href="https://wa.me/201096123416"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              WhatsApp: +201096123416
            </a>
          </div>
          <p>Designed by: محمد جمعة</p>
        </div>
      </div>
    </footer>
  );
}
