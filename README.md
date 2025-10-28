# 🍽️ Restaurant & User App

A full-featured restaurant management and user interaction system designed for seamless dine-in and takeaway experiences. This app includes real-time analytics, chef configuration, table management, and a user-friendly ordering interface.

---

## 🚀 Access & Navigation

- **Restaurant Dashboard**: Accessible directly at `/` without login/signup.
- **User Home Page**: Also lands at `/`, displaying menu categories and items.

---

## 🧭 Restaurant Dashboard

### 🔝 Header
- Displays **company logo** (left-aligned).
- Includes a **search filter** that blurs all other items except the matched result.

### 🧩 Features
- **Drag & Drop**: Custom logic for reordering or assigning elements.

---

## 📊 Analytics Section

- **Chefs**: Fixed at 4.
- **Total Revenue**: Sum of all order revenues to date.
- **Total Orders**: Count of all orders placed.
- **Total Clients**: Unique clients identified by phone number.

---

## 📦 Orders Summary

### Filters
- Daily, Weekly, Monthly

### Metrics
- **Served**: Orders served to tables.
- **Dine In**: Total dine-in orders.
- **Takeaway**: Total takeaway orders.
- **Revenue**: Total earnings.

### Graph Options
- Daily, Weekly, Monthly, Yearly

### Tables View
- **Green**: Reserved table
- **White**: Unreserved table

---

## 👨‍🍳 Chef Configuration

- **Order Assignment**: Random if chefs have equal order count.
- **Orders Assignment**: Assign to chef with fewer orders.

---

## 🪑 Tables Section

- **Total Tables**: 30
- **Reserved Tables**: Cannot be deleted.
- **Booking Logic**: Based on number of persons.
- **Deletion Logic**: Reshuffles table numbers sequentially (1, 2, 3…).
- **Available Sizes**: 2, 4, 6, 8
- **Table Name**: Optional

---

## 🧾 Order Line

- **Order ID**: Must be unique.
- **Dine In Orders**: Show table number.
- **Takeaway Orders**: Show "Takeaway".
- **Number of Items**: Total items in the order.
- **Processing Time**: Countdown decreases on refresh (not real-time).
- **Order Done**: Automatically marked when processing ends.

---

## 🧑‍🍳 Menu Management

Each menu item includes:

```json
{
  "name": "",
  "description": "",
  "price": "",
  "averagePreparationTime": "",
  "category": "",
  "stock": ""
}
