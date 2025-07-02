# 🕒 TICK-TRACK – Task Manager
<p align="center">
  <img src="src/assests/tt.svg" width="700" alt="Tick-Track UI Screenshot 1"/>
</p>

**TICK-TRACK** is a sleek and efficient task management web app that lets users organize their tasks using a drag-and-drop interface. Tasks are categorized into **Backlog**, **To Do**, **In Progress**, and **Completed** columns, helping streamline workflow visually.

🔥 Deleted tasks go out in style — via a **burning barrel** animation!




### 🖼️ UI Preview

<p align="center">
  <img src="src/assests/tick-track-web.png" width="700" alt="Tick-Track UI Screenshot 1"/>
</p>



---

## 🚀 Features

- 📌 Task categorization: Backlog, To Do, In Progress, Completed  
- 🖱️ Drag and drop tasks between columns  
- 🔥 Burn barrel animation for deleting tasks  
- 🔐 User authentication via Clerk  
- 🌐 Supabase for backend and real-time updates  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Auth:** Clerk  
- **Backend & Database:** Supabase  
- **State Management:** React Hooks  

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tick-track.git
cd tick-track
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4. Start the Development Server

```bash
npm run dev
```

---

## 📂 Folder Structure

```
tick-track/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── utils/
│   └── App.jsx
└── ...
```

---

## 🙌 Contribution

Feel free to fork and improve the project! Pull requests are welcome.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🔗 Links

- **Live Demo:** [your-live-url.com](https://your-live-url.com)  
- **GitHub Repo:** [github.com/your-username/tick-track](https://github.com/your-username/tick-track)
