# Jasper

A beginner-friendly e-commerce demo built with React, Vite, Redux Toolkit, React Router, and redux-persist. The design follows the supplied ShopKart reference PDF, with a mineral-inspired brand name: **Jasper**.

## Requirements
- Node.js 18 or newer
- npm

## Run in VS Code
1. Extract `Jasper.zip`.
2. Open the extracted `Jasper` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown in the terminal (usually `http://localhost:5173`).

To create a production build, run `npm run build`.

## Features
- Product list, product details, and cart routes
- Search, category filters, and price sorting
- Add-to-cart buttons and quantity steppers
- Cart persistence after refresh
- Shipping is free at $100 subtotal; otherwise $5
- Toast notifications for cart actions
- Light/dark theme toggle
- Responsive layout and loading/error/empty states

## Notes
- Product data and images come from Fake Store API.
- Checkout is a visual demo button only; no payment or real order is submitted.
- The app requires an internet connection to fetch product data and Google Fonts.
- If the API is temporarily unavailable, use **Try again** on the product page.
