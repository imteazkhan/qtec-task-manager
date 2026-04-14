# Task Manager - Laravel 12 + React

A modern task management system with Laravel 12 REST API and React frontend.

## Technologies
- **Backend**: Laravel 12, MySQL, PHPUnit
- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Testing**: PHPUnit (backend), React Testing Library (frontend)

## Setup Instructions

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
