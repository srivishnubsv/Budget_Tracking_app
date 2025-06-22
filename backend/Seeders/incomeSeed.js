// seedIncome.js
import fetch from "node-fetch";

const API_URL = "http://localhost:5000/api/v1/income/add";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODU3ODVmYTlmYzU2YzcxYTBiNmZhODgiLCJpYXQiOjE3NTA1NjY1ODIsImV4cCI6MTc1MTE3MTM4Mn0.cu1JQOc5jBldmAJul4VVyCMZVtYxrK34rD0-G0wlPg4";
const dummyIncome = [
  {
    icon: "💼",
    source: "Job Salary",
    amount: "60000",
    date: "2025-06-01",
    category: "Salary",
  },
  {
    icon: "🛍️",
    source: "Product Sales",
    amount: "12000",
    date: "2025-06-05",
    category: "Business",
  },
  {
    icon: "🧑‍💻",
    source: "Web Dev Project",
    amount: "8000",
    date: "2025-06-10",
    category: "Freelance",
  },
  {
    icon: "📈",
    source: "Stock Profit",
    amount: "15000",
    date: "2025-06-03",
    category: "Investments",
  },
  {
    icon: "🏠",
    source: "Apartment Rent",
    amount: "10000",
    date: "2025-06-08",
    category: "Rent",
  },
  {
    icon: "🎁",
    source: "Birthday Gift",
    amount: "3000",
    date: "2025-06-15",
    category: "Gift",
  },
  {
    icon: "❓",
    source: "Misc Income",
    amount: "2000",
    date: "2025-06-20",
    category: "Other",
  },
];

const seedIncome = async () => {
  for (const income of dummyIncome) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(income),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`✅ Income added: ${income.source}`);
      } else {
        console.error(`❌ Failed to add income: ${income.source}`, data);
      }
    } catch (err) {
      console.error(`❌ Error: ${income.source}`, err.message);
    }
  }

  console.log("🎉 Income seeding done");
};

seedIncome();
