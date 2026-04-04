# MindVault 🧠

> Your Personal Knowledge Universe — Save anything from the internet, AI automatically organizes, tags, and resurfaces it for you.

**Live Demo:** [second-brain-ps3j.onrender.com](https://second-brain-ps3j.onrender.com)
** Live video - https://www.youtube.com/watch?v=-WDwys7rSW4
---

## What is MindVault?

MindVault is a full-stack personal knowledge management app. Save URLs, text, images, and PDFs — AI automatically tags them, builds a knowledge graph, and helps you find anything through semantic search.

---

## Features

- **AI Auto-Tagging** — Groq AI automatically suggests tags and topics when you save an item
- **Semantic Search** — Search by meaning, not just keywords. Powered by vector embeddings
- **Knowledge Graph** — D3.js visualization showing connections between your saved items
- **Collections** — Organize items into folders
- **Memory Resurfacing** — Dashboard surfaces items you saved a while ago
- **Thumbnail Preview** — Automatic OG image / YouTube thumbnail fetching
- **Related Items** — Semantic similarity to show related content on item detail page
- **Browser Extension** — Save any webpage with one click from Chrome
- **Responsive UI** — Works on mobile and desktop

---

## Tech Stack

### Frontend
- React + Vite
- React Router DOM
- SCSS (feature-based architecture)
- D3.js (graph visualization)
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Redis (token blacklisting)
- JWT + HTTP-only Cookies (auth)
- Groq API (AI tagging)
- @xenova/transformers (local embeddings)
- open-graph-scraper (thumbnail fetching)

### Infrastructure
- Render (backend + frontend hosting)
- MongoDB Atlas (database)

---

## Project Structure

```
mindvault/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── public/          ← built frontend files
│   └── server.js
├── Frontend/
│   └── src/
│       ├── features/
│       │   ├── auth/
│       │   │   ├── pages/
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   ├── services/
│       │   │   └── auth.context.jsx
│       │   ├── items/
│       │   ├── collections/
│       │   ├── search/
│       │   ├── graph/
│       │   └── landing/
│       └── shared/
│           ├── components/
│           └── styles/
└── extension/
    ├── manifest.json
    ├── popup.html
    ├── popup.js
    └── styles.css
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key
- Redis instance

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
REDIS_URL=your_redis_url
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/get-me` | Get current user |

### Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/items` | Save new item |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get item by ID + related items |
| DELETE | `/api/items/:id` | Delete item |
| GET | `/api/items/resurface` | Get resurfaced items |

### Collections
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/collections` | Get all collections |
| POST | `/api/collections` | Create collection |
| DELETE | `/api/collections/:id` | Delete collection |
| POST | `/api/collections/:id/add-item` | Add item to collection |

### Search & Graph
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/search` | Semantic search |
| GET | `/api/graph` | Get graph data (nodes + edges) |

---

## Browser Extension

The Chrome extension lets you save any webpage with one click.

### Installation

1. Download the extension zip from the website or [here](https://raw.githubusercontent.com/yugant-singh/Second-Brain/main/extension.zip)
2. Extract the zip file
3. Open `chrome://extensions` in Chrome
4. Enable **Developer Mode** (top right)
5. Click **Load Unpacked** and select the extracted folder
6. Login with your MindVault account

### How it works

- Opens a popup with the current page's title and URL pre-filled
- Login once — token is saved locally
- Click "Save to MindVault" — item is saved with AI tags automatically

---

## Deployment

### Build Frontend

```bash
cd Frontend
npm run build
```

Copy `dist/` contents to `Backend/public/`

### Deploy to Render

1. Push to GitHub
2. Create a new **Web Service** on Render
3. Set Root Directory to `Backend`
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add environment variables from `.env`

---

## Architecture

### 4-Layer Frontend Architecture

```
Pages     → Assemble components, handle routing
Components → Reusable UI pieces
Hooks      → Business logic + API calls
Services   → Raw API calls (axios)
```

### How Semantic Search Works

Each saved item is converted into a 384-dimensional embedding vector using `all-MiniLM-L6-v2`. When you search, your query is also converted to a vector. Cosine similarity is calculated between the query and all item vectors — the closest matches are returned as results.

### How the Knowledge Graph Works

Items are nodes. If two items share common AI-generated tags, an edge is drawn between them. D3.js force simulation positions nodes naturally — related items cluster together.

---

## Screenshots

| Landing Page | Dashboard | Knowledge Graph |
|---|---|---|
| Animated star background, hero section | Item cards with thumbnails | D3.js force-directed graph |

---

## Author

**Yugant Singh** — [GitHub](https://github.com/yugant-singh)

---

## License

MIT
