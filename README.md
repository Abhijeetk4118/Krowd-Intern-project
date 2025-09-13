Sales & Revenue Dashboard
A comprehensive React TypeScript dashboard for tracking sales performance, comparing monthly sales with targets, and highlighting top-performing products and customers.

🚀 Features
Dashboard Layout
Top Section: KPIs (Total Revenue, Target Achievement %, Revenue Growth %)
Middle Section: Interactive Charts (Sales vs Target, Product Share)
Bottom Section: Data Tables (Top 5 Products, Top 5 Customers)

Key Metrics
Total Revenue: Sum of all sales revenue
Target Achievement: Performance vs target percentage
Revenue Growth: Month-over-month growth calculation
Charts & Visualizations
Line Chart: Monthly Sales vs Target comparison
Pie Chart: Product revenue share distribution
Bar Chart: Top 5 customers by revenue
Data Tables
Top 5 Products: Ranked by total revenue with units sold and market share
Top 5 Customers: Ranked by total revenue with order count and market share

🛠️ Tech Stack
Framework: React 18 with TypeScript
Styling: Tailwind CSS
Charts: Recharts library
Data: Local JSON mock data

📊 Data Structure
The dashboard uses comprehensive sales data including:
Date, Sales Representative, Client, Product
Units Sold, Revenue, Target
Automatic calculations for KPIs and rankings

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)
npm or yarn
Installation
Install dependencies:
npm install
Start the development server:
npm start
Open your browser and navigate to http://localhost:3000

Available Scripts
npm start - Runs the app in development mode
npm run build - Builds the app for production
npm run eject - Ejects from Create React App (one-way operation)

📁 Project Structure
src/
├── components/           # React components
│   ├── Dashboard.tsx     # Main dashboard component
│   ├── KPICard.tsx       # Individual KPI card
│   ├── KPISection.tsx    # KPI section container
│   ├── ChartsSection.tsx # Charts container
│   ├── TablesSection.tsx # Tables container
│   
├── data/                 # Mock data
│   └── mockData.json     # Sales data
├── types/                # TypeScript interfaces
│   └── index.ts          # Type definitions
├── utils/                # Utility functions
│   ├── calculations.ts   # Business logic
│  
├── App.tsx              # Main app component
├── App.css              # Global styles
├── index.tsx            # App entry point
└── index.css            # Base styles
🧪 Testing
The project includes comprehensive tests for:

Component rendering and behavior
Business logic calculations
Utility functions

🎨 Design Features
Responsive Design: Works on desktop, tablet, and mobile
Modern UI: Clean, professional interface with Tailwind CSS
Interactive Charts: Hover effects and tooltips
Color-coded Trends: Visual indicators for performance metrics
Accessible Tables: Sortable and readable data presentation

📈 Business Logic
Revenue Growth Calculation
Revenue Growth = (This Month - Last Month) ÷ Last Month × 100
Target Achievement
Target Achievement = (Actual Revenue ÷ Target Revenue) × 100
Product/Customer Rankings
Sorted by total revenue
Includes market share percentages
Shows additional metrics (units sold, order count)

🔧 Customization
The dashboard is highly customizable:

Modify src/data/mockData.json to use your own data
Update styling in Tailwind classes
Add new KPIs in src/utils/calculations.ts
Extend chart types in src/components/ChartsSection.tsx

📱 Responsive Breakpoints
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

🚀 Deployment
Build the production version:

npm run build
The build folder contains the optimized production build ready for deployment to any static hosting service.

📄 License
This project is open source and available under the MIT License.

🤝 Contributing
Fork the repository
Create a feature branch
Make your changes
Add tests for new functionality
Submit a pull request
