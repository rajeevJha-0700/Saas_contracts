Saas Contracts
Saas Contracts is a cutting-edge contract management SaaS app built with React and styled with pure Tailwind CSS. It rocks a futuristic, sci-fi-inspired UI with neon gradients, glassmorphism, and glowing effects, delivering a premium experience. Manage contracts, view details, and upload files with a sleek, responsive design and mock API integration.

Features

Futuristic UI: Neon gradient background (from-blue-900 via-purple-900 to-pink-900), glassmorphism cards (bg-black/30, backdrop-blur-md), and glowing neon effects (text-cyan-400, hover:ring-cyan-500). 
Contract Management: Browse contracts (/dashboard), view metadata, clauses, AI insights, and evidence (/contract/:id). 
Upload Modal: Drag-and-drop or browse files (PDF, DOC, DOCX) with mock upload simulation. 
Responsive Design: Mobile sidebar toggle, adaptive layouts for search, filters, and grids. 
Authentication: Mock login with any username and password test123, Redux-based state management, and logout. 


Setup Instructions

Clone the Repository:
git clone https://github.com//rajeevJha-0700/Saas_contracts
cd Saas_contracts


Install Dependencies:Ensure Node.js (>=16.x) and npm (>=8.x) are installed, then run:
npm install


Set Up Mock API Data:Create public/contracts.json and public/contract-details.json:
// public/contracts.json
[
  {
    "id": "c1",
    "name": "MSA 2025",
    "parties": "Microsoft & ABC Corp",
    "expiry": "2025-12-31",
    "status": "Active",
    "risk": "Medium"
  },
  {
    "id": "c2",
    "name": "Network Services Agreement",
    "parties": "TelNet & ABC Corp",
    "expiry": "2025-10-10",
    "status": "Renewal Due",
    "risk": "High"
  }
]

// public/contract-details.json
[
  {
    "id": "c1",
    "name": "MSA 2025",
    "parties": "Microsoft & ABC Corp",
    "start": "2024-01-01",
    "expiry": "2025-12-31",
    "status": "Active",
    "risk": "Medium",
    "clauses": [
      {
        "title": "Payment Terms",
        "summary": "Payment due within 30 days of invoice.",
        "confidence": 0.95
      },
      {
        "title": "Termination Clause",
        "summary": "Either party may terminate with 60 days notice.",
        "confidence": 0.90
      }
    ],
    "insights": [
      {
        "risk": "Medium",
        "message": "Payment terms may pose cash flow risks."
      },
      {
        "risk": "Low",
        "message": "Termination clause is standard."
      }
    ],
    "evidence": [
      {
        "source": "Contract PDF",
        "snippet": "Payment due within 30 days of invoice issuance.",
        "relevance": 0.98
      }
    ]
  },
  {
    "id": "c2",
    "name": "Network Services Agreement",
    "parties": "TelNet & ABC Corp",
    "start": "2024-03-01",
    "expiry": "2025-10-10",
    "status": "Renewal Due",
    "risk": "High",
    "clauses": [
      {
        "title": "Service Level Agreement",
        "summary": "99.9% uptime guaranteed.",
        "confidence": 0.97
      }
    ],
    "insights": [
      {
        "risk": "High",
        "message": "Uptime guarantee may be challenging to meet."
      }
    ],
    "evidence": []
  }
]


Run the App:
npm run dev

Open http://localhost:5173 in your browser.

Login:Use any username and password test123 to access the dashboard. 



 Tech Stack Choices



Technology
Version
Why Chosen



React
18.2.0
Component-based architecture for reusable UI; fast rendering for dynamic features.


Tailwind CSS
3.4.1
Utility-first styling for rapid development; no custom CSS for maintainability.


Redux Toolkit
1.9.5
Simplified state management for authentication (login/logout, user data).


React Router
6.16.0
Client-side routing for seamless navigation (/, /dashboard, /contract/:id).


Axios
1.5.0
Clean API for HTTP requests to fetch mock data from JSON files.


React Hook Form
7.46.1
Efficient form handling for login with minimal re-renders and validation.


Vite
Latest
Fast development server and optimized production builds with hot module replacement.


PostCSS & Autoprefixer
8.4.31, 10.4.15
Ensures Tailwind compatibility and cross-browser CSS support.


Why Pure Tailwind?

Enables futuristic UI with utilities like bg-black/30, backdrop-blur-md, and text-cyan-400 without custom CSS.
Keeps codebase lightweight, avoiding tailwind.config.js for simplicity.


Assumptions Made

Mock API:
Static JSON files (contracts.json, contract-details.json) in public/ for data fetching, as no backend API was provided.
Assumed realistic data structure with metadata, clauses, insights, and evidence.


Authentication:
Mock login with any username and password test123 for demo purposes.
Stores mock JWT token in localStorage for session simulation.


UI Design:
Futuristic SaaS aesthetic with neon gradients, glassmorphism, and glowing effects to match user request for a premium look.
Pure Tailwind CSS utilities for consistency and maintainability.


Functionality:
Basic contract management: list, search, filter, view details, and upload with mock processing (80% success, 20% error).
Upload modal simulates file processing for realism.


Responsive Design:
Mobile-first with sidebar toggle for small screens, fixed sidebar for desktop.
Adaptive layouts for search, filters, grids, and modals.


Accessibility:
Minimal accessibility (clickable buttons, form labels) but not full ARIA compliance, as not explicitly requested.


Deployment:
Assumed Vercel/Netlify deployment with Vite’s dist output, including mock JSON files.




 Usage

Login: Use any username and password test123. 
Dashboard: Search, filter, paginate contracts, and open upload modal. 
Contract Details: View metadata, clauses, AI insights, and toggle evidence drawer. 
Upload Modal: Drag-and-drop or browse files (PDF, DOC, DOCX) with mock upload status. 



Deployment
Vercel

Install Vercel CLI:npm install -g vercel


Deploy:vercel


Configure:
Build command: npm run build
Publish directory: dist
Include public/contracts.json and public/contract-details.json.


 Testing

Visuals: Check neon gradient, glassmorphism, and glowing effects (text-cyan-400, hover:ring-cyan-500).
Functionality:
Login with test123 → Redirects to /dashboard.
Dashboard: Search, filter, paginate, upload, navigate to /contract/:id.
Contract Details: Metadata, clauses, insights, evidence drawer.
Upload Modal: Drag-and-drop, browse, mock upload statuses.


Responsive: Mobile (sidebar toggle, stacked layouts), desktop (fixed sidebar, grids).


 Troubleshooting

Tailwind Issues:
Verify src/index.css has only Tailwind directives.
Ensure postcss.config.js exists.
Run npm run build to check errors.


API Issues:
Confirm public/contracts.json and public/contract-details.json exist.
Check console for Axios errors.


UI Issues:
Ensure browser supports backdrop-blur-md (Chrome/Edge).
Verify transition-all duration-300 for animations.




 Next Steps

Add Signup.jsx for /signup route with matching futuristic UI.
Improve accessibility with ARIA labels and keyboard navigation.
Add animations for modal open/close.
Set up GitHub Actions for CI/CD.


 License
MIT License

Built with for a futuristic SaaS experienceReach out via GitHub issues for contributions or feedback!
