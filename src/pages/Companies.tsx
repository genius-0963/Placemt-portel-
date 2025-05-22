import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  Chip, 
  TextField, 
  InputAdornment,
  Tab,
  Tabs,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterListIcon,
  BusinessCenter as BusinessCenterIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample company data
const companiesData = [
  {
    id: 1,
    name: 'Google',
    logo: 'G',
    industry: 'Technology',
    openPositions: 3,
    status: 'active',
    deadline: '2025-06-15',
    offerCTC: '₹32 LPA',
    eligibility: {
      cgpa: 8.0,
      branches: ['CSE', 'IT', 'ECE'],
      backlogs: 0
    },
    trends: {
      placementRate: 92,
      applications: 156,
      selected: 12
    },
    skills: ['Data Structures', 'Algorithms', 'System Design', 'JavaScript']
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'M',
    industry: 'Technology',
    openPositions: 2,
    status: 'active',
    deadline: '2025-06-18',
    offerCTC: '₹24 LPA',
    eligibility: {
      cgpa: 7.5,
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      backlogs: 0
    },
    trends: {
      placementRate: 88,
      applications: 142,
      selected: 10
    },
    skills: ['C#', '.NET', 'Azure', 'Data Structures']
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'A',
    industry: 'E-commerce',
    openPositions: 5,
    status: 'active',
    deadline: '2025-06-20',
    offerCTC: '₹20 LPA',
    eligibility: {
      cgpa: 7.0,
      branches: ['All Engineering'],
      backlogs: 0
    },
    trends: {
      placementRate: 84,
      applications: 205,
      selected: 18
    },
    skills: ['Java', 'AWS', 'Distributed Systems', 'Algorithms']
  },
  {
    id: 4,
    name: 'Infosys',
    logo: 'I',
    industry: 'IT Services',
    openPositions: 15,
    status: 'upcoming',
    deadline: '2025-07-05',
    offerCTC: '₹8 LPA',
    eligibility: {
      cgpa: 6.5,
      branches: ['All Branches'],
      backlogs: 1
    },
    trends: {
      placementRate: 90,
      applications: 320,
      selected: 120
    },
    skills: ['Java', 'SQL', 'Web Development', 'Communication']
  },
  {
    id: 5,
    name: 'TCS',
    logo: 'T',
    industry: 'IT Services',
    openPositions: 20,
    status: 'upcoming',
    deadline: '2025-07-10',
    offerCTC: '₹7 LPA',
    eligibility: {
      cgpa: 6.0,
      branches: ['All Branches'],
      backlogs: 2
    },
    trends: {
      placementRate: 92,
      applications: 380,
      selected: 150
    },
    skills: ['Problem Solving', 'Communication', 'Basic Programming']
  },
  {
    id: 6,
    name: 'IBM',
    logo: 'I',
    industry: 'Technology',
    openPositions: 8,
    status: 'completed',
    deadline: '2025-05-15',
    offerCTC: '₹12 LPA',
    eligibility: {
      cgpa: 7.0,
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      backlogs: 0
    },
    trends: {
      placementRate: 86,
      applications: 180,
      selected: 24
    },
    skills: ['Java', 'Python', 'Cloud', 'AI']
  },
  {
    id: 7,
    name: 'Wipro',
    logo: 'W',
    industry: 'IT Services',
    openPositions: 0,
    status: 'completed',
    deadline: '2025-05-10',
    offerCTC: '₹6.5 LPA',
    eligibility: {
      cgpa: 6.0,
      branches: ['All Branches'],
      backlogs: 2
    },
    trends: {
      placementRate: 88,
      applications: 290,
      selected: 110
    },
    skills: ['Communication', 'Basic Programming', 'Teamwork']
  },
];

const Companies = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const statusFilters = ['all', 'active', 'upcoming', 'completed'];
  const currentFilter = statusFilters[tabValue];
  
  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = currentFilter === 'all' || company.status === currentFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleCardClick = (id: number) => {
    navigate(`/dashboard/companies/${id}`);
  };

  return (
    <Box className="animate-fade-in">
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Typography variant="h4" fontWeight="bold">Companies</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            placeholder="Search companies..."
            size="small"
            fullWidth
            sx={{ maxWidth: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Filter
          </Button>
        </Box>
      </Box>
      
      {/* Tabs for filtering */}
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'capitalize',
              fontWeight: 500,
            }
          }}
        >
          <Tab label="All Companies" />
          <Tab label="Active Drives" />
          <Tab label="Upcoming" />
          <Tab label="Completed" />
        </Tabs>
      </Box>
      
      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <Grid container spacing={3}>
          {filteredCompanies.map((company) => (
            <Grid item xs={12} md={6} lg={4} key={company.id}>
              <Card 
                className="card-hover" 
                onClick={() => handleCardClick(company.id)}
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ pb: 2, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
                    >
                      {company.logo}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{company.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{company.industry}</Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Chip 
                        label={company.status.charAt(0).toUpperCase() + company.status.slice(1)} 
                        size="small"
                        color={
                          company.status === 'active' ? 'success' : 
                          company.status === 'upcoming' ? 'primary' : 
                          'default'
                        }
                        variant={company.status === 'completed' ? 'outlined' : 'filled'}
                      />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Package</Typography>
                      <Typography variant="subtitle1" fontWeight="bold">{company.offerCTC}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Open Positions</Typography>
                      <Typography variant="subtitle1" fontWeight="bold">{company.openPositions}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Min. CGPA</Typography>
                      <Typography variant="subtitle1">{company.eligibility.cgpa}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Backlogs Allowed</Typography>
                      <Typography variant="subtitle1">
                        {company.eligibility.backlogs > 0 ? `Up to ${company.eligibility.backlogs}` : 'None'}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Required Skills:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {company.skills.slice(0, 3).map((skill, index) => (
                        <Chip key={index} label={skill} size="small" variant="outlined" />
                      ))}
                      {company.skills.length > 3 && (
                        <Chip label={`+${company.skills.length - 3} more`} size="small" variant="outlined" />
                      )}
                    </Box>
                  </Box>
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {company.status === 'completed' ? 'Completed on' : 'Deadline'}: {new Date(company.deadline).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  {company.status === 'active' && (
                    <Button size="small" variant="contained" color="primary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Apply action would go here
                      }}
                    >
                      Apply
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <BusinessCenterIcon fontSize="large" color="disabled" sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No companies found matching your criteria</Typography>
          <Button 
            variant="text" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setTabValue(0);
            }}
          >
            Clear filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Companies;