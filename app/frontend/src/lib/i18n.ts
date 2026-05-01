export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    pricing: 'الأسعار',
    admin: 'الإدارة',
    blog: 'المدونة',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    
    // Hero
    heroTitle: 'أعد تصميم مساحتك بالذكاء الاصطناعي',
    heroSubtitle: 'حوّل أي غرفة أو منزل إلى تحفة معمارية باستخدام تقنيات الذكاء الاصطناعي المتقدمة',
    heroButton: 'ابدأ التصميم الآن',
    heroSecondary: 'شاهد الأمثلة',
    
    // Features
    featuresTitle: 'مميزات G EMAAR AI',
    feature1Title: 'تصميم داخلي ذكي',
    feature1Desc: 'أعد تصميم الغرف والمساحات الداخلية بأنماط متعددة',
    feature2Title: 'تصميم خارجي احترافي',
    feature2Desc: 'حوّل واجهات المباني والحدائق بلمسة فنية',
    feature3Title: 'معالجة فورية',
    feature3Desc: 'احصل على نتائج مذهلة في ثوانٍ معدودة',
    feature4Title: 'مقارنة قبل وبعد',
    feature4Desc: 'قارن بين التصميم الأصلي والجديد بسهولة',
    
    // Showcase
    showcaseTitle: 'أمثلة على أعمالنا',
    before: 'قبل',
    after: 'بعد',
    
    // Dashboard
    dashboardTitle: 'لوحة التحكم',
    uploadTitle: 'تحميل الصورة',
    uploadDesc: 'اسحب وأفلت الصورة هنا أو انقر للتحميل',
    uploadFormats: 'يدعم JPG, PNG, WEBP',
    promptLabel: 'تعليمات التصميم',
    promptPlaceholder: 'مثال: اجعل هذه الغرفة عصرية بإضاءة خافتة وأرضية خشبية',
    styleLabel: 'نمط التصميم',
    generateButton: 'إنشاء التصميم',
    generating: 'جاري المعالجة...',
    downloadButton: 'تحميل النتيجة',
    resultTitle: 'نتيجة التصميم',
    originalImage: 'الصورة الأصلية',
    generatedImage: 'الصورة المُعاد تصميمها',
    myDesigns: 'تصاميمي السابقة',
    noDesigns: 'لا توجد تصاميم بعد',
    
    // Styles
    styleModern: 'عصري حديث',
    styleClassic: 'كلاسيكي فاخر',
    styleMinimalist: 'بسيط أنيق',
    styleArabic: 'عربي تقليدي',
    styleIndustrial: 'صناعي عصري',
    styleScandinavian: 'اسكندنافي',
    
    // Suggestions
    suggestionsTitle: 'اقتراحات ذكية',
    suggestion1: 'اجعل الغرفة عصرية مع إضاءة دافئة',
    suggestion2: 'أضف نباتات وعناصر طبيعية',
    suggestion3: 'حوّل إلى تصميم كلاسيكي فاخر',
    suggestion4: 'اجعل المساحة أكثر اتساعاً وإشراقاً',
    suggestion5: 'أضف لمسة عربية تقليدية',
    suggestion6: 'تصميم بسيط مع ألوان محايدة',
    
    // Pricing
    pricingTitle: 'خطط الاشتراك',
    pricingSubtitle: 'اختر الخطة المناسبة لاحتياجاتك',
    free: 'مجاني',
    monthly: 'شهري',
    yearly: 'سنوي',
    freePrice: 'مجاناً',
    monthlyPrice: '40 ريال/شهر',
    yearlyPrice: '399 ريال/سنة',
    freeImages: '10 صور',
    monthlyImages: '100 صور/شهر',
    yearlyImages: 'غير محدود',
    freeFeatures: 'تصاميم أساسية',
    monthlyFeatures: 'جميع الأنماط + أولوية المعالجة',
    yearlyFeatures: 'جميع المميزات + دعم مخصص',
    subscribe: 'اشترك الآن',
    currentPlan: 'خطتك الحالية',
    comingSoon: 'قريباً',
    
    // Admin
    adminTitle: 'لوحة تحكم الإدارة',
    totalUsers: 'إجمالي المستخدمين',
    totalDesigns: 'إجمالي التصاميم',
    activeSubscriptions: 'الاشتراكات النشطة',
    recentDesigns: 'التصاميم الأخيرة',
    
    // Common
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    language: 'English',
    imagesRemaining: 'صور متبقية',
    error: 'حدث خطأ',
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    
    // Testimonials
    testimonials: 'آراء العملاء',

    // Footer
    footerDesc: 'منصة ذكاء اصطناعي متقدمة لإعادة تصميم المساحات',
    rights: 'جميع الحقوق محفوظة',
  },
  en: {
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    pricing: 'Pricing',
    admin: 'Admin',
    blog: 'Blog',
    login: 'Login',
    logout: 'Logout',
    
    // Hero
    heroTitle: 'Redesign Your Space with AI',
    heroSubtitle: 'Transform any room or home into an architectural masterpiece using advanced AI technology',
    heroButton: 'Start Designing Now',
    heroSecondary: 'View Examples',
    
    // Features
    featuresTitle: 'G EMAAR AI Features',
    feature1Title: 'Smart Interior Design',
    feature1Desc: 'Redesign rooms and interior spaces with multiple styles',
    feature2Title: 'Professional Exterior Design',
    feature2Desc: 'Transform building facades and gardens with artistic touch',
    feature3Title: 'Instant Processing',
    feature3Desc: 'Get stunning results in seconds',
    feature4Title: 'Before & After Comparison',
    feature4Desc: 'Easily compare original and new designs',
    
    // Showcase
    showcaseTitle: 'Our Work Examples',
    before: 'Before',
    after: 'After',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    uploadTitle: 'Upload Image',
    uploadDesc: 'Drag & drop your image here or click to upload',
    uploadFormats: 'Supports JPG, PNG, WEBP',
    promptLabel: 'Design Instructions',
    promptPlaceholder: 'Example: Make this room modern with dim lighting and wooden floors',
    styleLabel: 'Design Style',
    generateButton: 'Generate Design',
    generating: 'Processing...',
    downloadButton: 'Download Result',
    resultTitle: 'Design Result',
    originalImage: 'Original Image',
    generatedImage: 'Redesigned Image',
    myDesigns: 'My Previous Designs',
    noDesigns: 'No designs yet',
    
    // Styles
    styleModern: 'Modern',
    styleClassic: 'Classic Luxury',
    styleMinimalist: 'Minimalist',
    styleArabic: 'Traditional Arabic',
    styleIndustrial: 'Industrial',
    styleScandinavian: 'Scandinavian',
    
    // Suggestions
    suggestionsTitle: 'Smart Suggestions',
    suggestion1: 'Make the room modern with warm lighting',
    suggestion2: 'Add plants and natural elements',
    suggestion3: 'Transform to classic luxury design',
    suggestion4: 'Make the space more spacious and bright',
    suggestion5: 'Add traditional Arabic touch',
    suggestion6: 'Minimalist design with neutral colors',
    
    // Pricing
    pricingTitle: 'Subscription Plans',
    pricingSubtitle: 'Choose the plan that fits your needs',
    free: 'Free',
    monthly: 'Monthly',
    yearly: 'Yearly',
    freePrice: 'Free',
    monthlyPrice: '40 SAR/month',
    yearlyPrice: '399 SAR/year',
    freeImages: '10 images',
    monthlyImages: '100 images/month',
    yearlyImages: 'Unlimited',
    freeFeatures: 'Basic designs',
    monthlyFeatures: 'All styles + Priority processing',
    yearlyFeatures: 'All features + Dedicated support',
    subscribe: 'Subscribe Now',
    currentPlan: 'Your Current Plan',
    comingSoon: 'Coming Soon',
    
    // Admin
    adminTitle: 'Admin Dashboard',
    totalUsers: 'Total Users',
    totalDesigns: 'Total Designs',
    activeSubscriptions: 'Active Subscriptions',
    recentDesigns: 'Recent Designs',
    
    // Common
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'العربية',
    imagesRemaining: 'images remaining',
    error: 'An error occurred',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    
    // Testimonials
    testimonials: 'Testimonials',

    // Footer
    footerDesc: 'Advanced AI platform for redesigning spaces',
    rights: 'All rights reserved',
  },
};

export function t(lang: Language, key: keyof typeof translations.ar): string {
  return translations[lang]?.[key] || key;
}