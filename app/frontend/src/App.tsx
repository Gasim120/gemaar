import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Admin from './pages/Admin';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';
import Testimonials from './pages/Testimonials';
import BlogRoutes from './blog-routes';
import { type Language } from '@/lib/i18n';
import client from '@/lib/api';

const queryClient = new QueryClient();

function AppContent() {
  const [lang, setLang] = React.useState<Language>(() => {
    return (localStorage.getItem('emaar-lang') as Language) || 'ar';
  });
  const [darkMode, setDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('emaar-dark');
    return saved !== null ? saved === 'true' : true;
  });
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    localStorage.setItem('emaar-lang', lang);
  }, [lang]);

  React.useEffect(() => {
    localStorage.setItem('emaar-dark', String(darkMode));
  }, [darkMode]);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await client.auth.me();
        if (res?.data) setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    client.auth.toLogin();
  };

  const handleLogout = async () => {
    await client.auth.logout();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Layout
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<Index lang={lang} darkMode={darkMode} user={user} onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard lang={lang} darkMode={darkMode} user={user} onLogin={handleLogin} />} />
          <Route path="/pricing" element={<Pricing lang={lang} darkMode={darkMode} />} />
          <Route path="/testimonials" element={<Testimonials lang={lang} darkMode={darkMode} />} />
          <Route path="/admin" element={<Admin lang={lang} darkMode={darkMode} user={user} onLogin={handleLogin} />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/error" element={<AuthError />} />
          <Route path="/blog/*" element={<BlogRoutes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;