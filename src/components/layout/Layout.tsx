import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { BackToTop } from "./BackToTop";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to main content
      </a>
      
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
