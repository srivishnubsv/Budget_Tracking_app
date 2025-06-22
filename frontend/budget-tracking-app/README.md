# Budget Tracking App

This project is a Budget Tracking application built with React and Vite. It provides a user-friendly interface for managing income and expenses, along with authentication features for users to log in and sign up.

## Features

- **User Authentication**: Users can log in and sign up to access their budget data.
- **Dashboard**: A central hub for users to view their income and expenses.
- **Responsive Design**: The application is designed to be responsive and user-friendly on various devices.
- **Toast Notifications**: Users receive feedback through toast messages for actions like login success or errors.
- **API Integration**: The app communicates with a backend API for user authentication and data management.

## Project Structure

```
budget-tracking-app
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Layout.jsx
│   │   └── ToastProvider.jsx
│   ├── context
│   │   └── AuthContext.jsx
│   ├── hooks
│   │   └── useAuth.js
│   ├── pages
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── Dashboard
│   │   │   ├── Expense.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Income.jsx
│   │   └── NotFound.jsx
│   └── utils
│       ├── apiPaths.js
│       ├── api.js
│       └── helper.js
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd budget-tracking-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Usage

- Navigate to the application in your browser (usually at `http://localhost:3000`).
- Use the Login or SignUp pages to create an account or log in.
- Access the Dashboard to view and manage your income and expenses.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.