# 📊 Sales Dashboard — Pipeline Analytics

> A powerful, CSV-driven sales intelligence dashboard built for Pipedrive CRM data — visualize deals, track pipeline stages, and benchmark salesperson performance in real time.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://kishore-p-sales-dashboard.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 🚀 Live Demo

🌐 **[kishore-p-sales-dashboard.vercel.app](https://kishore-p-sales-dashboard.vercel.app/)**

---

## 📸 Preview

> Upload your Pipedrive CRM CSV export and instantly get actionable analytics — no backend, no setup, just results.

---

## ✨ Features

- 📁 **CSV Upload & Parsing** — Drag-and-drop or browse to upload Pipedrive CRM exports; data is parsed and visualized instantly
- 🏗️ **Pipeline Stage Visualization** — See deals distributed across every stage of your sales funnel
- 👥 **Salesperson Performance Tracking** — Compare reps by deal count, value, and win rate at a glance
- 💰 Deal Value Analytics— Aggregate and breakdown deal values across stages, owners, and time periods
- 📈 **Interactive Charts** — Responsive charts with hover tooltips and dynamic filtering
- ⚡ **Client-Side Only** — All processing happens in the browser; your data never leaves your machine
- 📱 **Responsive Design** — Fully optimized for desktop and mobile viewports

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts / Chart.js |
| CSV Parsing | PapaParse |
| Deployment | Vercel |

---

## 📂 Project Structure

```
sales-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Dashboard entry point
│   └── globals.css         # Global styles
├── components/
│   ├── FileUpload.tsx       # CSV drag-and-drop uploader
│   ├── PipelineChart.tsx    # Stage-wise funnel visualization
│   ├── SalespersonTable.tsx # Rep performance breakdown
│   ├── DealValueCard.tsx    # KPI summary cards
│   └── FilterBar.tsx        # Dynamic filters (stage, rep, date)
├── lib/
│   ├── parseCSV.ts          # PapaParse wrapper & data normalization
│   └── analytics.ts         # Aggregation & metric computation
├── types/
│   └── deal.ts              # TypeScript interfaces for Pipedrive data
├── public/
│   └── sample.csv           # Sample Pipedrive export for demo
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/kishore-p/sales-dashboard.git
cd sales-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📋 Usage

1. **Export your data** — From Pipedrive CRM, export your deals as a `.csv` file
2. **Upload the CSV** — Drag and drop the file onto the dashboard upload zone
3. **Explore analytics** — Pipeline stages, deal values, and rep performance populate automatically
4. **Filter & drill down** — Use the filter bar to slice by stage, salesperson, or date range

### Supported CSV Format

The dashboard expects a standard Pipedrive deals export with columns such as:

| Column | Description |
|---|---|
| `Title` | Deal name |
| `Stage` | Current pipeline stage |
| `Owner` | Assigned salesperson |
| `Value` | Deal value (numeric) |
| `Currency` | Deal currency |
| `Status` | `open`, `won`, `lost` |
| `Expected close date` | Forecasted close date |
| `Add time` | Deal creation timestamp |

> 💡 A sample CSV is included at `public/sample.csv` for quick exploration.

---

## 📊 Dashboard Metrics

| Metric | Description |
|---|---|
| **Total Pipeline Value** | Sum of all open deal values |
| **Won Deals** | Count and value of closed-won deals |
| **Win Rate** | Won deals ÷ total closed deals |
| **Avg Deal Size** | Mean value across all deals |
| **Stage Distribution** | Deal count and value per pipeline stage |
| **Rep Leaderboard** | Per-salesperson deal count, value, and win rate |

---

## 🧠 How It Works

```
CSV Upload
    │
    ▼
PapaParse (client-side parsing)
    │
    ▼
Data Normalization (lib/parseCSV.ts)
    │
    ▼
Metric Aggregation (lib/analytics.ts)
    │
    ▼
React State → Chart Components → Rendered Dashboard
```

All computation is done **entirely in the browser** — zero API calls, zero data transmission.

---

## 🚀 Deployment

This project is deployed on **Vercel** with zero-config Next.js support.

To deploy your own instance:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic CI/CD on every push.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Kishore P**
- 🌐 Portfolio: [kishore-p-sales-dashboard.vercel.app](https://kishore-p-sales-dashboard.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/kishore-p](https://linkedin.com/in/kishore-p)
- 🐙 GitHub: [@kishore-p](https://github.com/kishore-p)

---

<p align="center">
  Built with ❤️ by Kishore P &nbsp;|&nbsp; Powered by Next.js & Vercel
</p>
