import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { CallbackDialog } from "./components/CallbackDialog";
import logoImg from "../imports/457707992_818491956766520_8181886743211688740_n.jpg";

export default function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Про школу", id: "about" },
    { label: "Ціни", id: "pricing" },
    { label: "Відгуки", id: "reviews" },
    { label: "Локація", id: "location" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-xl shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              <img
                src={logoImg}
                alt="Rhino Billiard School Logo"
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                  {label}
                </button>
              ))}
              <Link to="/blogs" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">
                Блог
              </Link>
              <Button
                onClick={() => setIsCallbackOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
              >
                <Phone className="w-4 h-4" />
                Записатися
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Меню"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ───────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950 flex flex-col transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Spacer for nav height */}
        <div className="h-20 flex-shrink-0" />
        <div className="flex flex-col justify-center flex-1 px-8 pb-16 gap-2">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-left text-3xl font-semibold text-gray-300 hover:text-emerald-400 transition-colors py-3 border-b border-zinc-800/50"
            >
              {label}
            </button>
          ))}
          <Link
            to="/blogs"
            onClick={() => setIsMenuOpen(false)}
            className="text-left text-3xl font-semibold text-gray-300 hover:text-emerald-400 transition-colors py-3 border-b border-zinc-800/50"
          >
            Блог
          </Link>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              onClick={() => { setIsCallbackOpen(true); setIsMenuOpen(false); }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-7 text-lg shadow-lg shadow-emerald-900/40"
            >
              <Phone className="w-5 h-5" />
              Записатися на заняття
            </Button>
            <a href="tel:+380634349623" className="w-full">
              <Button variant="outline" className="w-full py-7 text-lg">
                +38 063 434 96 23
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Outlet />

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <img
                src={logoImg}
                alt="Rhino Billiard School Logo"
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Професійне навчання гри в більярд у серці Києва
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-5 text-white">Навігація</h3>
              <div className="space-y-3 text-gray-400 text-sm">
                {navLinks.map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <Link to="/blogs" className="block hover:text-emerald-400 transition-colors">Блог</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-5 text-white">Контакти</h3>
              <div className="space-y-3 text-gray-400 text-sm">
                <a href="tel:+380634349623" className="block hover:text-emerald-400 transition-colors">
                  +38 063 434 96 23
                </a>
                <p className="leading-relaxed">
                  Юр'ївська, 29, Київ, 02000<br />
                  Xpark, Парк Дружби Народів
                </p>
                <p>Пн–Нд: 10:00–22:00</p>
                <a
                  href="https://www.instagram.com/billiard_rhino_school/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-emerald-400 transition-colors"
                >
                  Instagram @billiard_rhino_school
                </a>
                <a
                  href="https://maps.app.goo.gl/xBvPu7u91r6JtG3dA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-emerald-400 transition-colors"
                >
                  Відкрити на Google Maps
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center text-gray-600 text-sm">
            © 2026 Rhino Billiard School. Всі права захищені.
          </div>
        </div>
      </footer>

      <CallbackDialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen} />

      {/* ── Floating contact buttons ─────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://t.me/+380634349623"
          target="_blank"
          rel="noopener noreferrer"
          title="Написати в Telegram"
          className="w-14 h-14 bg-[#229ED9] hover:bg-[#1a8bbf] rounded-full flex items-center justify-center shadow-xl shadow-black/40 transition-all hover:scale-110 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
        <a
          href="tel:+380634349623"
          title="Зателефонувати"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/50 transition-all hover:scale-110 active:scale-95"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </div>
    </div>
  );
}
