# 🛍️ Glamora – E-Commerce Frontend Application
[Live Demo](https://glamora-frontend.vercel.app/)

## 📌 Project Overview

Glamora is a modern, full-featured e-commerce web application frontend that delivers a seamless online shopping experience for customers, vendors, and administrators.
The application is designed to be scalable, responsive, and user-friendly, enabling users to browse products, vendors to manage shops and inventories, and admins to monitor and control the platform.

This repository contains the frontend implementation, built with modern React-based technologies and integrated with a production-ready backend API.

# 🚀 Key Features
## 👤 Customer Features

Browse products from multiple vendor shops

Advanced filtering and searching (price, category, keyword)

Infinite scrolling for product listings

Product comparison (up to 3 products from the same category)

Add to cart with single-vendor restriction

Cart warning when mixing products from different vendors

Secure checkout with coupon support

Order history with pagination

Follow/unfollow vendor shops

Recent products (last 10 viewed items)

Leave reviews and ratings (only after purchase)

## 🏪 Vendor Features

Vendor shop creation and management

Add, edit, duplicate, and delete products

Inventory management

View shop-specific orders

View and respond to customer reviews

Paginated product and order lists

## 🛡️ Admin Features

Manage users (customers & vendors)

Suspend or delete accounts

Blacklist vendor shops

Manage product categories dynamically

Monitor transactions and platform activity

## 🌐 General Features

Fully responsive (mobile & desktop)

Secure authentication with JWT

Flash sale product display

Category-based navigation

Scalable pagination across all list-based pages

## 🧰 Technologies Used
- **Frontend**

React.js / Next.js

TypeScript (optional but used for better scalability)

Redux Toolkit / Context API (state management)

Axios (API communication)

Tailwind CSS / CSS Modules (styling)

JWT-based Authentication

Cloudinary (image handling)

# ⚙️ Project Local Setup (Frontend)
1️⃣ Clone the Repository
```
git clone https://github.com/your-username/glamora-frontend.git
cd glamora-frontend
```

2️⃣ Install Dependencies
```
npm install
# or
yarn install
```

3️⃣ Environment Variables Setup

- Create a .env.local file in the root of the project and add:

```
NEXT_PUBLIC_API_URL=Your Credentials

NEXT_PUBLIC_CLOUDINARY_PRESET=Your Credentials
NEXT_PUBLIC_CLOUDINARY_CLOUDNAME=Your Credentials

NEXT_PUBLIC_USER_EMAIL=rimeislam@gmail.com
NEXT_PUBLIC_USER_PASSWORD=12

NEXT_PUBLIC_ADMIN_EMAIL=rimeislam672@gmail.com
NEXT_PUBLIC_VENDOR_EMAIL=rimuislam36@gmail.com
```

## ⚠️ Note: These credentials are for demo/testing purposes only.

4️⃣ Run the Development Server
```
npm run dev
# or
yarn dev
```

The application will be available at:

```
http://localhost:3000
```

## 📦 Build for Production
```
npm run build
npm start
```

## 📊 Scalability & Performance

- Paginated APIs for all large datasets

- Optimized state management

- Lazy loading & infinite scrolling

- Optimized API requests

## 📄 License

- This project is created for learning and demonstration purposes.
You are free to use and modify it as needed.

## ✨ Author

Rime Islam
Frontend & Full-Stack Developer