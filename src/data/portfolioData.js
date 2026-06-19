// Central data store - simulates a Firebase-ready architecture
// All data is stored in localStorage with a clean API surface

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  CERTIFICATES: 'portfolio_certificates',
  SKILLS: 'portfolio_skills',
  PROFILE: 'portfolio_profile',
  MESSAGES: 'portfolio_messages',
  VISITORS: 'portfolio_visitors',
  THEME: 'portfolio_theme',
  AUTH: 'portfolio_auth',
}

// ─── Default Projects ────────────────────────────────────────────────
export const DEFAULT_PROJECTS = [
  {
    id: '1',
    name: 'Supply Chain Dashboard',
    description: 'A comprehensive supply chain KPI analytics dashboard tracking inventory levels, supplier performance, logistics efficiency, and fulfillment rates across multiple distribution centers.',
    image: '',
    technologies: ['Power BI', 'SQL', 'DAX', 'Excel'],
    githubUrl: 'https://github.com/MahmoudAboulSaud/supply-chain-dashboard',
    demoUrl: 'https://github.com/MahmoudAboulSaud/supply-chain-dashboard',
    featured: true,
    category: 'Power BI',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Quantix Sales Analytics',
    description: 'Advanced sales performance analytics and forecasting platform providing real-time insights into revenue trends, regional sales breakdown, and predictive sales modeling.',
    image: '',
    technologies: ['Power BI', 'Python', 'SQL', 'Statistics'],
    githubUrl: 'https://github.com/MahmoudAboulSaud/Quantix-Sales-Analytics',
    demoUrl: 'https://github.com/MahmoudAboulSaud/Quantix-Sales-Analytics',
    featured: true,
    category: 'Analytics',
    createdAt: '2024-03-20',
  },
  {
    id: '3',
    name: 'Chocolate Retail Analytics',
    description: 'Deep retail sales analysis and customer insights for a chocolate brand, including seasonality trends, product performance, and customer segmentation analysis.',
    image: '',
    technologies: ['Power BI', 'Excel', 'DAX', 'SQL'],
    githubUrl: 'https://github.com/MahmoudAboulSaud/Chocolate-Retail-Analytics-',
    demoUrl: 'https://github.com/MahmoudAboulSaud/Chocolate-Retail-Analytics-',
    featured: false,
    category: 'Retail',
    createdAt: '2024-05-10',
  },
  {
    id: '4',
    name: 'Customer Churn Retention Analysis',
    description: 'Customer retention and churn prediction system using machine learning models and statistical analysis to identify at-risk customers and recommend targeted retention strategies.',
    image: '',
    technologies: ['Python', 'Scikit-learn', 'SQL', 'Tableau'],
    githubUrl: 'https://github.com/MahmoudAboulSaud/Customer-Churn-Retention-Analysis',
    demoUrl: 'https://github.com/MahmoudAboulSaud/Customer-Churn-Retention-Analysis',
    featured: true,
    category: 'Machine Learning',
    createdAt: '2024-07-05',
  },
  {
    id: '5',
    name: 'Retail Analytics Power BI',
    description: 'Complete retail business intelligence solution featuring multi-dimensional analysis of sales, inventory, customer behavior, and profitability with interactive drill-through reports.',
    image: '',
    technologies: ['Power BI', 'DAX', 'SQL Server', 'Excel'],
    githubUrl: 'https://github.com/MahmoudAboulSaud/Retail-Analytics-power-bi',
    demoUrl: 'https://github.com/MahmoudAboulSaud/Retail-Analytics-power-bi',
    featured: false,
    category: 'Power BI',
    createdAt: '2024-09-12',
  },
]

// ─── Default Skills ────────────────────────────────────────────────
export const DEFAULT_SKILLS = [
  { id: '1', name: 'Power BI', level: 92, category: 'BI Tools', icon: 'SiPowerbi', color: '#F2C811' },
  { id: '2', name: 'SQL', level: 90, category: 'Database', icon: 'SiPostgresql', color: '#336791' },
  { id: '3', name: 'Excel', level: 95, category: 'Analysis', icon: 'SiMicrosoftexcel', color: '#217346' },
  { id: '4', name: 'Python', level: 78, category: 'Programming', icon: 'SiPython', color: '#3776AB' },
  { id: '5', name: 'Tableau', level: 82, category: 'BI Tools', icon: 'SiTableau', color: '#E97627' },
  { id: '6', name: 'Data Warehouse', level: 80, category: 'Architecture', icon: 'FaDatabase', color: '#6366f1' },
  { id: '7', name: 'Statistics', level: 85, category: 'Analytics', icon: 'FaChartBar', color: '#d946ef' },
  { id: '8', name: 'Airflow', level: 70, category: 'Data Engineering', icon: 'SiApacheairflow', color: '#017CEE' },
  { id: '9', name: 'Prompt Engineering', level: 88, category: 'AI', icon: 'FaBrain', color: '#10b981' },
]

