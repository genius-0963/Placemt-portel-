# 🎓 Amity Placement Portal

A modern web application for managing student placements, company interactions, and job opportunities.

## ✨ Features

- **Student Features**
  - Profile management
  - Job application tracking
  - Resume builder
  - Placement statistics
  - Company interactions

- **Company Features**
  - Post job opportunities
  - Review applications
  - Schedule interviews
  - Analytics dashboard

- **Admin Features**
  - User management
  - Placement statistics
  - System configuration
  - Analytics and reporting

## 🛠️ Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Material-UI
  - Tailwind CSS
  - Vite
  - React Router
  - Chart.js

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Socket.IO

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/amity-placement-portal.git
cd amity-placement-portal
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your configuration

4. Start the development server
```bash
# Run frontend and backend concurrently
npm run dev:full

# Or run them separately
npm run dev     # Frontend
npm run server  # Backend
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── layouts/       # Layout components
│   └── utils/         # Utility functions
├── server/            # Backend code
├── public/            # Static assets
└── ...
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users can:
- Register as students, companies, or admins
- Login with email and password
- Access role-specific features

## 📊 Features in Detail

### Student Dashboard
- View available job opportunities
- Track application status
- Update profile information
- View placement statistics

### Company Dashboard
- Post new job openings
- Review student applications
- Schedule interviews
- View analytics

### Admin Panel
- Manage users and roles
- Monitor placement statistics
- Configure system settings
- Generate reports

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Amity University
- All contributors
- Open source community 