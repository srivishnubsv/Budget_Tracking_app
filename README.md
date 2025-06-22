# Budget Tracker (Fin Tracker)

A modern, full-stack budget tracking application for managing your finances. Built with React (Vite), Node.js/Express, and MongoDB. Features robust authentication, CRUD for income/expenses, analytics, responsive UI, and easy deployment.

---

##  Features

- 🔒 User authentication (JWT)
- ➕ Add, view, and delete income and expenses
- 🏷️ Category and emoji icon selection
- 📊 Analytics dashboard with charts
- 👤 Profile management and password change
- 📱 Responsive, modern UI (mobile & desktop)
- ⬇️ Download data as Excel
- ☁️ Deployed backend (Render) & frontend (Vercel)

---

## 🧑‍💻 Sample Credentials

- **Email:** `admin@gmail.com`
- **Password:** `12345678`

Use these credentials to log in and view the app with demo data.

---

## 🗂️ Project Structure

```
backend/
  controllers/      # Express controllers (auth, dashboard, income, expense)
  middleware/       # Auth middleware
  models/           # Mongoose models (User, Income, Expense)
  routes/           # Express routes
  Seeders/          # Data seeder scripts
  server.js         # Main Express app
  .env              # Backend environment variables
frontend/
  public/           # Static assets (logo, favicon)
  src/
    components/     # Reusable UI components
    context/        # React context (Auth)
    pages/          # App pages (Dashboard, Income, Expense, Profile, Auth)
    slices/         # Redux slices
    utils/          # API, icons, categories
    App.jsx         # Main app
    main.jsx        # Entry point
  .env              # Frontend environment variables
  index.html        # HTML template
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (for production) or local MongoDB for development

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/Budget_Tracking_app.git
cd Budget_Tracking_app
```

### 2. Backend Setup

```sh
cd backend
cp .env.example .env   # Or create .env manually (see below)
npm install
```

Edit `.env` with your MongoDB URI and JWT secret:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```sh
npm start
```

### 3. Frontend Setup

```sh
cd ../frontend
cp .env.example .env   # Or create .env manually (see below)
npm install
```

Edit `.env` with your backend API URL:

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Start the frontend:

```sh
npm run dev
```

---

## 🤖 AI Tools Used

- **GitHub Copilot**: Code generation, refactoring, and UI/UX improvements
- **VS Code AI Extensions**: Code completion, error detection, and project setup

---

##  Deployment Steps

### Backend (Render)

1. Push your backend code to GitHub.
2. Create a new Web Service on [Render](https://render.com/).
3. Connect your GitHub repo and select the backend folder.
4. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
5. Set build/start command: `npm install && npm start`.
6. Deploy and note your backend URL (e.g., `https://your-backend.onrender.com`).

### Frontend (Vercel)

1. Push your frontend code to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your repo.
3. Set the project root to `frontend` if prompted.
4. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1`
5. Deploy. Your app will be live at `https://your-app.vercel.app`.

### SPA Routing (Vercel)

If using React Router, add `vercel.json` in `frontend/`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 🌱 Seeder Scripts & Token Setup

To add demo data, you need a valid JWT token for the admin user. You can obtain this token in two ways:

### 1. Using Postman

- Send a POST request to your backend `/api/v1/login` endpoint:
  - **URL:** `http://localhost:5000/api/v1/login`
  - **Body:**
    ```json
    {
      "email": "admin@gmail.com",
      "password": "12345678"
    }
    ```
- Copy the `token` from the response.

### 2. From Browser Local Storage

- Log in to the app in your browser.
- Open DevTools → Application/Storage → Local Storage.
- Find the `token` key and copy its value.

### 3. Run Seeder Scripts

Paste the token into the `TOKEN` variable in each seeder file (`backend/Seeders/incomeSeed.js` and `backend/Seeders/expenseSeeder.js`).

Then run:

```sh
cd backend
node Seeders/incomeSeed.js
node Seeders/expenseSeeder.js
```

---

## 📸 Screenshots

> _Add screenshots here for a more visual README!_

---

## 📝 License

MIT
