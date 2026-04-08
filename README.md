# 🎲 TableTalk

**DISCLAIMER**
This application is made to **practice HCI fundamentals as a final project for CPSC 481.** To demonstrate most features within the time-frame, stubs are introduced to "fake" certain functionalities. There is no back-end or database that interacts with our application.

Welcome to **TableTalk**, a social-first platform designed to make board game nights more interactive, organized, and fun! Whether you're into deep strategy games or lighthearted party play, TableTalk makes scheduling, chatting, and tracking games with your friends digital!

**You can view our deployed Website Here:** 

https://aemyst.github.io/TableTalk/#/

**Important Notes and Step on how to use our platform:**

- You must log in using the following information
    - email: admin@example.com
    - password: admin123
- We suggest testing the following Features to gauge the UI:
    - Search Screen
      - Test Sorting, Test Filtering, Test Search (No specific requirements, it is at your leisure)
    - Blog Screen
      - Test Search, Test Sorting
      - Add a new Blog Post
      - View an existing Blog Post
        - Like a blog post
        - Reply to a blog post
      - Matchmaking Screen
        - Test "Tinder" Style Matchmaking
          - Click the Heart to send a Friend Request to JupiterSmurf
          - Click the "X" to move on from Vertigo
            - Now enter the "Friends" Tab and try adding Vertigo through the Search Area
      - Suggest Screen
        - Test All Filters (It is not necessary to select any)
      - Notifications Dropdown
        - Click the notification "ruinremind has sent you a message!"
          - send a message to him/her
      - Profile Screen
        - Test all customizable fields (e.g., profile picture, username, email, etc)
        - Go to the board Games Tab on the left
          - Add a new board game to your database 
            - Type Chess First
            - Then type another "unknown" or "niche" board game that may or may not exist in our database

  - While There are existing steps for every page, it is not necessary to test our UI. **The user is welcome to try anything they desire at their leisure!**
            
---

## 🚀 Getting Started

Follow these steps to run the TableTalk application locally on your machine.

### ✅ Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

### 🔧 Step-by-Step Instructions

1. **Clone the Repository**

   Open a terminal and run: 

   ```bash
   git clone https://github.com/aeMyst/TableTalk.git
   cd TableTalk                                        #NOTE you must VERIFY you are in the correct directory

2. **install all dependencies**

   In the same terminal:

   ```bash
   git clone https://github.com/aeMyst/TableTalk.git
   npm install

3. **Run the development Server**


   In the same terminal:
   ```bash
   npm run dev

4. **Open localhost Server to Browser of your Choice**

   In the same terminal, you will see the following. Click the Link that is attached to open our application:
   ```bash
   > tabletalk@0.0.0 dev
   > vite
      VITE v6.2.5  ready in 384 ms
      ➜  Local:   http://localhost:5173/TableTalk/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help

---

## 🧩 Features

- 🗨️ **Real-Time Chat** – Message your friends with a persistent chat system.
- 🃏 **Matchmaking System** – Swipe-style friend suggestions to build your board game crew.
- 🧙‍♂️ **User Profiles** – Customize your profile with tags, bios, and images.
- 📚 **Blog System** – Read and post game reviews, thoughts, or community content.
- 🎮 **Leaderboards** – Track top games and discover new ones through rankings.
- 📥 **Notification System** – Stay updated with alerts about messages and events.

---

## 🛠️ Tech Stack

| Tech        | Description                        |
|-------------|------------------------------------|
| React       | Frontend Framework (Vite + JSX)    |
| Node.js     | Backend runtime environment        |

---

## 📂 Project Structure
```
TableTalk/
├── assets/                        # Images and media used across the app
├── components/                    # Reusable UI components (e.g., modals, navbars, footers)                   
│   ├── Footer.css
│   ├── Footer.jsx
│   ├── Navbar.css
│   ├── Navbar.jsx
│   └── Modal/ ├── Modal.css
│              └── Modal.jsx
├── database/                      # Static mock data
│   ├── blogData.jsx
│   ├── gamesData.jsx
│   ├── userBoardGames.jsx
│   └── userData.jsx
│
├── elements/                      # Import UI elements (e.g., buttons, cards)
│    ├── card.css
│    ├── suButton.css
│    ├── tall-card.css
│    └── tinderCard.css
│
├── pages/                         # Main views/routes for the app + correlated CSS files
│   ├── About.css        
│   ├── About.jsx                  # About Us page
│   ├── Authentication.css  
│   ├── Authentication.jsx         # Login and Signup Page
│   ├── Blog.css
│   ├── Blog.jsx                   # Blog Page 
│   ├── Chat.css                  
│   ├── Contact.css
│   ├── Contact.jsx                # Contact Us Page
│   ├── gameDetails.css
│   ├── gameDetails.jsx            # Game Specific Page
│   ├── Home.css
│   ├── Home.jsx                   # Main Home Page (both landing & home)
│   ├── mainHome.css
│   ├── newBlog.css                
│   ├── newBlog.jsx                # New Blog Creation Screen
│   ├── Posts.css
│   ├── Posts.jsx                  # View Post Screen
│   ├── Profile.css
│   ├── Profile.jsx                # Profile Screen
│   ├── Queue.css
│   ├── Queue.jsx                  # Matchmaking Screen
│   ├── QueueSearchResults.jsx
│   ├── Search.css                 
│   ├── Search.jsx                 # Search board game Screen
│   ├── Suggest.css
│   ├── Suggest.jsx                # Game Suggest Screen
│   ├── Vision.css
│   └── Vision.jsx                 # Our vision Screen
│
├── App.css                        # Main app CSS file
├── App.jsx                        # Main app component with route definitions
├── main.jsx                       # ReactDOM entry point
├── index.html                     # Entry HTML template
├── package.json                   # npm package config
├── tailwind.config.js             # TailwindCSS configuration
└── README.md                      # Project documentation
```
---

Made with ❤️ by Team TableTalk!
