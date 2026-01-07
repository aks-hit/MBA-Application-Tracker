

# 🎓 MBA Application Tracker

A comprehensive, end-to-end **MBA admission workflow tracker** built with **React, Vite, and Tailwind CSS**.
Track every stage of your MBA applications — from form submission to final admission — with **deadline alerts, analytics, history logs, and CSV import/export**.

---

## 🚀 Live Features

### ✅ End-to-End MBA Workflow Tracking

Track every real admission stage:

* Form Open
* Applied
* Shortlisted
* PI (Interview)
* Result (Selected / Waitlisted / Rejected)
* Fee Payment
* Admission Confirmed

Each application progresses through a **strict, validated state machine** (no invalid transitions).

---

### ⏰ Smart Deadline Management

* Application deadline
* PI registration deadline
* Fee payment deadline
* Automatic urgency detection (≤ 7 days)
* Visual alerts to prevent missed deadlines

---

### 📊 Dashboard Analytics

Instant insights:

* Total applications
* Applied
* Shortlisted
* Offers received
* Rejected
* Completed admissions

---

### 🧾 CSV Import & Export

* Export all applications to CSV
* Import applications from CSV
* Useful for backups and offline planning

---

### 🕒 History Log (Audit Trail)

Every major action is tracked:

* Status changes
* Deadline updates
* Stage transitions

Ensures **full transparency and traceability**.

---

### 📱 Mobile-First Responsive UI

* Table layout for desktop
* Card layout for mobile
* Optimized for real-world usage

---

### 🔒 Data Safety

* Data stored in browser `localStorage`
* No backend required
* Privacy-friendly by design

---

## 🛠 Tech Stack

* **Frontend**: React (Vite)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **State**: React Hooks
* **Persistence**: localStorage
* **Build Tool**: Vite

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   ├─ MBATracker.jsx
 │   ├─ ApplicationForm.jsx
 │   ├─ ApplicationsTable.jsx
 │   ├─ Dashboard.jsx
 │   ├─ DeadlineAlerts.jsx
 │   ├─ ProgressBar.jsx
 │   └─ HistoryLog.jsx
 │
 ├─ data/
 │   └─ institute.js
 │
 ├─ utils/
 │   ├─ csv.js
 │   └─ helpers.js
 │
 ├─ main.jsx
 │
public/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/aks-hit/MBA-Application-Tracker.git
cd MBA-Application-Tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run locally

```bash
npm run dev
```

App will be available at:

```
http://localhost:5173
```


## 📈 Future Enhancements (Planned)

* Google Calendar integration for reminders
* Cloud sync (Firebase / Supabase)
* Multi-user login
* PDF export
* Dark mode
* AI-based deadline predictions

---

## 👤 Author

**Akshit Singh**
Computer Science Engineer
MBA Aspirant 

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## ⭐ Support

If this project helped you:

* ⭐ Star the repo
* 🐛 Open issues for improvements
* 🤝 Contribute enhancements

---

### 🎯 Built for real MBA aspirants.


