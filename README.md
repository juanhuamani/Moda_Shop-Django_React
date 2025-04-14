# E-Commerce Platform 🛍️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-%2361DAFB)](https://react.dev/)
[![Django](https://img.shields.io/badge/Django-4.2-brightgreen)](https://www.djangoproject.com/)

Modern e-commerce platform with a decoupled architecture featuring a React-based client and multi-backend support (Django & Node.js).

## Features ✨

### Client (React + TypeScript)
- ⚡ Vite-powered development environment
- 🔐 JWT-based authentication flow
- � Dynamic routing with React Router
- 🎨 Responsive UI component library
- 🛒 Core e-commerce functionality (product listing, cart management)

### Django Server
- 🐍 Python 3.11 base
- 🔄 REST API endpoints with DRF
- 📦 PostgreSQL-ready models
- 🔒 Secure authentication system
- 📄 Swagger/OpenAPI documentation


## Tech Stack 🛠️

| Component       | Technologies                                                                 |
|-----------------|------------------------------------------------------------------------------|
| **Frontend**    | React 18, TypeScript 5, Vite 4, Redux Toolkit, Tailwind CSS 3                |
| **Backend**     | Django 4.2, Django REST Framework 3.14                                      |
| **Database**    | PostgreSQL 15, Redis 7 (caching)                                            |
| **DevOps**      | Docker 24, GitHub Actions, ESLint, Prettier, Jest                            |

## Getting Started 🚀

### Prerequisites
- Python 3.11+
- PostgreSQL 15+

### Installation

1. Clone repository:
   ```bash
   git clone [https://github.com/your-username/ecommerce-platform.git](https://github.com/juanhuamani/Auth--React-Django)
   cd ecommerce-platform

2. Client Setup:
   ```bash
   cd client
   npm install
   cp .env.example .env

3. Django Server Setup:
   ```bash
   cd server-django
   python -m venv venv
   source venv/bin/activate  # Linux/MacOS
   venv\Scripts\activate    # Windows
   pip install -r requirements.txt
   cp .env.example .env
   python manage.py migrate

### Configuration ⚙️
Create .env files in each directory using the provided examples. Key configurations:

1. Client:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   VITE_WS_BASE_URL=ws://localhost:8001


### Running the Application ▶️

1. Start Client
    ```bash
    cd client
    npm run dev

2. Start Django Server:
   ```bash
   cd server-django
   python manage.py runserver
