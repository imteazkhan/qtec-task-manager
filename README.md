# Task Manager - Laravel 12 + React

A modern task management system with Laravel 12 REST API and React frontend.

## Technologies
- **Backend**: Laravel 12, MySQL, PHPUnit
- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Testing**: PHPUnit (backend), React Testing Library (frontend)

## Setup Instructions

=======================
### Backend Setup
```bash
git clone <repo-url>
cd task-manager-api
composer install
cp .env.example .env
# Configure database in .env
php artisan key:generate
php artisan migrate
php artisan serve
=======================
### Frontend Setup
cd frontend
npm install
npm run dev
=======================
###API Endpoints
GET /api/tasks - List all tasks
POST /api/tasks - Create new task
GET /api/tasks/{id} - Get single task
PUT /api/tasks/{id} - Update task
DELETE /api/tasks/{id} - Delete task
============================
###Features
> Create, Read, Update, Delete tasks
> Task status tracking (pending/in_progress/completed)
> Responsive design with Tailwind CSS
> Real-time updates without page refresh
> Form validation & error handling
> Toast notifications for user feedback
