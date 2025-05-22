import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Convert ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server and socket.io instance
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Handle placement updates
  socket.on('placement_update', (data) => {
    // Broadcast to all clients
    io.emit('placement_update', data);
  });
  
  // Handle new company added
  socket.on('new_company', (data) => {
    io.emit('new_company', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API routes
// Students API
app.get('/api/students', (req, res) => {
  // Mock data response
  const students = [
    { id: 1, name: 'Rahul Sharma', rollNo: 'A12345', department: 'Computer Science', cgpa: 9.2, placementStatus: 'placed', company: 'Google' },
    { id: 2, name: 'Priya Patel', rollNo: 'A12346', department: 'Information Technology', cgpa: 8.7, placementStatus: 'placed', company: 'Microsoft' },
    { id: 3, name: 'Amit Kumar', rollNo: 'A12347', department: 'Electronics', cgpa: 8.1, placementStatus: 'placed', company: 'Amazon' },
    // More students...
  ];
  
  res.json(students);
});

// Companies API
app.get('/api/companies', (req, res) => {
  // Mock data response
  const companies = [
    { id: 1, name: 'Google', industry: 'Technology', openPositions: 3, status: 'active' },
    { id: 2, name: 'Microsoft', industry: 'Technology', openPositions: 2, status: 'active' },
    { id: 3, name: 'Amazon', industry: 'E-commerce', openPositions: 5, status: 'active' },
    // More companies...
  ];
  
  res.json(companies);
});

// Analytics API
app.get('/api/analytics', (req, res) => {
  // Mock data response
  const analytics = {
    totalStudents: 982,
    placedStudents: 756,
    placementPercentage: 77,
    topDepartment: 'Information Technology',
    topDepartmentRate: 94.1,
    upcomingCompanies: 8
  };
  
  res.json(analytics);
});

// Root route
app.get('/', (req, res) => {
  res.send('Amity Placement Portal API is running');
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});