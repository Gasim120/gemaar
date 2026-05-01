import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Calendar } from 'lucide-react';
import { blogPosts, getBlogRoute } from '@/lib/blog';

const BlogIndexPage = () => (
  <main dir="rtl" className="min-h-screen bg-[#0A0B14] text-white">
    {/* Hero */}
    <section className="relative overflow-hidden border-b border-[#C9A84C]/20 bg-gradient-to-br from-[#0A0B14] via-[#141520] to-[#0A0B14]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(201,168,76,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(232,212,139,0.12), transparent 40%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 text-sm text-[#E8D48B]">
            <Sparkles className="h-4 w-4" />
            <span>مدونة G EMAAR AI</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] bg-clip-text text-transparent">
              مدونة G EMAAR AI
            </span>
            <br />
            <span className="text-white">رؤى وأفكار التصميم بالذكاء الاصطناعي</span>
          </h1>
          <p className="text-lg leading-8 text-gray-300">
            اكتشف أحدث المقالات حول التصميم الداخلي بالذكاء الاصطناعي، إعادة تصميم الغرف افتراضياً،
            وديكور المنزل بالذكاء الاصطناعي. دليلك الشامل لإتقان استخدام G EMAAR AI في تحويل مساحاتك.
          </p>
        </div>
      </div>
    </section>

    {/* Articles */}
    <section className="mx-auto max-w-6xl px-6 py-16">
      {blogPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const heroImage = (post.frontmatter as any).hero_image as string | undefined;
            return (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-[#C9A84C]/20 bg-[#141520] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/50 hover:shadow-xl hover:shadow-[#C9A84C]/10"
              >
                {heroImage ? (
                  <Link to={getBlogRoute(post.slug)} className="block overflow-hidden">
                    <img
                      src={heroImage}
                      alt={post.title}
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                ) : null}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    {post.frontmatter.date ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.frontmatter.date}
                      </span>
                    ) : null}
                    {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#C9A84C]/10 px-2.5 py-1 text-[#E8D48B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-xl font-bold leading-snug text-white">
                    <Link
                      className="transition-colors hover:text-[#C9A84C]"
                      to={getBlogRoute(post.slug)}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-400 line-clamp-3">
                    {post.description}
                  </p>
                  <Link
                    to={getBlogRoute(post.slug)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] transition-colors hover:text-[#E8D48B]"
                  >
                    قراءة المقال
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#C9A84C]/30 bg-[#141520] p-10 text-center">
          <h2 className="text-2xl font-bold text-white">لا توجد مقالات بعد</h2>
          <p className="mt-3 text-gray-400">ستظهر المقالات هنا تلقائياً عند إضافتها.</p>
        </div>
      )}
    </section>
  </main>
);

export default BlogIndexPage;