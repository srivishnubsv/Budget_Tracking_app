// seedExpense.js
import fetch from "node-fetch";

const API_URL = "http://localhost:5000/api/v1/expense/add";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODU3OTM1ZWZlYTFiN2IyYTIxMGUzMDIiLCJpYXQiOjE3NTA1Nzk3NzMsImV4cCI6MTc1MTE4NDU3M30.v3r74BwwEcdM22trXXPNF33HH3BZV-2ECVZGh5PC8FQ";

const dummyExpenses = [
  {
    icon: "🍽️",
    source: "Lunch at Cafe",
    purpose: "Lunch with colleagues",
    amount: "500",
    date: "2025-06-02",
    category: "Food",
  },
  {
    icon: "🚌",
    source: "Bus Pass",
    purpose: "Monthly travel pass",
    amount: "1200",
    date: "2025-06-04",
    category: "Transport",
  },
  {
    icon: "🏡",
    source: "Monthly Rent",
    purpose: "Apartment rent",
    amount: "15000",
    date: "2025-06-01",
    category: "Housing",
  },
  {
    icon: "💊",
    source: "Medicines",
    purpose: "Pharmacy visit",
    amount: "800",
    date: "2025-06-07",
    category: "Health",
  },
  {
    icon: "🎬",
    source: "Netflix",
    purpose: "Monthly subscription",
    amount: "500",
    date: "2025-06-09",
    category: "Entertainment",
  },
  {
    icon: "📚",
    source: "Online Course",
    purpose: "Frontend Bootcamp",
    amount: "3000",
    date: "2025-06-12",
    category: "Education",
  },
  {
    icon: "🔧",
    source: "Phone Repair",
    purpose: "Broken screen replacement",
    amount: "1200",
    date: "2025-06-18",
    category: "Other",
  },
];

const seedExpenses = async () => {
  for (const expense of dummyExpenses) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(expense),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`✅ Expense added: ${expense.source}`);
      } else {
        console.error(`❌ Failed to add expense: ${expense.source}`, data);
      }
    } catch (err) {
      console.error(`❌ Error: ${expense.source}`, err.message);
    }
  }

  console.log("🎉 Expense seeding done");
};

seedExpenses();
