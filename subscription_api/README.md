

# 📬 Subscription Tracker API

A backend API that helps users **track their subscriptions and receive email reminders before renewal dates**.

This system allows users to:

* Create subscriptions
* Receive reminder emails before renewal
* Update subscription details
* Cancel subscriptions
* Delete subscriptions permanently

The API is designed for learning **backend development, email automation, and REST API design**.

---

# 🚀 Features

* 🔐 User authentication (JWT)
* 📦 Create and manage subscriptions
* 📧 Email reminders before renewal dates
* 📅 Track upcoming renewals
* ❌ Cancel subscriptions without deleting
* 🗑️ Delete subscriptions permanently
* ⚡ Automated reminder scheduling
* 📬 Email notifications using Nodemailer

---

# 🛠 Tech Stack

| Technology        | Purpose               |
| ----------------- | --------------------- |
| Node.js           | Backend runtime       |
| Express.js        | API framework         |
| MongoDB           | Database              |
| Mongoose          | ODM for MongoDB       |
| Nodemailer        | Email sending         |
| JWT               | Authentication        |
| Upstash Workflows | Background scheduling |

---

# 📂 Project Structure

subscription_api/

config/
└── nodemailer.js

controllers/
└── subscriptionController.js

models/
└── Subscription.js

routes/
└── subscriptionRoutes.js

utils/
└── sendEmail.js

middleware/
└── authMiddleware.js

server.js
README.md

---

# ⚙️ Installation

## 1️⃣ Clone the repository

git clone https://github.com/DukeMochama2022/backend/tree/main/subscription_api

cd subscription_api

---

## 2️⃣ Install dependencies

npm install

---

## 3️⃣ Create `.env` file

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

EMAIL_USER=[your_email@gmail.com](mailto:your_email@gmail.com)

EMAIL_PASS=your_app_password

---

# ▶️ Run the Server

npm run dev

or

node server.js

Server runs at:

http://localhost:5000

---

# 📌 API Endpoints

## 📦 Subscriptions

---

## Create Subscription

POST /api/subscriptions

Example Body

{
"name": "Netflix",
"price": 15,
"renewalDate": "2026-04-03",
"category": "Entertainment"
}

---

## Get All Subscriptions

GET /api/subscriptions

Returns all subscriptions for the logged-in user.

---



## Update Subscription

PUT /api/subscriptions/update/:id

Example Body

{
"price": 20
}

---

## Cancel Subscription

PUT /api/subscriptions/:id/cancel

This marks the subscription as **cancelled** without deleting it.

---



# 📧 Email Reminder System

The API automatically sends **reminder emails before subscription renewal**.

Example Email:

Hello John,

Your Netflix subscription will renew on April 3rd.

Price: $15

Please renew or cancel before the renewal date.

Emails are sent using **Gmail SMTP with Nodemailer**.

---

# 🔐 Authentication

All subscription routes require **JWT authentication**.

Example header:

Authorization: Bearer your_token_here

---

# 🧪 API Testing (Postman)

You can test the API using **Postman**.

Steps:

1. Start the server
2. Import the API endpoints
3. Add JWT token in Authorization header
4. Send requests

Example Authorization header:

Authorization: Bearer your_token_here

---



# 🏗️ System Architecture

Client (Postman / Frontend)

↓

Express.js API

↓

MongoDB Database

↓

Email Service (Nodemailer + Gmail SMTP)

↓

Reminder Scheduler

---

# 🧠 Future Improvements

Possible upgrades:

* 💳 Stripe payment tracking
* 📊 Subscription analytics dashboard
* 📱 SMS reminders
* 🌐 Frontend dashboard (React)
* 🐳 Docker deployment
* ☁️ Cloud hosting (Render / AWS)

---

# 👨‍💻 Author

Duke Mochama

Software Developer

📧 Email: [dukemochama21@gmail.com](mailto:dukemochama21@gmail.com)

💼 LinkedIn: https://linkedin.com

---

# ⭐ Contributing

Contributions are welcome.

Steps:

1. Fork the project
2. Create a feature branch
3. Commit changes
4. Submit a pull request

---

# 📜 License

This project is licensed under the **MIT License**.

