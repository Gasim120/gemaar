import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Paintbrush, Home, Zap, SlidersHorizontal, Star, ChevronLeft, ChevronRight, BookOpen, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language, t } from '@/lib/i18n';
import { blogPosts, getBlogRoute } from '@/lib/blog';

const HERO_IMG = 'https://mgx-backend-cdn.metadl.com/generate/images/1119981/2026-04-18/m25hyvyaae7q/hero-luxury-living-room.png';
const BEFORE_AFTER_IMG = 'https://mgx-backend-cdn.metadl.com/generate/images/1119981/2026-04-18/m25hzbaaafbq/before-after-bedroom.png';
const KITCHEN_IMG = 'https://mgx-backend-cdn.metadl.com/generate/images/1119981/2026-04-18/m25h3nyaafba/showcase-kitchen.png';
const VILLA_IMG = 'https://mgx-backend-cdn.metadl.com/generate/images/1119981/2026-04-18/m25hz2aaae7a/showcase-exterior-villa.png';

interface IndexProps {
  lang: Language;
  darkMode: boolean;
  user: any;
  onLogin: () => void;
}

function BeforeAfterSlider({ darkMode }: { darkMode: boolean }) {
  const [sliderPos, setSliderPos] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  React.useEffect(() => {
    const handleMouseUp = () => { isDragging.current = false; };
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={() => { isDragging.current = true; }}
      onTouchStart={() => { isDragging.current = true; }}
    >
      {/* After image (full) */}
      <img src={KITCHEN_IMG} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img src={BEFORE_AFTER_IMG} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }} />
      </div>
      {/* Slider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-[#C9A84C] z-10" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-lg">
          <ChevronLeft className="w-4 h-4 text-[#0A0B14]" />
          <ChevronRight className="w-4 h-4 text-[#0A0B14]" />
        </div>
      </div>
      {/* Labels */}
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-gray-900'}`}>
        Before
      </div>
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-gray-900'}`}>
        After
      </div>
    </div>
  );
}

export default function Index({ lang, darkMode, user, onLogin }: IndexProps) {
  const navigate = useNavigate();

  const features = [
    { icon: Paintbrush, titleKey: 'feature1Title' as const, descKey: 'feature1Desc' as const },
    { icon: Home, titleKey: 'feature2Title' as const, descKey: 'feature2Desc' as const },
    { icon: Zap, titleKey: 'feature3Title' as const, descKey: 'feature3Desc' as const },
    { icon: SlidersHorizontal, titleKey: 'feature4Title' as const, descKey: 'feature4Desc' as const },
  ];

  const showcaseImages = [
    { src: KITCHEN_IMG, label: lang === 'ar' ? 'مطبخ عصري' : 'Modern Kitchen' },
    { src: VILLA_IMG, label: lang === 'ar' ? 'فيلا فاخرة' : 'Luxury Villa' },
    { src: BEFORE_AFTER_IMG, label: lang === 'ar' ? 'غرفة نوم' : 'Bedroom' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-[#0A0B14]/70 via-[#0A0B14]/50 to-[#0A0B14]' : 'bg-gradient-to-b from-black/40 via-black/20 to-gray-50'}`} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 mb-6">
            <Star className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-sm font-medium text-[#C9A84C]">
              {lang === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t(lang, 'heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t(lang, 'heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => user ? navigate('/dashboard') : onLogin()}
              className="bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-bold text-lg px-8 py-6 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#C9A84C]/25"
            >
              {t(lang, 'heroButton')}
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="!bg-transparent border-white/30 text-white hover:!bg-white/10 font-medium text-lg px-8 py-6 rounded-xl"
            >
              {t(lang, 'heroSecondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t(lang, 'featuresTitle')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] mx-auto mb-16 rounded-full" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-white/[0.03] border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-white/[0.06]'
                    : 'bg-white border-gray-200 hover:border-[#C9A84C]/50 hover:shadow-lg'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A84C]/20 to-[#E8D48B]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t(lang, feature.titleKey)}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t(lang, feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Slider Section */}
      <section id="showcase" className={`py-24 ${darkMode ? 'bg-[#141520]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t(lang, 'showcaseTitle')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] mx-auto mb-16 rounded-full" />
          
          <BeforeAfterSlider darkMode={darkMode} />
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`py-24 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseImages.map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`py-24 ${darkMode ? 'bg-[#141520]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 mb-4">
                <BookOpen className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-sm font-medium text-[#C9A84C]">
                  {lang === 'ar' ? 'المدونة' : 'Blog'}
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'ar' ? 'رؤى وأفكار G EMAAR AI' : 'G EMAAR AI Insights'}
              </h2>
              <p className={`text-base max-w-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'ar'
                  ? 'اكتشف أحدث المقالات حول التصميم الداخلي بالذكاء الاصطناعي، إعادة تصميم الغرف، وديكور المنزل.'
                  : 'Discover the latest articles on AI interior design, room redesign, and home decor.'}
              </p>
            </div>
            <Link
              to="/blog/"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
                darkMode
                  ? 'border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10'
                  : 'border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10'
              }`}
            >
              {lang === 'ar' ? 'عرض جميع المقالات' : 'View all articles'}
              <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => {
              const heroImage = (post.frontmatter as any).hero_image as string | undefined;
              return (
                <Link
                  key={post.slug}
                  to={getBlogRoute(post.slug)}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? 'bg-white/[0.03] border-[#C9A84C]/10 hover:border-[#C9A84C]/40 hover:bg-white/[0.06]'
                      : 'bg-white border-gray-200 hover:border-[#C9A84C]/50 hover:shadow-lg'
                  }`}
                >
                  {heroImage && (
                    <div className="overflow-hidden aspect-[16/9]">
                      <img
                        src={heroImage}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.frontmatter.date && (
                      <div className={`inline-flex items-center gap-1.5 text-xs mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {post.frontmatter.date}
                      </div>
                    )}
                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#C9A84C] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm leading-6 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A84C]">
                      {lang === 'ar' ? 'قراءة المقال' : 'Read article'}
                      <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'ar' ? 'جاهز لتحويل مساحتك؟' : 'Ready to Transform Your Space?'}
          </h2>
          <p className={`text-lg mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {lang === 'ar' ? 'ابدأ مجاناً واحصل على 10 تصاميم بالذكاء الاصطناعي' : 'Start for free and get 10 AI-powered designs'}
          </p>
          <Button
            onClick={() => user ? navigate('/dashboard') : onLogin()}
            className="bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-bold text-lg px-10 py-6 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#C9A84C]/25"
          >
            {t(lang, 'heroButton')}
            <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </div>
      </section>
    </div>
  );
}