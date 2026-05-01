import React from 'react';
import { Upload, Wand2, Download, Image as ImageIcon, Loader2, X, Lightbulb, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { type Language, t } from '@/lib/i18n';
import client from '@/lib/api';

interface DashboardProps {
  lang: Language;
  darkMode: boolean;
  user: any;
  onLogin: () => void;
}

const STYLES = [
  { key: 'modern', labelAr: 'عصري حديث', labelEn: 'Modern' },
  { key: 'classic', labelAr: 'كلاسيكي فاخر', labelEn: 'Classic Luxury' },
  { key: 'minimalist', labelAr: 'بسيط أنيق', labelEn: 'Minimalist' },
  { key: 'arabic', labelAr: 'عربي تقليدي', labelEn: 'Traditional Arabic' },
  { key: 'industrial', labelAr: 'صناعي عصري', labelEn: 'Industrial' },
  { key: 'scandinavian', labelAr: 'اسكندنافي', labelEn: 'Scandinavian' },
];

export default function Dashboard({ lang, darkMode, user, onLogin }: DashboardProps) {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [prompt, setPrompt] = React.useState('');
  const [selectedStyle, setSelectedStyle] = React.useState('modern');
  const [generating, setGenerating] = React.useState(false);
  const [resultImage, setResultImage] = React.useState<string | null>(null);
  const [designs, setDesigns] = React.useState<any[]>([]);
  const [sliderPos, setSliderPos] = React.useState(50);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Load user designs
  React.useEffect(() => {
    if (!user) return;
    const loadDesigns = async () => {
      try {
        const res = await client.entities.designs.query({ sort: '-created_at', limit: 20 });
        setDesigns(res.data?.items || []);
      } catch { /* ignore */ }
    };
    loadDesigns();
  }, [user]);

  // Slider logic
  const handleSliderMove = React.useCallback((clientX: number) => {
    if (!sliderRef.current || !isDragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  }, []);

  React.useEffect(() => {
    const up = () => { isDragging.current = false; };
    const move = (e: MouseEvent) => handleSliderMove(e.clientX);
    const touchMove = (e: TouchEvent) => handleSliderMove(e.touches[0].clientX);
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchend', up);
    window.addEventListener('touchmove', touchMove);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchend', up);
      window.removeEventListener('touchmove', touchMove);
    };
  }, [handleSliderMove]);

  if (!user) {
    return (
      <div className={`min-h-[80vh] flex items-center justify-center ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#E8D48B]/10 flex items-center justify-center mx-auto mb-6">
            <Wand2 className="w-10 h-10 text-[#C9A84C]" />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'ar' ? 'سجّل دخولك للبدء' : 'Login to Get Started'}
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {lang === 'ar' ? 'تحتاج إلى تسجيل الدخول لاستخدام أدوات التصميم' : 'You need to login to use design tools'}
          </p>
          <Button onClick={onLogin} className="bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-bold px-8 py-3 rounded-xl">
            {t(lang, 'login')}
          </Button>
        </div>
      </div>
    );
  }

  const suggestions = [
    { key: 'suggestion1', ar: 'اجعل الغرفة عصرية مع إضاءة دافئة', en: 'Make the room modern with warm lighting' },
    { key: 'suggestion2', ar: 'أضف نباتات وعناصر طبيعية', en: 'Add plants and natural elements' },
    { key: 'suggestion3', ar: 'حوّل إلى تصميم كلاسيكي فاخر', en: 'Transform to classic luxury design' },
    { key: 'suggestion4', ar: 'اجعل المساحة أكثر اتساعاً وإشراقاً', en: 'Make the space more spacious and bright' },
    { key: 'suggestion5', ar: 'أضف لمسة عربية تقليدية', en: 'Add traditional Arabic touch' },
    { key: 'suggestion6', ar: 'تصميم بسيط مع ألوان محايدة', en: 'Minimalist design with neutral colors' },
  ];

  const handleFileSelect = (file: File) => {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      toast.error(lang === 'ar' ? 'يرجى تحميل صورة بصيغة JPG أو PNG أو WEBP' : 'Please upload a JPG, PNG, or WEBP image');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error(lang === 'ar' ? 'حجم الصورة يجب أن يكون أقل من 10 ميجابايت' : 'Image size must be less than 10MB');
      return;
    }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setResultImage(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt.trim()) {
      toast.error(lang === 'ar' ? 'يرجى تحميل صورة وإدخال التعليمات' : 'Please upload an image and enter instructions');
      return;
    }

    setGenerating(true);
    setResultImage(null);

    try {
      const styleLabel = STYLES.find(s => s.key === selectedStyle);
      const styleName = lang === 'ar' ? styleLabel?.labelAr : styleLabel?.labelEn;
      const fullPrompt = `Redesign this room/space in ${styleName || selectedStyle} style. ${prompt}. Keep the same room structure and layout but transform the interior design, furniture, lighting, and decor. Make it look professional and realistic.`;

      const response = await client.ai.genimg(
        {
          prompt: fullPrompt,
          model: 'gemini-3-pro-image-preview',
          image: uploadedImage,
          size: '1024x1024',
          n: 1,
        },
        { timeout: 600000 }
      );

      const generatedUrl = response.data?.images?.[0];
      if (!generatedUrl) throw new Error('No image generated');

      setResultImage(generatedUrl);

      // Save to database
      try {
        // Upload original image to storage
        let objectKey = '';
        if (uploadedFile) {
          const key = `originals/${Date.now()}_${uploadedFile.name}`;
          await client.storage.upload({ bucket_name: 'emaar-designs', object_key: key, file: uploadedFile });
          objectKey = key;
        }

        await client.entities.designs.create({
          data: {
            original_image_key: objectKey,
            result_image_url: generatedUrl,
            prompt: prompt,
            style: selectedStyle,
            status: 'completed',
            created_at: new Date().toISOString(),
          },
        });

        // Refresh designs
        const res = await client.entities.designs.query({ sort: '-created_at', limit: 20 });
        setDesigns(res.data?.items || []);
      } catch { /* save error - non-critical */ }

      toast.success(lang === 'ar' ? 'تم إنشاء التصميم بنجاح!' : 'Design generated successfully!');
    } catch (err: any) {
      const detail = err?.data?.detail || err?.response?.data?.detail || err?.message || '';
      toast.error(lang === 'ar' ? `حدث خطأ: ${detail}` : `Error: ${detail}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = `emaar-ai-design-${Date.now()}.png`;
    a.target = '_blank';
    a.click();
  };

  return (
    <div className={`min-h-screen py-8 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t(lang, 'dashboardTitle')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload & Controls */}
          <div className="space-y-6">
            {/* Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => !uploadedImage && fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                uploadedImage
                  ? darkMode ? 'border-[#C9A84C]/30 bg-white/[0.02]' : 'border-[#C9A84C]/30 bg-white'
                  : darkMode
                  ? 'border-[#C9A84C]/20 bg-white/[0.02] hover:border-[#C9A84C]/40 hover:bg-white/[0.04]'
                  : 'border-gray-300 bg-white hover:border-[#C9A84C]/50 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />

              {uploadedImage ? (
                <div className="relative">
                  <img src={uploadedImage} alt="Uploaded" className="w-full rounded-xl max-h-[300px] object-contain" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setUploadedImage(null); setUploadedFile(null); setResultImage(null); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="mt-3 text-sm text-[#C9A84C] hover:underline"
                  >
                    {lang === 'ar' ? 'تغيير الصورة' : 'Change image'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#E8D48B]/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <p className={`text-lg font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t(lang, 'uploadDesc')}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t(lang, 'uploadFormats')}
                  </p>
                </>
              )}
            </div>

            {/* Style Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t(lang, 'styleLabel')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.key}
                    onClick={() => setSelectedStyle(style.key)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedStyle === style.key
                        ? 'bg-[#C9A84C] text-[#0A0B14]'
                        : darkMode
                        ? 'bg-white/[0.05] text-gray-300 hover:bg-white/[0.1] border border-white/10'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {lang === 'ar' ? style.labelAr : style.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t(lang, 'promptLabel')}
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t(lang, 'promptPlaceholder')}
                rows={3}
                className={`rounded-xl resize-none ${
                  darkMode
                    ? 'bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C9A84C]'
                    : 'bg-white border-gray-200 focus:border-[#C9A84C]'
                }`}
              />
            </div>

            {/* Smart Suggestions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-[#C9A84C]" />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t(lang, 'suggestionsTitle')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setPrompt(lang === 'ar' ? s.ar : s.en)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      darkMode
                        ? 'bg-white/[0.05] text-gray-400 hover:bg-[#C9A84C]/20 hover:text-[#C9A84C] border border-white/10'
                        : 'bg-gray-100 text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] border border-gray-200'
                    }`}
                  >
                    {lang === 'ar' ? s.ar : s.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={generating || !uploadedImage || !prompt.trim()}
              className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-bold text-lg py-6 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <Loader2 className={`w-5 h-5 animate-spin ${lang === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t(lang, 'generating')}
                </>
              ) : (
                <>
                  <Wand2 className={`w-5 h-5 ${lang === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t(lang, 'generateButton')}
                </>
              )}
            </Button>
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {resultImage && uploadedImage ? (
              <>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t(lang, 'resultTitle')}
                </h3>

                {/* Before/After Slider */}
                <div
                  ref={sliderRef}
                  className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-col-resize select-none"
                  onMouseDown={() => { isDragging.current = true; }}
                  onTouchStart={() => { isDragging.current = true; }}
                >
                  <img src={resultImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                    <img
                      src={uploadedImage}
                      alt="Before"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ minWidth: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }}
                    />
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-[#C9A84C] z-10" style={{ left: `${sliderPos}%` }}>
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-lg">
                      <SlidersHorizontal className="w-4 h-4 text-[#0A0B14]" />
                    </div>
                  </div>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-gray-900'}`}>
                    {t(lang, 'before')}
                  </div>
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-gray-900'}`}>
                    {t(lang, 'after')}
                  </div>
                </div>

                <Button
                  onClick={handleDownload}
                  className={`w-full py-5 rounded-xl font-semibold ${
                    darkMode
                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Download className={`w-5 h-5 ${lang === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t(lang, 'downloadButton')}
                </Button>
              </>
            ) : (
              <div className={`flex items-center justify-center h-full min-h-[400px] rounded-2xl border-2 border-dashed ${
                darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-white'
              }`}>
                <div className="text-center px-4">
                  <ImageIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-lg font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {lang === 'ar' ? 'ستظهر النتيجة هنا' : 'Result will appear here'}
                  </p>
                </div>
              </div>
            )}

            {/* Previous Designs */}
            {designs.length > 0 && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t(lang, 'myDesigns')}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {designs.slice(0, 6).map((design) => (
                    <button
                      key={design.id}
                      onClick={() => {
                        if (design.result_image_url) setResultImage(design.result_image_url);
                      }}
                      className="relative rounded-xl overflow-hidden aspect-square group"
                    >
                      <img
                        src={design.result_image_url || ''}
                        alt="Design"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}