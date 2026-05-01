import React from 'react';
import { Check, Crown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { type Language, t } from '@/lib/i18n';

interface PricingProps {
  lang: Language;
  darkMode: boolean;
}

const plans = [
  {
    key: 'free',
    icon: Sparkles,
    priceAr: 'مجاناً',
    priceEn: 'Free',
    periodAr: '',
    periodEn: '',
    featuresAr: ['10 صور شهرياً', 'تصاميم أساسية', 'صيغ JPG و PNG', 'مقارنة قبل/بعد'],
    featuresEn: ['10 images/month', 'Basic designs', 'JPG & PNG formats', 'Before/after comparison'],
    popular: false,
  },
  {
    key: 'monthly',
    icon: Star,
    priceAr: '40',
    priceEn: '40',
    periodAr: 'ريال/شهر',
    periodEn: 'SAR/month',
    featuresAr: ['100 صورة شهرياً', 'جميع أنماط التصميم', 'أولوية المعالجة', 'دقة عالية', 'تنزيل بجودة عالية'],
    featuresEn: ['100 images/month', 'All design styles', 'Priority processing', 'High resolution', 'HD downloads'],
    popular: true,
  },
  {
    key: 'yearly',
    icon: Crown,
    priceAr: '399',
    priceEn: '399',
    periodAr: 'ريال/سنة',
    periodEn: 'SAR/year',
    featuresAr: ['صور غير محدودة', 'جميع المميزات', 'دعم مخصص', 'أولوية قصوى', 'واجهة API للأعمال', 'تأثيرات ثلاثية الأبعاد'],
    featuresEn: ['Unlimited images', 'All features', 'Dedicated support', 'Top priority', 'Business API access', '3D effects'],
    popular: false,
  },
];

export default function Pricing({ lang, darkMode }: PricingProps) {
  const handleSubscribe = () => {
    toast.info(lang === 'ar' ? 'ميزة الاشتراك قريباً!' : 'Subscription feature coming soon!');
  };

  return (
    <div className={`min-h-screen py-24 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t(lang, 'pricingTitle')}
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t(lang, 'pricingSubtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-2 border-[#C9A84C] shadow-xl shadow-[#C9A84C]/10'
                  : darkMode
                  ? 'border border-white/10'
                  : 'border border-gray-200'
              } ${darkMode ? 'bg-white/[0.03]' : 'bg-white'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] text-sm font-bold">
                  {lang === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.popular ? 'bg-[#C9A84C]/20' : darkMode ? 'bg-white/10' : 'bg-gray-100'
                }`}>
                  <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-[#C9A84C]' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {lang === 'ar' ? t(lang, plan.key as any) : t(lang, plan.key as any)}
                </h3>
              </div>

              <div className="mb-8">
                {plan.key === 'free' ? (
                  <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'ar' ? plan.priceAr : plan.priceEn}
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {lang === 'ar' ? plan.priceAr : plan.priceEn}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang === 'ar' ? plan.periodAr : plan.periodEn}
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {(lang === 'ar' ? plan.featuresAr : plan.featuresEn).map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? 'bg-[#C9A84C]/20' : darkMode ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-[#C9A84C]' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleSubscribe}
                className={`w-full py-5 rounded-xl font-semibold ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] hover:opacity-90'
                    : darkMode
                    ? '!bg-white/10 text-white hover:!bg-white/20 border border-white/10'
                    : '!bg-gray-100 text-gray-900 hover:!bg-gray-200'
                }`}
              >
                {plan.key === 'free'
                  ? (lang === 'ar' ? 'ابدأ مجاناً' : 'Start Free')
                  : `${t(lang, 'comingSoon')}`}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}