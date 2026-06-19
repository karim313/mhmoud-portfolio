import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'
import { FiTrendingUp, FiUsers, FiDollarSign, FiPercent } from 'react-icons/fi'
import { usePortfolio } from '../../context/PortfolioContext'

// ─── Realistic BI Demo Data ─────────────────────────────────────────
const REVENUE_DATA = [
  { month: 'Jan', revenue: 45000, target: 40000, profit: 18000 },
  { month: 'Feb', revenue: 52000, target: 42000, profit: 22000 },
  { month: 'Mar', revenue: 61000, target: 45000, profit: 27000 },
  { month: 'Apr', revenue: 58000, target: 48000, profit: 24000 },
  { month: 'May', revenue: 73000, target: 50000, profit: 34000 },
  { month: 'Jun', revenue: 85000, target: 55000, profit: 41000 },
  { month: 'Jul', revenue: 92000, target: 60000, profit: 46000 },
  { month: 'Aug', revenue: 88000, target: 65000, profit: 43000 },
  { month: 'Sep', revenue: 95000, target: 70000, profit: 48000 },
  { month: 'Oct', revenue: 110000, target: 75000, profit: 58000 },
  { month: 'Nov', revenue: 125000, target: 80000, profit: 67000 },
  { month: 'Dec', revenue: 140000, target: 90000, profit: 78000 },
]

const RETENTION_DATA = [
  { cohort: 'Cohort A', retention: 94, churn: 6 },
  { cohort: 'Cohort B', retention: 89, churn: 11 },
  { cohort: 'Cohort C', retention: 85, churn: 15 },
  { cohort: 'Cohort D', retention: 78, churn: 22 },
  { cohort: 'Cohort E', retention: 72, churn: 28 },
]

const CUSTOMER_ACQUISITION = [
  { name: 'Organic Search', value: 4200, color: '#6366f1' },
  { name: 'Paid Ads', value: 2800, color: '#3b82f6' },
  { name: 'Referral', value: 1800, color: '#d946ef' },
  { name: 'Social Media', value: 1500, color: '#10b981' },
  { name: 'Email Marketing', value: 1200, color: '#f59e0b' },
]

const FORECAST_DATA = [
  { month: 'Jul', actual: 92000, forecast: 92000 },
  { month: 'Aug', actual: 88000, forecast: 89000 },
  { month: 'Sep', actual: 95000, forecast: 96000 },
  { month: 'Oct', actual: 110000, forecast: 105000 },
  { month: 'Nov', actual: 125000, forecast: 118000 },
  { month: 'Dec', actual: 140000, forecast: 135000 },
  { month: 'Jan (F)', actual: null, forecast: 148000 },
  { month: 'Feb (F)', actual: null, forecast: 155000 },
  { month: 'Mar (F)', actual: null, forecast: 163000 },
]