// ─── Default Profile ────────────────────────────────────────────────
export const DEFAULT_PROFILE = {
  name: 'Mahmoud AboulSaud',
  title: 'Data Analyst & BI Specialist',
  quote: 'Be strong, for life crushes the weak.',
  about: `Passionate Data Analyst and Business Intelligence Specialist with a strong foundation in transforming complex datasets into actionable insights. I specialize in building end-to-end BI solutions, from data warehousing and SQL optimization to interactive Power BI dashboards and predictive analytics with Python.

My expertise spans the full analytics stack — data extraction, transformation, modeling, and visualization — enabling businesses to make smarter, data-driven decisions. I thrive on uncovering hidden patterns in data and building tools that put intelligence at decision-makers' fingertips.

Currently advancing my skills in data engineering with Airflow, machine learning, and AI prompt engineering to stay at the forefront of the data industry.`,
  phone: '01207169283',
  address: 'El Minya, Egypt',
  email: 'mahmoudaboulSaud@gmail.com',
  linkedin: 'https://linkedin.com/in/mahmoud-aboulSaud',
  github: 'https://github.com/MahmoudAboulSaud',
  profileImage: '',
}

// ─── Diploma Courses ────────────────────────────────────────────────
export const DIPLOMA_COURSES = [
  { id: '1', name: 'Microsoft Excel', description: 'Advanced Excel for data analysis, pivot tables, and automation', icon: 'SiMicrosoftexcel', color: '#217346', duration: '4 weeks' },
  { id: '2', name: 'DB Fundamentals & SQL', description: 'Database design, normalization, and SQL query optimization', icon: 'FaDatabase', color: '#336791', duration: '6 weeks' },
  { id: '3', name: 'Data Warehouse', description: 'Dimensional modeling, ETL processes, and data warehouse architecture', icon: 'FaServer', color: '#6366f1', duration: '5 weeks' },
  { id: '4', name: 'Microsoft Power BI', description: 'DAX, data modeling, interactive dashboards, and report sharing', icon: 'SiPowerbi', color: '#F2C811', duration: '8 weeks' },
  { id: '5', name: 'Python', description: 'Python for data analysis with Pandas, NumPy, and Matplotlib', icon: 'SiPython', color: '#3776AB', duration: '10 weeks' },
  { id: '6', name: 'Tableau', description: 'Data visualization and storytelling with Tableau Desktop', icon: 'SiTableau', color: '#E97627', duration: '6 weeks' },
  { id: '7', name: 'Statistics', description: 'Descriptive statistics, hypothesis testing, and probability theory', icon: 'FaChartLine', color: '#d946ef', duration: '6 weeks' },
  { id: '8', name: 'Advanced Topics', description: 'Machine learning fundamentals, predictive analytics, and AI integration', icon: 'FaBrain', color: '#10b981', duration: '8 weeks' },
  { id: '9', name: 'Airflow', description: 'Data pipeline orchestration and workflow automation with Apache Airflow', icon: 'SiApacheairflow', color: '#017CEE', duration: '4 weeks' },
  { id: '10', name: 'Prompt Engineering', description: 'AI prompt design, LLM integration, and intelligent automation', icon: 'FaRobot', color: '#f59e0b', duration: '3 weeks' },
]

// ─── Experience Timeline ────────────────────────────────────────────
export const EXPERIENCE_TIMELINE = [
  {
    id: '1',
    year: '2023',
    title: 'Data Analytics Learning Journey',
    company: 'Self-Directed Learning',
    description: 'Began intensive study of data analytics fundamentals including Excel, statistics, and SQL. Completed structured curriculum covering data analysis concepts and business intelligence foundations.',
    skills: ['Excel', 'Statistics', 'SQL Basics'],
    type: 'education',
  },
  {
    id: '2',
    year: '2024 Q1',
    title: 'SQL & Database Development',
    company: 'Route Academy BI Diploma',
    description: 'Mastered advanced SQL query optimization, database design, and data warehouse concepts. Built multiple ETL pipelines and designed dimensional models for analytical workloads.',
    skills: ['SQL Server', 'Data Warehouse', 'ETL', 'DB Design'],
    type: 'milestone',
  },
  {
    id: '3',
    year: '2024 Q2',
    title: 'Power BI Development',
    company: 'Route Academy BI Diploma',
    description: 'Developed expertise in Microsoft Power BI — from data modeling and DAX formulas to building enterprise-grade interactive dashboards and reports for business stakeholders.',
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Dashboards'],
    type: 'milestone',
  },
  {
    id: '4',
    year: '2024 Q3',
    title: 'Python & Machine Learning',
    company: 'Route Academy BI Diploma',
    description: 'Applied Python for advanced data analysis, statistical modeling, and machine learning. Built predictive models for customer churn and sales forecasting using Scikit-learn.',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Forecasting'],
    type: 'milestone',
  },
  {
    id: '5',
    year: '2024 Q4',
    title: 'BI Project Portfolio',
    company: 'Independent Projects',
    description: 'Delivered 5+ end-to-end BI projects covering supply chain analytics, sales performance, retail intelligence, and customer retention — all published on GitHub.',
    skills: ['Power BI', 'SQL', 'Python', 'Tableau'],
    type: 'achievement',
  },
  {
    id: '6',
    year: '2025',
    title: 'Data Engineering & AI',
    company: 'Continuous Learning',
    description: 'Expanding expertise into data engineering with Apache Airflow for pipeline orchestration, and AI prompt engineering for intelligent automation and LLM integration in analytics workflows.',
    skills: ['Airflow', 'Prompt Engineering', 'Data Pipelines', 'LLM'],
    type: 'current',
  },
]

// ─── Storage Helpers ────────────────────────────────────────────────
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Storage error:', e)
    }
  },
  remove: (key) => {
    localStorage.removeItem(key)
  },
}

export { STORAGE_KEYS }
