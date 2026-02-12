# Ascendra 🚀
**The Ultimate Job Application tracker & AI-Powered Career Optimizer.**

Ascendra is a modern web application designed to help job seekers track their applications, analyze their resumes against job descriptions using Google's Gemini AI, and visualize their career progression through advanced analytics.

---

## ✨ Core Features

### 👔 AI Resume Analysis
- **Smart Matching**: Compares your resume with specific job roles and company requirements.
- **Match Score**: Get a real-time percentage matching score (0-100%).
- **Skill Gap Detection**: Automatically identifies missing technical and soft skills.
- **Action Plan**: Provides actionable steps to improve your profile and resume.
- **Company Fit**: Analysis of how your profile aligns with specific company cultures (e.g., Google, Amazon, TCS).

### 📄 Professional PDF Exports
- **One-Click Reports**: Generate high-quality, professional PDF reports of your AI analysis.
- **Advanced Layout**: Clean, single-page, full-length reports optimized for reading.
- **Modern Rendering**: Uses `html-to-image` for pixel-perfect capture, supporting modern CSS features like OKLCH and Glassmorphism.

### 📊 Advanced Analytics
- **Performance Funnel**: Visualize your application journey from "Applied" to "Offer".
- **Resume Version Tracking**: Compare different resume versions to see which one gets the most interviews.
- **Success Metrics**: Interactive charts for interview rates, offer rates, and overall job search health.
- **Executive Summary**: High-level metrics at a glance for quick progress tracking.

### 📋 Application Management
- **Centralized Tracker**: Manage all your job applications in one place.
- **Status Updates**: Track progress from Applied -> Interview -> Offer/Reject.
- **Clean UI**: Minimalist, glassmorphism-inspired design for a focused experience.

---

## 🛠️ Technology Stack

### Frontend
- **React.js & Vite** (Core Framework)
- **Tailwind CSS 4** (Styling & Modern UI)
- **Lucide React** (Iconography)
- **Recharts** (Data Visualization)
- **html-to-image & jsPDF** (PDF Generation)
- **Axios** (API Requests)

### Backend
- **Spring Boot 3** (Java Framework)
- **Google Gemini API** (AI Analysis Engine)
- **PostgreSQL** (Database)
- **Spring Data JPA** (Data Persistence)
- **Lombok** (Boilerplate reduction)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Java JDK** (17+)
- **Maven** (3.8+)
- **PostgreSQL**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanrach0178/Ascendra.git
   cd Ascendra
   ```

2. **Backend Setup**
   - Configure your database in `backend/src/main/resources/application.properties`.
   - Add your Gemini API Key: `gemini.api.key=YOUR_KEY_HERE`.
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 📸 Preview
*(Screenshots coming soon)*

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
