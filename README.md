# Odoo-2025-Higher-Highs
This is Repository that contain Odoo hackathon project 

SELECTED PROBLEM : 1

# Skill Swap Platform 

Overview: 
Develop a Skill Swap Platform — a mini application that enables users to list their skills and 
request others in return 

## Features: 
Basic info: Name, location (optional), profile photo (optional) 
List of skills offered 
List of skills wanted 
Availability (e.g., weekends, evenings) 
User can make their profile public or private. 
Users can browse or search others by skill (e.g., “Photoshop” or “Excel”) 

## Request & Accept Swaps: 
○ Accept or reject swap offers 
○ Show current and pending swap requests 
Ratings or feedback after a swap 

## The user is also able to delete the swap request if it is not accepted. 
 
 Admin Role 
● Reject inappropriate or spammy skill descriptions. 
● Ban users who violate platform policies. 
● Monitor pending, accepted, or cancelled swaps. 
● Send platform-wide messages (e.g., feature updates, downtime alerts). 
● Download reports of user activity, feedback logs, and swap stats. 

Mockup - https://link.excalidraw.com/l/65VNwvy7c4X/8bM86GXnnUN



* Run **backend server** (Node.js + Express)
* Serve **frontend (HTML/CSS)** using a static server like `live-server` or `http-server`
* Do this from a **single terminal command**

---

## 🛠 Step-by-Step Setup

### 1. 📦 Install `concurrently` (in root folder)

```bash
npm install concurrently --save-dev
```

> If you don’t have a `package.json` at the root, run:

```bash
npm init -y
```

---

### 2. 📦 Install `http-server` (to serve frontend)

```bash
npm install http-server --save-dev
```

---

### 3. 🛠 Update `package.json` Scripts

At the root level (in `package.json`), add this under `"scripts"`:

```json
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "cd backend && node server.js",
  "client": "cd frontend && http-server -p 3000"
}
```

This will:

* Start backend from `backend/server.js` on default port (5000)
* Serve static frontend from `frontend/` on port **3000**

---

### 4. ▶️ Run both with one command

```bash
npm run start
```

You’ll see output from **both backend and frontend** in one terminal.

---



## 🧠 Bonus Tips

* You can use `live-server` instead of `http-server` if you want auto-reload:

```bash
npm install live-server --save-dev
```

Change `"client"` script:

```json
"client": "cd frontend && live-server"
```