export default function AnalyticsDashboardShowcase() {
  const { language, t } = usePortfolio()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeTab, setActiveTab] = useState('revenue')

  const isAr = language === 'ar'

  const translateMonth = (m) => {
    if (!isAr) return m
    const monthMap = {
      'Jan': 'يناير', 'Feb': 'فبراير', 'Mar': 'مارس', 'Apr': 'أبريل',
      'May': 'مايو', 'Jun': 'يونيو', 'Jul': 'يوليو', 'Aug': 'أغسطس',
      'Sep': 'سبتمبر', 'Oct': 'أكتوبر', 'Nov': 'نوفمبر', 'Dec': 'ديسمبر',
      'Jan (F)': 'يناير (ت)', 'Feb (F)': 'فبراير (ت)', 'Mar (F)': 'مارس (ت)'
    }
    return monthMap[m] || m
  }

  const translateCohort = (c) => {
    if (!isAr) return c
    return c.replace('Cohort', 'المجموعة')
  }

  const translateChannel = (n) => {
    if (!isAr) return n
    const channelMap = {
      'Organic Search': 'البحث العضوي',
      'Paid Ads': 'الإعلانات المدفوعة',
      'Referral': 'الإحالات',
      'Social Media': 'وسائل التواصل',
      'Email Marketing': 'التسويق بالبريد'
    }
    return channelMap[n] || n
  }

  // Localized Datasets
  const localizedRevenueData = REVENUE_DATA.map(d => ({ ...d, month: translateMonth(d.month) }))
  const localizedRetentionData = RETENTION_DATA.map(d => ({ ...d, cohort: translateCohort(d.cohort) }))
  const localizedAcquisition = CUSTOMER_ACQUISITION.map(d => ({ ...d, name: translateChannel(d.name) }))
  const localizedForecastData = FORECAST_DATA.map(d => ({ ...d, month: translateMonth(d.month) }))

  return (
    <section id="analytics" className="py-28 relative overflow-hidden bg-slate-50 dark:bg-dark-950">
      {/* Mesh background */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            {t('analytics.badge')}
          </span>
          <h2 className="section-title">{t('analytics.title')}</h2>
          <p className="section-subtitle">
            {t('analytics.subtitle')}
          </p>
        </motion.div>

        {/* Dashboard Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card dark:glass-card-dark shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Dashboard Header / KPI Bar */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-dark-900/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {isAr ? 'التحليلات التنفيذية' : 'Executive Analytics'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isAr ? 'مؤشرات أداء الأعمال في الوقت الفعلي ونماذج التنبؤ' : 'Real-time business performance indicators & forecast models'}
              </p>
            </div>

            {/* Quick KPI Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/30 text-start">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <FiDollarSign className="text-primary-500" /> {isAr ? 'الإيرادات' : 'Revenue'}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">$1.12M</p>
              </div>

              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/30 text-start">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <FiUsers className="text-blue-500" /> {isAr ? 'العملاء النشطون' : 'Active Customers'}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">11.5K</p>
              </div>

              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/30 text-start">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <FiPercent className="text-green-500" /> {isAr ? 'الاحتفاظ بالعملاء' : 'Retention Rate'}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">83.6%</p>
              </div>

              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/30 text-start">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <FiTrendingUp className="text-accent-500" /> {isAr ? 'النمو السنوي' : 'YoY Growth'}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">+24.8%</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-dark-950/50">
            {[
              { id: 'revenue', label: isAr ? 'مؤشرات الإيرادات' : 'Revenue KPIs' },
              { id: 'customers', label: isAr ? 'مؤشرات العملاء' : 'Customer KPIs' },
              { id: 'retention', label: isAr ? 'مؤشرات الاحتفاظ' : 'Retention KPIs' },
              { id: 'forecast', label: isAr ? 'مؤشرات التنبؤ' : 'Forecast KPIs' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none px-6 py-4.5 text-sm font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-500 bg-white/30 dark:bg-white/5'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Chart Content Area */}
          <div className="p-6 md:p-8 bg-white/20 dark:bg-dark-900/20">
            {activeTab === 'revenue' && (
              <div className="space-y-6">
                <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 ${
                  isAr ? 'sm:flex-row-reverse' : ''
                }`}>
                  <div className={isAr ? 'text-right' : 'text-left'}>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-display">
                      {isAr ? 'اتجاه الإيرادات مقابل المستهدفة' : 'Revenue vs Target Trend'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isAr ? 'تتبع شهري للإيرادات الفعلية، وهوامش الأرباح، والمستهدفات' : 'Monthly tracking of actual revenues, profit margins, and targets'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-3 h-3 rounded-full bg-primary-500" /> {isAr ? 'الإيرادات' : 'Revenue'}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-3 h-3 rounded-full bg-accent-500" /> {isAr ? 'الأرباح' : 'Profit'}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" /> {isAr ? 'المستهدف' : 'Target'}
                    </span>
                  </div>
                </div>

                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={localizedRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(99,102,241,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          borderRadius: '12px',
                          color: '#f1f5f9'
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name={isAr ? 'الإيرادات ($)' : 'Revenue ($)'} />
                      <Area type="monotone" dataKey="profit" stroke="#d946ef" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" name={isAr ? 'الأرباح ($)' : 'Profit ($)'} />
                      <Line type="monotone" dataKey="target" stroke="rgba(148,163,184,0.4)" strokeWidth={2} strokeDasharray="5 5" dot={false} name={isAr ? 'المستهدف ($)' : 'Target ($)'} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Acquisition Channels (Pie) */}
                <div className="glass-card dark:glass-card-dark p-6 bg-slate-900/10 text-start">
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 font-display">
                    {isAr ? 'قنوات جذب العملاء' : 'Acquisition Channels'}
                  </h4>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={localizedAcquisition}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {localizedAcquisition.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            borderRadius: '12px',
                            color: '#f1f5f9'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center mt-4">
                    {localizedAcquisition.map(entry => (
                      <span key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        {entry.name} ({Math.round(entry.value / 115 * 10) / 100}k)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Growth trend (Bar) */}
                <div className="glass-card dark:glass-card-dark p-6 bg-slate-900/10 text-start">
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 font-display">
                    {isAr ? 'نمو جذب العملاء (الربع الأول - الربع الرابع)' : 'Acquisition Growth (Q1 - Q4)'}
                  </h4>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={localizedRevenueData.slice(6, 12)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(99,102,241,0.05)" />
                        <XAxis dataKey="month" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                        <YAxis stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            borderRadius: '12px',
                            color: '#f1f5f9'
                          }}
                        />
                        <Bar dataKey="profit" fill="#6366f1" radius={[8, 8, 0, 0]} name={isAr ? 'الاشتراكات الجديدة' : 'New Subscriptions'} />
                        <Bar dataKey="revenue" fill="#d946ef" radius={[8, 8, 0, 0]} name={isAr ? 'الاستفسارات الجديدة' : 'New Inquiries'} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'retention' && (
              <div className="space-y-6">
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-display">
                    {isAr ? 'أداء الاحتفاظ بالعملاء لكل مجموعة' : 'Cohort Retention Performance'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'تحليل الاحتفاظ بالمجموعات يوضح استمرارية العملاء مقابل معدلات الفقدان' : 'Cohort retention analysis displaying customer persistence vs churn rates'}
                  </p>
                </div>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={localizedRetentionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(99,102,241,0.05)" />
                      <XAxis dataKey="cohort" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} unit="%" />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          borderRadius: '12px',
                          color: '#f1f5f9'
                        }}
                      />
                      <Legend verticalAlign="top" height={36}/>
                      <Bar dataKey="retention" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} name={isAr ? 'معدل الاحتفاظ (%)' : 'Retention Rate (%)'} />
                      <Bar dataKey="churn" fill="#ef4444" stackId="a" radius={[8, 8, 0, 0]} name={isAr ? 'معدل الفقدان (%)' : 'Churn Rate (%)'} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'forecast' && (
              <div className="space-y-6">
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-display">
                    {isAr ? 'نموذج التنبؤ بأداء المبيعات' : 'Sales Performance Forecasting Model'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'المبيعات الفعلية مطابقة لنماذج التنبؤ بالـ 3 أشهر القادمة (التنعيم الأسي)' : 'Actual sales matched against 3-month predictive forecasting models (exponential smoothing)'}
                  </p>
                </div>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={localizedForecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(99,102,241,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          borderRadius: '12px',
                          color: '#f1f5f9'
                        }}
                      />
                      <Legend verticalAlign="top" height={36}/>
                      <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} name={isAr ? 'المبيعات الفعلية ($)' : 'Actual Sales ($)'} connectNulls />
                      <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name={isAr ? 'التنبؤ ($)' : 'Forecast ($)'} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
