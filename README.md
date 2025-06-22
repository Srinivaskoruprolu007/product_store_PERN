# Product Store (PERN Stack)

A modern, full-stack product management application built with React, Express, Neon/Postgres, and Node.js. This project demonstrates best practices for scalable, secure, and maintainable web development.

---

## 🚀 Features

- **Product CRUD**: Create, Read, Update, and Delete products with image, name, and price.
- **Responsive UI**: Beautiful, mobile-friendly interface using Tailwind CSS and DaisyUI.
- **Live Theme Switching**: Choose from 30+ color themes with instant preview.
- **Optimistic UI**: Instant feedback for product actions with toast notifications.
- **API Rate Limiting & Bot Protection**: Secured with Arcjet middleware.
- **PostgreSQL Database**: Serverless Neon database for fast, reliable storage.
- **RESTful API**: Clean, versioned endpoints for easy integration.
- **ESLint & Prettier**: Enforced code quality and consistent style.
- **Hot Reloading**: Fast development with Vite and React Fast Refresh.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite** (build tool)
- **Zustand** (state management)
- **React Router v7**
- **Tailwind CSS** & **DaisyUI** (UI framework)
- **Lucide React** (icons)
- **Axios** (HTTP client)
- **React Hot Toast** (notifications)

### Backend
- **Node.js 22**
- **Express 5**
- **@neondatabase/serverless** (Postgres client)
- **Arcjet** (security middleware)
- **Helmet** (security headers)
- **Morgan** (logging)
- **CORS** (cross-origin resource sharing)
- **dotenv** (environment variables)

### Database
- **Neon (PostgreSQL serverless)**

---

## 📁 Project Structure

```
product_store/
├── backend/
│   ├── config/           # DB config
│   ├── controllers/      # Express route controllers
│   ├── lib/              # Arcjet security config
│   ├── routes/           # Express routers
│   ├── seed/             # DB seeding scripts
│   └── server.js         # Main Express server
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── constants/    # Theme and config constants
│   │   ├── pages/        # Page-level React components
│   │   ├── store/        # Zustand stores
│   │   └── App.jsx       # Main app entry
│   ├── index.html        # HTML entry
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite config
├── package.json          # Root scripts & backend deps
└── README.md             # Project documentation
```

---

## 📝 API Endpoints

### Base URL: `/api/products`

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/`              | List all products          |
| POST   | `/`              | Create a new product       |
| GET    | `/:id`           | Get a single product       |
| PUT    | `/:id`           | Update a product           |
| DELETE | `/:id`           | Delete a product           |

All endpoints return JSON with `{ success, data, error }`.

---

## 🧑‍💻 Best Practices & Patterns

- **Separation of Concerns**: Clear split between backend (API, DB) and frontend (UI, state).
- **Environment Variables**: Sensitive config in `.env` (never committed).
- **Async/Await**: All async code uses modern async/await for clarity.
- **Error Handling**: Consistent error responses and user feedback.
- **Security**: Helmet, CORS, and Arcjet for robust protection.
- **Code Quality**: ESLint, Prettier, and strict lint rules.
- **Reusable Components**: DRY React components and Zustand stores.
- **Responsive Design**: Mobile-first, accessible UI.
- **Modern Tooling**: Vite, hot reload, and modular structure.

---

## 🏁 Getting Started

### Prerequisites
- Node.js 22+
- Yarn or npm
- Neon/Postgres database (or local Postgres)

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/product_store.git
cd product_store
# Install backend deps
npm install
# Install frontend deps
cd frontend && npm install
```

### 2. Configure Environment
Create a `.env` file in `/backend`:
```
PGHOST=your-neon-host
PGDATABASE=your-db
PGUSER=your-user
PGPASSWORD=your-password
ARCJET_KEY=your-arcjet-key
```

### 3. Seed the Database
```bash
cd backend
node seed/products.js
```

### 4. Run the Backend
```bash
npm run dev
# or
npm start
```

### 5. Run the Frontend
```bash
cd frontend
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or Vite's port) to use the app.

---

## 🧩 Extending & Customizing
- Add more product fields (description, category, etc.)
- Integrate authentication (JWT, OAuth)
- Add pagination, search, or filtering
- Deploy to Vercel, Netlify, or your favorite cloud
- Write tests (Jest, React Testing Library)

---

## 🤝 Contributing
Pull requests and issues are welcome! Please follow the code style and open an issue for major changes.

---

## 📄 License
MIT

---

## 🙏 Acknowledgements
- [Neon](https://neon.tech/) for serverless Postgres
- [Arcjet](https://arcjet.com/) for security
- [Vite](https://vitejs.dev/) for lightning-fast dev
- [DaisyUI](https://daisyui.com/) for beautiful UI themes

---

> Built with ❤️ by a passionate full stack developer.
