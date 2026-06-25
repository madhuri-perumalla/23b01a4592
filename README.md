# 📢 Campus Notifications System

## 📌 Overview

This project is a full-stack notification system built as part of a campus evaluation exercise.

It includes:
- Backend service for fetching and prioritizing notifications
- Frontend React dashboard for displaying notifications
- Reusable logging middleware for system observability

The system demonstrates:
- Priority-based data processing
- API integration
- Clean frontend architecture
- Modular logging system

---

## 🏗️ Tech Stack

### Backend
- Node.js (ES Modules)
- Fetch API
- Custom Logging Middleware

### Frontend
- React (Vite)
- Material UI
- Axios
- React Router DOM

### Shared
- Reusable Logging Middleware Package

---

## 📂 Project Structure

Campus-Evaluation-FE/
│
├── logging-middleware/
├── notification-app-be/
├── notification-app-fe/
└── README.md

---

## 🚀 Stage 1: Backend Notification Priority Engine

### 📌 Objective
Fetch notifications and display top 10 prioritized notifications.

---

### 📌 Priority Rules

| Type       | Priority |
|------------|----------|
| Placement  | 3 (Highest) |
| Result     | 2 |
| Event      | 1 (Lowest) |

If priority is same:
- Sort by most recent timestamp

---

### ⚙️ Stage 1 Flow

1. Fetch notifications from API  
2. Log lifecycle events using middleware  
3. Sort notifications by priority  
4. Apply timestamp sorting  
5. Extract top 10 notifications  

---

### 🔌 API Endpoint

GET http://4.224.186.213/evaluation-service/notifications

---

### 🔐 Authentication Flow

POST /register → generates clientID & clientSecret  
POST /auth → generates access_token  

---

## 💻 Stage 2: Frontend Dashboard

### 📌 Objective
Build a responsive React UI to display notifications.

---

### 📌 Features

- React (Vite) application
- Material UI based design system
- Two main views:
  - All Notifications
  - Priority Notifications
- API integration using Axios
- Custom hooks for state management
- Clean component-based architecture

---

### 📌 Pages

#### 1. All Notifications Page
Displays all notifications from API.

#### 2. Priority Notifications Page
Displays top 10 prioritized notifications.

---

## 📊 Priority Algorithm

Placement > Result > Event

Tie-breaker:
Newest timestamp first

---

## 🧠 Key Design Decisions

- Separation of API, UI, and utility logic
- Reusable logging middleware integration
- Custom React hooks for API handling
- Modular and scalable folder structure
- Stateless UI components

---

## ⚙️ How to Run

### Backend

cd notification-app-be
node stage1/stage1.js

---

### Frontend

cd notification-app-fe
npm install
npm run dev

---

## ⚠️ Constraints Followed

- No console logging used (logging middleware only)
- Material UI used for frontend styling
- API-driven dynamic data
- Clean modular architecture maintained

---


