# 🛍️ ShopAdmin – Product Dashboard & Cart System

A modern and responsive Product Dashboard and Shopping Cart Web Application built using React.js. This project was developed as part of a React Machine Test.

## 🌐 Live Demo

**Live Website:** https://react-product-exam.vercel.app/

**GitHub Repository:** https://github.com/sayan8988/React-Product-Exam

## 📌 Project Overview

ShopAdmin is a React-based product management and shopping cart application that allows users to browse products, search and filter items, manage their shopping cart, complete checkout, and view their order history.

The application provides an interactive dashboard with product statistics, cart information, order details, and recent activity.

## ✨ Features

### 🔐 Login System
- Email and password validation.
- Email format validation.
- Minimum 6-character password validation.
- Login status management using Local Storage.
- Protected application routes.

### 📊 Dashboard
- Overview of total products.
- Cart item summary.
- Total cart value.
- Total orders.
- Recent activity tracking.
- Product search functionality.

### 🛒 Product Management
- Fetch products from DummyJSON API.
- Display product images, names, categories, prices, ratings, and stock.
- Search products by name.
- Filter products by category.
- Sort products by price.
- Add products to cart.
- View individual product details.

### 🧺 Shopping Cart
- Add and remove products.
- Increase or decrease product quantities.
- Automatic subtotal calculation.
- Discount calculation.
- Tax calculation.
- Final payable amount.

### 💳 Checkout System
- Customer information form.
- Form validation.
- Order summary.
- Place order functionality.
- Order confirmation.
- Cart automatically clears after successful checkout.

### 📦 Order Management
- View previous orders.
- Display order ID, customer details, date, amount, and status.
- View individual order details.

### 👤 Profile
- Display user email.
- Profile page navigation.
- Logout functionality.

## 🛠️ Technologies Used

- **Frontend:** React.js
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Styling:** CSS3
- **API:** DummyJSON Products API
- **Storage:** Browser Local Storage
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

## 📁 Project Structure

```text
React-Product-Exam/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   └── Profile.jsx
│   │
│   ├── utils/
│   │   └── activity.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── index.html
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone https://github.com/sayan8988/React-Product-Exam.git
```

**2. Navigate to the project directory**

```bash
cd React-Product-Exam
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🏗️ Build for Production

To create a production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 💾 Data Storage

The application uses browser Local Storage to maintain:
- Login state.
- Shopping cart data.
- Order information.
- Recent activity.

Product information is retrieved from the DummyJSON Products API.

**Note:** This is a frontend machine test project. Authentication and application data are managed on the client side; no backend authentication or database is implemented.

## 👨‍💻 Developer

**Sayan Das**

GitHub: https://github.com/sayan8988

## 📄 License

This project was developed for educational and machine test purposes.
