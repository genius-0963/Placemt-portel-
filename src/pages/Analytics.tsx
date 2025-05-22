import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  ButtonGroup,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import { 
  TrendingUp, 
  School, 
  Business,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  BubbleChart as BubbleChartIcon, 
  Timeline as LineChartIcon,
} from '@mui/icons-material';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  PointElement, 
  LineElement, 
  ArcElement,
  RadialLinearScale,
  Filler 
} from 'chart.js';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale,
  Filler
);

// Sample data
const analyticsData = {
  years: ['2021', '2022', '2023', '2024', '2025'],
  
  // Year-wise placement data
  yearlyPlacements: {
    eligible: [890, 920, 950, 982, 1050],
    placed: [720, 750, 775, 756, null], // 2025 is ongoing
    placementRate: [80.9, 81.5, 81.6, 77.0, null], // 2025 is ongoing
  },
  
  // Department-wise placements for current year
  departmentPlacements: {
    departments: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
    eligible: [240, 152, 220, 165, 130],
    placed: [218, 143, 186, 120, 89],
    rate: [90.8, 94.1, 84.5, 72.7, 68.5],
  },
  
  // Package distribution
  packageDistribution: {
    ranges: ['<5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA', '20+ LPA'],
    students: [120, 310, 200, 80, 46],
    colors: ['#e0e0e0', '#81c784', '#4fc3f7', '#7986cb', '#1A56DB'],
  },
  
  // Company-wise selections (top companies)
  companySelections: [
    { name: 'TCS', count: 85, avgPackage: '7 LPA' },
    { name: 'Infosys', count: 72, avgPackage: '8 LPA' },
    { name: 'Wipro', count: 58, avgPackage: '6.5 LPA' },
    { name: 'Accenture', count: 54, avgPackage: '8.5 LPA' },
    { name: 'Cognizant', count: 48, avgPackage: '7.2 LPA' },
    { name: 'IBM', count: 24, avgPackage: '12 LPA' },
    { name: 'Microsoft', count: 10, avgPackage: '24 LPA' },
    { name: 'Google', count: 12, avgPackage: '32 LPA' },
    { name: 'Amazon', count: 18, avgPackage: '20 LPA' },
  ],
  
  // Skills in demand
  skillsInDemand: {
    skills: ['Programming', 'Data Structures', 'Web Dev', 'Machine Learning', 'Cloud', 'DevOps', 'Communication'],
    demandScore: [95, 90, 85, 80, 75, 70, 85],
  },
  
  // CGPA vs placement rate
  cgpaVsPlacement: {
    cgpaRanges: ['6.0-6.5', '6.5-7.0', '7.0-7.5', '7.5-8.0', '8.0-8.5', '8.5-9.0', '9.0+'],
    placementRate: [45, 58, 72, 85, 92, 96, 98],
  }
};

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState('yearly');
  const [year, setYear] = useState('2025');
  const [chartType, setChartType] = useState(0);
  
  // Year-wise placement trend chart
  const yearlyTrendData = {
    labels: analyticsData.years,
    datasets: [
      {
        type: 'line' as const,
        label: 'Placement Rate (%)',
        data: analyticsData.yearlyPlacements.placementRate,
        borderColor: '#1A56DB',
        backgroundColor: 'rgba(26, 86, 219, 0.1)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y-axis-percentage',
        tension: 0.3,
      },
      {
        type: 'bar' as const,
        label: 'Eligible Students',
        data: analyticsData.yearlyPlacements.eligible,
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        borderColor: 'rgba(20, 184, 166, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-count',
      },
      {
        type: 'bar' as const,
        label: 'Placed Students',
        data: analyticsData.yearlyPlacements.placed,
        backgroundColor: 'rgba(26, 86, 219, 0.2)',
        borderColor: 'rgba(26, 86, 219, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-count',
      },
    ],
  };
  
  const yearlyTrendOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      'y-axis-count': {
        type: 'linear' as const,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
        },
      },
      'y-axis-percentage': {
        type: 'linear' as const,
        position: 'right' as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Placement Rate (%)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  
  // Department-wise placement
  const departmentBarData = {
    labels: analyticsData.departmentPlacements.departments,
    datasets: [
      {
        label: 'Eligible Students',
        data: analyticsData.departmentPlacements.eligible,
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        borderColor: 'rgba(20, 184, 166, 1)',
        borderWidth: 1,
      },
      {
        label: 'Placed Students',
        data: analyticsData.departmentPlacements.placed,
        backgroundColor: 'rgba(26, 86, 219, 0.2)',
        borderColor: 'rgba(26, 86, 219, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const departmentRateData = {
    labels: analyticsData.departmentPlacements.departments,
    datasets: [
      {
        label: 'Placement Rate (%)',
        data: analyticsData.departmentPlacements.rate,
        backgroundColor: analyticsData.departmentPlacements.rate.map(rate => 
          rate > 90 ? 'rgba(34, 197, 94, 0.7)' :
          rate > 80 ? 'rgba(26, 86, 219, 0.7)' :
          rate > 70 ? 'rgba(249, 115, 22, 0.7)' :
          'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: analyticsData.departmentPlacements.rate.map(rate => 
          rate > 90 ? 'rgb(34, 197, 94)' :
          rate > 80 ? 'rgb(26, 86, 219)' :
          rate > 70 ? 'rgb(249, 115, 22)' :
          'rgb(239, 68, 68)'
        ),
        borderWidth: 1,
      },
    ],
  };
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const rateBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Placement Rate (%)',
        },
      },
    },
  };
  
  // Package distribution pie chart
  const packagePieData = {
    labels: analyticsData.packageDistribution.ranges,
    datasets: [
      {
        data: analyticsData.packageDistribution.students,
        backgroundColor: analyticsData.packageDistribution.colors,
        borderWidth: 1,
        borderColor: 'white',
      },
    ],
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };
  
  // CGPA vs Placement rate line chart
  const cgpaLineData = {
    labels: analyticsData.cgpaVsPlacement.cgpaRanges,
    datasets: [
      {
        label: 'Placement Rate (%)',
        data: analyticsData.cgpaVsPlacement.placementRate,
        borderColor: '#1A56DB',
        backgroundColor: 'rgba(26, 86, 219, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Placement Rate (%)',
        },
      },
    },
  };
  
  // Skills radar chart
  const skillsRadarData = {
    labels: analyticsData.skillsInDemand.skills,
    datasets: [
      {
        label: 'Demand Score',
        data: analyticsData.skillsInDemand.demandScore,
        backgroundColor: 'rgba(26, 86, 219, 0.2)',
        borderColor: 'rgba(26, 86, 219, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(26, 86, 219, 1)',
      },
    ],
  };
  
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <Box className="animate-fade-in">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" fontWeight="bold">Placement Analytics</Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ButtonGroup variant="outlined">
            <Button 
              variant={timeFrame === 'yearly' ? 'contained' : 'outlined'} 
              onClick={() => setTimeFrame('yearly')}
            >
              Yearly
            </Button>
            <Button 
              variant={timeFrame === 'department' ? 'contained' : 'outlined'} 
              onClick={() => setTimeFrame('department')}
            >
              Department
            </Button>
          </ButtonGroup>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              label="Year"
              onChange={(e) => setYear(e.target.value)}
            >
              {analyticsData.years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Typography variant="h6">Overall Placement</Typography>
              </Box>
              
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                {analyticsData.yearlyPlacements.placementRate[3]}%
              </Typography>
              
              <Typography variant="body2" color="textSecondary">
                {analyticsData.yearlyPlacements.placed[3]} out of {analyticsData.yearlyPlacements.eligible[3]} students placed
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Chip 
                  label={`${analyticsData.yearlyPlacements.placementRate[3] > analyticsData.yearlyPlacements.placementRate[2] ? '+' : ''}${(analyticsData.yearlyPlacements.placementRate[3] - analyticsData.yearlyPlacements.placementRate[2]).toFixed(1)}%`}
                  color={analyticsData.yearlyPlacements.placementRate[3] >= analyticsData.yearlyPlacements.placementRate[2] ? "success" : "error"}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  vs previous year
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.50', color: 'success.main', mr: 2 }}>
                  <School />
                </Avatar>
                <Typography variant="h6">Department Analysis</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1">Top Department</Typography>
                <Typography variant="subtitle1" fontWeight="bold">IT</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">Placement Rate</Typography>
                <Typography variant="body1" fontWeight="bold" color="success.main">94.1%</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1">Needs Improvement</Typography>
                <Typography variant="subtitle1" fontWeight="bold">Civil</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">Placement Rate</Typography>
                <Typography variant="body1" fontWeight="bold" color="error.main">68.5%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.50', color: 'secondary.main', mr: 2 }}>
                  <Business />
                </Avatar>
                <Typography variant="h6">Top Recruiters</Typography>
              </Box>
              
              <List disablePadding>
                {analyticsData.companySelections.slice(0, 3).map((company, index) => (
                  <ListItem 
                    key={company.name} 
                    disablePadding
                    sx={{ 
                      py: 1, 
                      borderBottom: index < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none' 
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                        {company.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={company.name} 
                      secondary={`${company.count} students`}
                      primaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {company.avgPackage}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant="text" 
                color="primary" 
                size="small" 
                fullWidth 
                sx={{ mt: 1 }}
              >
                View All Companies
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Charts Section */}
      <Grid container spacing={3}>
        {/* Yearly Trend Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Placement Trends
              </Typography>
              
              <Tabs 
                value={chartType} 
                onChange={(e, newValue) => setChartType(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2 }}
              >
                <Tab icon={<BarChartIcon fontSize="small" />} label="Year-wise" />
                <Tab icon={<PieChartIcon fontSize="small" />} label="Package" />
                <Tab icon={<LineChartIcon fontSize="small" />} label="CGPA Impact" />
                <Tab icon={<BubbleChartIcon fontSize="small" />} label="Skills" />
              </Tabs>
              
              {chartType === 0 && (
                <Box sx={{ height: 400, mt: 2 }}>
                  <Bar data={yearlyTrendData} options={yearlyTrendOptions as any} />
                </Box>
              )}
              
              {chartType === 1 && (
                <Box sx={{ height: 400, mt: 2 }}>
                  <Pie data={packagePieData} options={pieOptions} />
                </Box>
              )}
              
              {chartType === 2 && (
                <Box sx={{ height: 400, mt: 2 }}>
                  <Line data={cgpaLineData} options={lineOptions} />
                </Box>
              )}
              
              {chartType === 3 && (
                <Box sx={{ height: 400, mt: 2 }}>
                  <Radar data={skillsRadarData} options={radarOptions} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Department Charts */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Department-wise Placement Rates
              </Typography>
              
              <Box sx={{ height: 400, mt: 2 }}>
                <Bar data={departmentRateData} options={rateBarOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Skills in Demand */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Skills in Demand
              </Typography>
              
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {analyticsData.skillsInDemand.skills.map((skill, index) => (
                  <Grid item xs={12} key={skill}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ width: 150 }}>
                        {skill}
                      </Typography>
                      <Box sx={{ flex: 1, mx: 2 }}>
                        <Box
                          sx={{
                            height: 8,
                            bgcolor: '#e0e0e0',
                            borderRadius: 4,
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              height: '100%',
                              width: `${analyticsData.skillsInDemand.demandScore[index]}%`,
                              bgcolor: 'primary.main',
                              borderRadius: 4,
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ width: 40 }}>
                        {analyticsData.skillsInDemand.demandScore[index]}%
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Company Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Company Recruitment Statistics
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Total Companies Visited
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">156</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Chip 
                      label="+12%"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      vs previous year
                    </Typography>
                  </Box>
                </Paper>
                
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Average Package
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">₹8.2 LPA</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Chip 
                      label="+5%"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      vs previous year
                    </Typography>
                  </Box>
                </Paper>
                
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Highest Package
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">₹42 LPA</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Offered by Google for Software Engineering role
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;