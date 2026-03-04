/**
 * Layout Component — Geometric Precision Design
 * - Top navigation with asymmetric logo placement
 * - Sticky header with backdrop blur + scroll-aware background
 * - Full-screen mobile menu overlay
 * - Footer with geometric divider
 */
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/members", label: "Members" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <div className="w-10 h-10 bg-navy flex items-center justify-center relative overflow-hidden group-hover:bg-navy/90 transition-colors">
            <span className="font-heading font-bold text-white text-sm tracking-wider">SS</span>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-signal-red" />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold text-lg leading-tight tracking-tight transition-colors ${
              scrolled || mobileOpen ? "text-navy" : "text-white"
            }`}>SSLAB</span>
            <span className={`text-[10px] tracking-[0.15em] uppercase transition-colors ${
              scrolled || mobileOpen ? "text-muted-foreground" : "text-white/50"
            }`}>System Software Lab</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 font-heading text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-signal-red"
                    : scrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-signal-red"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 relative z-50 transition-colors ${
            mobileOpen ? "text-navy" : scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav — Full Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-white z-40"
          >
            <nav className="flex flex-col items-start justify-center h-full px-8 gap-2">
              {navLinks.map((link, i) => {
                const isActive = location === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 font-heading text-3xl font-bold tracking-tight transition-colors ${
                        isActive
                          ? "text-signal-red"
                          : "text-navy hover:text-signal-red"
                      }`}
                    >
                      <span className="font-mono text-xs text-muted-foreground mr-3 align-middle">
                        0{i + 1}
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-border w-full"
              >
                <p className="text-muted-foreground text-xs font-mono tracking-wide">
                  한남대학교 컴퓨터공학과
                </p>
                <p className="text-muted-foreground text-xs font-mono mt-1">
                  sslab@hnu.kr
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      {/* Geometric divider */}
      <div className="w-full h-1 flex">
        <div className="flex-1 bg-signal-red" />
        <div className="flex-1 bg-steel-blue" />
        <div className="flex-1 bg-signal-red/50" />
        <div className="flex-[2] bg-steel-blue/50" />
      </div>

      <div className="container py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Lab Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center relative">
                <span className="font-heading font-bold text-white text-sm">SS</span>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-signal-red" />
              </div>
              <div>
                <span className="font-heading font-bold text-white text-lg">SSLAB</span>
                <span className="block text-[10px] text-white/40 tracking-[0.15em] uppercase">System Software Lab</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              한남대학교 컴퓨터공학과 시스템 소프트웨어 연구실은 운영체제, 컴파일러, 시스템 보안 등
              핵심 시스템 소프트웨어 분야의 연구를 수행하고 있습니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 text-sm hover:text-signal-red transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-white/40 text-sm">
              <li>한남대학교 컴퓨터공학과</li>
              <li>대전광역시 대덕구 한남로 70</li>
              <li>
                <a href="mailto:sslab@hnu.kr" className="text-white/60 hover:text-signal-red transition-colors">
                  sslab@hnu.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} SSLAB, Hannam University. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs font-mono tracking-wide">Department of Computer Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
