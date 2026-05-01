import React from 'react';
import { Users, Image, CreditCard, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language, t } from '@/lib/i18n';
import client from '@/lib/api';

interface AdminProps {
  lang: Language;
  darkMode: boolean;
  user: any;
  onLogin: () => void;
}

export default function Admin({ lang, darkMode, user, onLogin }: AdminProps) {
  const [designs, setDesigns] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState({ totalDesigns: 0, completedDesigns: 0 });

  React.useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      try {
        const res = await client.entities.designs.queryAll({ sort: '-created_at', limit: 50 });
        const items = res.data?.items || [];
        setDesigns(items);
        setStats({
          totalDesigns: items.length,
          completedDesigns: items.filter((d: any) => d.status === 'completed').length,
        });
      } catch { /* ignore */ }
    };
    loadData();
  }, [user]);

  if (!user) {
    return (
      <div className={`min-h-[80vh] flex items-center justify-center ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#E8D48B]/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-[#C9A84C]" />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'ar' ? 'تسجيل دخول المدير' : 'Admin Login'}
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {lang === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى لوحة الإدارة' : 'Please login to access admin dashboard'}
          </p>
          <Button onClick={onLogin} className="bg-gradient-to-r from-[#C9A84C] to-[#E8D48B] text-[#0A0B14] font-bold px-8 py-3 rounded-xl">
            {t(lang, 'login')}
          </Button>
        </div>
      </div>
    );
  }

  const statCards = [
    { icon: Image, label: lang === 'ar' ? 'إجمالي التصاميم' : 'Total Designs', value: stats.totalDesigns, color: 'from-blue-500 to-blue-600' },
    { icon: TrendingUp, label: lang === 'ar' ? 'تصاميم مكتملة' : 'Completed', value: stats.completedDesigns, color: 'from-green-500 to-green-600' },
    { icon: Users, label: lang === 'ar' ? 'المستخدمون' : 'Users', value: '-', color: 'from-purple-500 to-purple-600' },
    { icon: CreditCard, label: lang === 'ar' ? 'الاشتراكات' : 'Subscriptions', value: '-', color: 'from-[#C9A84C] to-[#E8D48B]' },
  ];

  return (
    <div className={`min-h-screen py-8 ${darkMode ? 'bg-[#0A0B14]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-7 h-7 text-[#C9A84C]" />
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t(lang, 'adminTitle')}
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border transition-all ${
                darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Designs Table */}
        <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-inherit">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t(lang, 'recentDesigns')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}>
                  <th className={`px-6 py-3 text-start text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    ID
                  </th>
                  <th className={`px-6 py-3 text-start text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'ar' ? 'النمط' : 'Style'}
                  </th>
                  <th className={`px-6 py-3 text-start text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className={`px-6 py-3 text-start text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className={`px-6 py-3 text-start text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'ar' ? 'المعاينة' : 'Preview'}
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
                {designs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={`px-6 py-12 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {t(lang, 'noDesigns')}
                    </td>
                  </tr>
                ) : (
                  designs.slice(0, 20).map((design) => (
                    <tr key={design.id} className={`${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        #{design.id}
                      </td>
                      <td className={`px-6 py-4 text-sm capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {design.style || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          design.status === 'completed'
                            ? 'bg-green-500/10 text-green-400'
                            : design.status === 'failed'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {design.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {design.created_at ? new Date(design.created_at).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US') : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {design.result_image_url ? (
                          <img src={design.result_image_url} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}