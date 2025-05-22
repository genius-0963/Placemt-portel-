import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, Divider, Button, Avatar } from '@mui/material';
import { 
  TrendingUp, 
  Business, 
  Group, 
  CheckCircle,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Sample data for the dashboard
const placementData = {
  totalPlaced: 756,
  totalEligible: 982,
  placementPercentage: 77,
  growthRate: 12.4,
  upcomingCompanies: 8,
  activeDrives: 5,
  unplacedStudents: 226,
  departments: [
    { name: 'Computer Science', placed: 218, total: 240, color: '#1A56DB' },
    { name: 'Electronics', placed: 186, total: 220, color: '#14B8A6' },
    { name: 'Mechanical', placed: 120, total: 165, color: '#F97316' },
    { name: 'Civil', placed: 89, total: 130, color: '#EAB308' },
    { name: 'Information Technology', placed: 143, total: 152, color: '#8B5CF6' },
  ]
};

// Sample data for upcoming companies
const upcomingCompanies = [
  { id: 1, name: 'Google', logo: '🇬', role: 'Software Engineer', deadline: '2025-06-15', package: '₹32 LPA' },
  { id: 2, name: 'Microsoft', logo: '🇲', role: 'Full Stack Developer', deadline: '2025-06-18', package: '₹24 LPA' },
  { id: 3, name: 'Amazon', logo: '🇦', role: 'SDE-1', deadline: '2025-06-20', package: '₹20 LPA' }
];

const Dashboard = () => {
  const navigate = useNavigate();

  // Calculate placement statistics
  const placementRate = (placementData.totalPlaced / placementData.totalEligible * 100).toFixed(1);
  
  // Chart data for department-wise placements
  const departmentBarData = {
    labels: placementData.departments.map(dept => dept.name),
    datasets: [
      {
        label: 'Placed Students',
        data: placementData.departments.map(dept => dept.placed),
        backgroundColor: placementData.departments.map(dept => dept.color),
        borderRadius: 6,
      }
    ]
  };

  const placementDoughnutData = {
    labels: ['Placed', 'Unplaced'],
    datasets: [
      {
        data: [placementData.totalPlaced, placementData.unplacedStudents],
        backgroundColor: ['#1A56DB', '#E0E7FF'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '70%',
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box className="animate-fade-in">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">Placement Dashboard</Typography>
        <Button variant="contained" disableElevation>
          Export Report
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="subtitle2">
                  Placement Rate
                </Typography>
                <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', width: 40, height: 40 }}>
                  <TrendingUp fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {placementRate}%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <ArrowUpward fontSize="small" color="success" />
                <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                  {placementData.growthRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                  vs. last year
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="subtitle2">
                  Placed Students
                </Typography>
                <Avatar sx={{ bgcolor: 'success.50', color: 'success.main', width: 40, height: 40 }}>
                  <CheckCircle fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {placementData.totalPlaced}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  out of {placementData.totalEligible} eligible
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="subtitle2">
                  Upcoming Companies
                </Typography>
                <Avatar sx={{ bgcolor: 'secondary.50', color: 'secondary.main', width: 40, height: 40 }}>
                  <Business fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {placementData.upcomingCompanies}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  {placementData.activeDrives} active drives
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="textSecondary" variant="subtitle2">
                  Unplaced Students
                </Typography>
                <Avatar sx={{ bgcolor: 'warning.50', color: 'warning.main', width: 40, height: 40 }}>
                  <Group fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {placementData.unplacedStudents}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <ArrowDownward fontSize="small" color="error" />
                <Typography variant="body2" color="error.main" sx={{ ml: 0.5 }}>
                  8.3%
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                  vs. last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts and Tables */}
      <Grid container spacing={3}>
        {/* Department-wise Placement Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Department-wise Placements
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <Bar data={departmentBarData} options={barOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Placement Status Doughnut Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Placement Status
              </Typography>
              <Box sx={{ height: 280, position: 'relative', mt: 2 }}>
                <Doughnut data={placementDoughnutData} options={doughnutOptions} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {placementRate}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Placement Rate
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Companies */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Upcoming Companies
                </Typography>
                <Button variant="text" onClick={() => navigate('/dashboard/companies')}>
                  View All
                </Button>
              </Box>
              
              {upcomingCompanies.map((company, index) => (
                <React.Fragment key={company.id}>
                  <Box sx={{ display: 'flex', py: 2 }} className="card-hover">
                    <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', mr: 2 }}>
                      {company.logo}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {company.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {company.role}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        {company.package}
                      </Typography>
                      <Typography variant="body2" color="error">
                        Deadline: {new Date(company.deadline).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  {index < upcomingCompanies.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Placement Probability */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Your Placement Probability
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
                  76%
                </Typography>
                <Typography variant="body2">
                  Based on your CGPA, skills, and past placement data
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Recommended Skills to Improve:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Button size="small" variant="outlined" color="primary">Data Structures</Button>
                <Button size="small" variant="outlined" color="primary">System Design</Button>
                <Button size="small" variant="outlined" color="primary">React.js</Button>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Recommended Companies:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button size="small" variant="outlined" color="secondary">Microsoft</Button>
                <Button size="small" variant="outlined" color="secondary">TCS</Button>
                <Button size="small" variant="outlined" color="secondary">Infosys</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;