# LearnLingo

LearnLingo is a modern web application for finding online language teachers. Users can browse teachers, filter them by language, student level, and lesson price, add favorite teachers, and book a trial lesson.

The project was built with **Next.js**, **TypeScript**, and **Firebase**, following a responsive design and modern frontend development practices.

---

## Live Demo

🔗https://learn-lingo-git-main-olenakolesniks-projects.vercel.app

---

## Repository

🔗 https://github.com/olenakolesnik/LearnLingo

---

## Features

- User registration and login with Firebase Authentication
- Persistent authentication state
- Browse teachers
- Load More pagination
- Filter teachers by:
  - Language
  - Student level
  - Price range
- Add and remove favorite teachers
- Private Favorites page
- Book trial lesson modal
- Responsive design
- Toast notifications
- Form validation
- Modern UI

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- CSS Modules

### State Management

- Zustand

### Backend

- Firebase Realtime Database
- Firebase Authentication

### Forms

- React Hook Form
- Yup

### UI

- Lucide React
- React Hot Toast

---

## Project Structure

```text
src
│
├── app
│
├── components
│
├── services
│
├── store
│
├── schemas
│
├── types
│
└── styles
```

---

## Pages

### Home

- Hero section
- Company advantages
- Navigation to Teachers page

### Teachers

- Teachers list
- Dynamic filters
- Pagination
- Read more
- Favorites
- Book trial lesson

### Favorites

Private page available only for authenticated users.

---

## Authentication

Implemented with Firebase Authentication.

Features:

- Registration
- Login
- Logout
- Current user
- Protected Favorites page

---

## Database

Firebase Realtime Database stores:

- Teachers
- User favorites

---

## Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile

---

## Design

Figma design provided in the task.

---

## Technical Requirements

Implemented according to the project requirements:

- Firebase Authentication
- Firebase Realtime Database
- Teachers filtering
- Pagination
- Favorites
- Private route
- Trial lesson booking
- Responsive layout
- Form validation
- Toast notifications

---

## Installation

Clone repository

```bash
git clone https://github.com/yourusername/learnlingo.git
```

Go to project folder

```bash
cd learnlingo
```

Install dependencies

```bash
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_DATABASE_URL=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=
```

Run development server

```bash
npm run dev
```

---

## Author

Olena
