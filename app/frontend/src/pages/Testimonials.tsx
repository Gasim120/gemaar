import React from 'react';
import { Star, Quote } from 'lucide-react';
import { type Language, t } from '@/lib/i18n';

interface TestimonialsProps {
  lang: Language;
  darkMode: boolean;
}

const testimonials = [
  {
    nameAr: 'سارة الأحمد',
    nameEn: 'Sarah Al-Ahmad',
    roleAr: 'مصممة داخلية',
    roleEn: 'Interior Designer',
    rating: 5,
    textAr: 'G EMAAR AI غيّر طريقة عملي بالكامل! أصبح بإمكاني تقديم تصاميم متعددة لعملائي في دقائق بدلاً من أيام. النتائج مذهلة وواقعية جداً.',
    textEn: 'G EMAAR AI completely changed how I work! I can now present multiple designs to my clients in minutes instead of days. The results are stunning and very realistic.',
  },
  {
    nameAr: 'محمد الخالدي',
    nameEn: 'Mohammed Al-Khalidi',
    roleAr: 'صاحب عقارات',
    roleEn: 'Real Estate Owner',
    rating: 5,
    textAr: 'استخدمت G EMAAR AI لإعادة تصميم عدة فلل قبل عرضها للبيع. النتيجة؟ زيادة ملحوظة في الاهتمام من المشترين وسرعة في البيع. أداة لا غنى عنها!',
    textEn: 'I used G EMAAR AI to redesign several villas before listing them for sale. The result? A noticeable increase in buyer interest and faster sales. An indispensable tool!',
  },
  {
    nameAr: 'نورة العتيبي',
    nameEn: 'Noura Al-Otaibi',
    roleAr: 'ربة منزل',
    roleEn: 'Homeowner',
    rating: 5,
    textAr: 'كنت أحلم بتجديد غرفة المعيشة لكن لم أكن أعرف من أين أبدأ. G EMAAR AI أعطاني رؤية واضحة للنتيجة النهائية قبل حتى أن أشتري أي شيء. رائع!',
    textEn: 'I dreamed of renovating my living room but didn\'t know where to start. G EMAAR AI gave me a clear vision of the final result before I even bought anything. Amazing!',
  },
  {
    nameAr: 'خالد الشمري',
    nameEn: 'Khalid Al-Shammari',
    roleAr: 'مهندس معماري',
    roleEn: 'Architect',
    rating: 4,
    textAr: 'أداة ممتازة لتوليد أفكار أولية سريعة. أنماط التصميم المتنوعة تساعدني على استكشاف اتجاهات مختلفة قبل البدء بالتصميم التفصيلي.',
    textEn: 'An excellent tool for generating quick initial ideas. The diverse design styles help me explore different directions before starting detailed design work.',
  },
  {
    nameAr: 'فاطمة الحربي',
    nameEn: 'Fatima Al-Harbi',
    roleAr: 'مدونة ديكور',
    roleEn: 'Decor Blogger',
    rating: 5,
    textAr: 'أستخدم G EMAAR AI بشكل يومي لإنشاء محتوى لمدونتي. الصور المُولّدة بالذكاء الاصطناعي واقعية لدرجة أن متابعتي لا يصدقون أنها ليست حقيقية!',
    textEn: 'I use G EMAAR AI daily to create content for my blog. The AI-generated images are so realistic that my followers can\'t believe they\'re not real!',
  },
  {
    nameAr: 'عبدالله القحطاني',
    nameEn: 'Abdullah Al-Qahtani',
    roleAr: 'مقاول بناء',
    roleEn: 'Building Contractor',
    rating: 5,
    textAr: 'أعرض تصاميم G EMAAR AI على عملائي قبل البدء بالتنفيذ. هذا يوفر وقتاً كبيراً ويضمن رضا العميل عن النتيجة النهائية. استثمار يستحق كل ريال.',
    textEn: 'I show G EMAAR AI designs to my clients before starting execution. This saves a lot of time and ensures client satisfaction with the final result. Worth every riyal.',
  },
];

const avatarColors = [
  'from-rose-400 to-pink-600',
  'from-sky-400 to-blue-600',
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-600',
  'from-violet-400 to-purple-600',
  'from-cyan-400 to-indigo-600',
];

export default function Testimonials({ lang, darkMode }: TestimonialsProps) {
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#C9A84C]/20 bg-gradient-to-br from-[#0A0B14] via-[#141520] to-[#0A0B14] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(201,168,76,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(232,212,139,0.12), transparent 40%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 text-sm text-[#E8D48B] mb-6">
            <Star className="h-4 w-4" />
            <span>{isAr ? 'آراء العملاء' : 'Customer Reviews'}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
              {isAr ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            {isAr
              ? 'اكتشف تجارب عملاء G EMAAR AI الحقيقية وكيف ساعدتهم منصة الذكاء الاصطناعي في تحويل مساحاتهم.'
              : 'Discover real experiences from G EMAAR AI clients and how our AI platform helped transform their spaces.'}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className={`py-12 border-b ${darkMode ? 'bg-[#141520] border-[#C9A84C]/10' : 'bg-white border-gray-200'}`}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '4.9', labelAr: 'تقييم المتوسط', labelEn: 'Average Rating' },
              { value: '10K+', labelAr: 'مستخدم نشط', labelEn: 'Active Users' },
              { value: '500K+', labelAr: 'تصميم مُنجز', labelEn: 'Designs Created' },
              { value: '98%', labelAr: 'رضا العملاء', labelEn: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isAr ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className={`py-20 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-white/[0.03] border-[#C9A84C]/10 hover:border-[#C9A84C]/40 hover:bg-white/[0.06]'
                    : 'bg-white border-gray-200 hover:border-[#C9A84C]/50 hover:shadow-lg'
                }`}
              >
                {/* Quote icon */}
                <Quote className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} w-8 h-8 opacity-10 ${darkMode ? 'text-[#C9A84C]' : 'text-[#C9A84C]'}`} />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s < review.rating ? 'fill-[#C9A84C] text-[#C9A84C]' : darkMode ? 'text-gray-600' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className={`text-sm leading-7 mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{isAr ? review.textAr : review.textEn}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>
                    {(isAr ? review.nameAr : review.nameEn).charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {isAr ? review.nameAr : review.nameEn}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {isAr ? review.roleAr : review.roleEn}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${darkMode ? 'bg-[#141520] border-[#C9A84C]/10' : 'bg-white border-gray-200'}`}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {isAr ? 'جاهز لتجربة G EMAAR AI بنفسك؟' : 'Ready to Try G EMAAR AI Yourself?'}
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isAr
              ? 'انضم لآلاف العملاء الراضين وابدأ في تحويل مساحاتك اليوم.'
              : 'Join thousands of satisfied clients and start transforming your spaces today.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#C9A84C]/25"
          >
            {isAr ? 'ابدأ مجاناً' : 'Start for Free'}
          </a>
        </div>
      </section>
    </div>
  );
}