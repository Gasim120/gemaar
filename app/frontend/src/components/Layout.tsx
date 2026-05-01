import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Globe, Menu, X, User, LogOut, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language, t } from '@/lib/i18n';

/* ── Social SVG Icons ── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  user: any;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Layout({ children, lang, setLang, darkMode, setDarkMode, user, onLogin, onLogout }: LayoutProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const navLinks = [
    { path: '/', label: t(lang, 'home') },
    { path: '/dashboard', label: t(lang, 'dashboard') },
    { path: '/pricing', label: t(lang, 'pricing') },
    { path: '/testimonials', label: t(lang, 'testimonials') },
    { path: '/blog/', label: t(lang, 'blog') },
  ];

  const isActive = (path: string) => {
    if (path === '/blog/') return location.pathname.startsWith('/blog');
    return location.pathname === path;
  };

  return (
    <div dir={dir} className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0A0B14] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${darkMode ? 'bg-[#0A0B14]/80 border-[#C9A84C]/20' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#E8D48B] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0A0B14]" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
                G EMAAR AI
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C]'
                      : darkMode
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className={`rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Globe className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className={`rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <User className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onLogout}
                    className={`rounded-lg ${darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-white/10' : 'text-gray-600 hover:text-red-500'}`}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onLogin}
                  className="hidden md:flex bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-semibold hover:opacity-90 rounded-lg"
                >
                  {t(lang, 'login')}
                </Button>
              )}

              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'bg-[#141520] border-[#C9A84C]/10' : 'bg-white border-gray-200'}`}>
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C]'
                      : darkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="block w-full text-start px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10"
                >
                  {t(lang, 'logout')}
                </button>
              ) : (
                <button
                  onClick={() => { onLogin(); setMenuOpen(false); }}
                  className="block w-full text-start px-4 py-2.5 rounded-lg text-sm font-medium text-[#C9A84C]"
                >
                  {t(lang, 'login')}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 ${darkMode ? 'bg-[#0A0B14] border-[#C9A84C]/10' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand & Website */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#E8D48B] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#0A0B14]" />
                </div>
                <span className="font-bold bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
                  G EMAAR AI
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t(lang, 'footerDesc')}
              </p>
              <a
                href="https://www.gemaar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C] hover:text-[#E8D48B] transition-colors"
              >
                www.gemaar.com
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <nav className="flex flex-col gap-2.5 text-sm">
                <Link to="/" className={`${darkMode ? 'text-gray-400 hover:text-[#C9A84C]' : 'text-gray-600 hover:text-[#C9A84C]'} transition-colors`}>
                  {t(lang, 'home')}
                </Link>
                <Link to="/pricing" className={`${darkMode ? 'text-gray-400 hover:text-[#C9A84C]' : 'text-gray-600 hover:text-[#C9A84C]'} transition-colors`}>
                  {t(lang, 'pricing')}
                </Link>
                <Link to="/testimonials" className={`${darkMode ? 'text-gray-400 hover:text-[#C9A84C]' : 'text-gray-600 hover:text-[#C9A84C]'} transition-colors`}>
                  {t(lang, 'testimonials')}
                </Link>
                <Link to="/blog/" className={`${darkMode ? 'text-gray-400 hover:text-[#C9A84C]' : 'text-gray-600 hover:text-[#C9A84C]'} transition-colors`}>
                  {t(lang, 'blog')}
                </Link>
              </nav>
            </div>

            {/* Social Media */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'ar' ? 'تابعنا' : 'Follow Us'}
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com/gemaarai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    darkMode
                      ? 'bg-white/[0.06] text-gray-400 hover:bg-[#C9A84C]/20 hover:text-[#C9A84C]'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]'
                  }`}
                  aria-label="X (Twitter)"
                >
                  <XIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/gemaarai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    darkMode
                      ? 'bg-white/[0.06] text-gray-400 hover:bg-[#C9A84C]/20 hover:text-[#C9A84C]'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]'
                  }`}
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@gemaarai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    darkMode
                      ? 'bg-white/[0.06] text-gray-400 hover:bg-[#C9A84C]/20 hover:text-[#C9A84C]'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]'
                  }`}
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${darkMode ? 'border-[#C9A84C]/10' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2026 G EMAAR AI. {t(lang, 'rights')}
            </p>
            <a
              href="https://www.gemaar.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm ${darkMode ? 'text-gray-500 hover:text-[#C9A84C]' : 'text-gray-400 hover:text-[#C9A84C]'} transition-colors`}
            >
              www.gemaar.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}