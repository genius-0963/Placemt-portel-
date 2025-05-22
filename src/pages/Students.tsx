import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button, 
  TextField, 
  InputAdornment,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  TablePagination,
  LinearProgress,
  IconButton,
  Badge,
  Tooltip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterListIcon,
  Sort as SortIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  Engineering as EngineeringIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  CompareArrows as CompareArrowsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample student data
const studentsData = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rollNo: 'A12345',
    department: 'Computer Science',
    cgpa: 9.2,
    placementStatus: 'placed',
    company: 'Google',
    package: '₹32 LPA',
    skills: ['Java', 'Python', 'Data Structures', 'Algorithms'],
    placementProbability: 94,
    applications: 4,
    offers: 2
  },
  {
    id: 2,
    name: 'Priya Patel',
    rollNo: 'A12346',
    department: 'Information Technology',
    cgpa: 8.7,
    placementStatus: 'placed',
    company: 'Microsoft',
    package: '₹24 LPA',
    skills: ['C#', '.NET', 'React', 'SQL'],
    placementProbability: 88,
    applications: 5,
    offers: 1
  },
  {
    id: 3,
    name: 'Amit Kumar',
    rollNo: 'A12347',
    department: 'Electronics',
    cgpa: 8.1,
    placementStatus: 'placed',
    company: 'Amazon',
    package: '₹20 LPA',
    skills: ['Python', 'Circuit Design', 'VLSI', 'Embedded Systems'],
    placementProbability: 82,
    applications: 6,
    offers: 1
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    rollNo: 'A12348',
    department: 'Computer Science',
    cgpa: 8.5,
    placementStatus: 'unplaced',
    company: null,
    package: null,
    skills: ['C++', 'JavaScript', 'React', 'Node.js'],
    placementProbability: 78,
    applications: 3,
    offers: 0
  },
  {
    id: 5,
    name: 'Vikram Singh',
    rollNo: 'A12349',
    department: 'Mechanical',
    cgpa: 7.8,
    placementStatus: 'unplaced',
    company: null,
    package: null,
    skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'Manufacturing'],
    placementProbability: 65,
    applications: 2,
    offers: 0
  },
  {
    id: 6,
    name: 'Neha Verma',
    rollNo: 'A12350',
    department: 'Civil Engineering',
    cgpa: 8.0,
    placementStatus: 'unplaced',
    company: null,
    package: null,
    skills: ['AutoCAD', 'Structural Analysis', 'Construction Management'],
    placementProbability: 72,
    applications: 1,
    offers: 0
  },
  {
    id: 7,
    name: 'Arjun Malhotra',
    rollNo: 'A12351',
    department: 'Computer Science',
    cgpa: 7.5,
    placementStatus: 'unplaced',
    company: null,
    package: null,
    skills: ['Java', 'HTML/CSS', 'Database Management'],
    placementProbability: 62,
    applications: 4,
    offers: 0
  },
  {
    id: 8,
    name: 'Kavita Reddy',
    rollNo: 'A12352',
    department: 'Information Technology',
    cgpa: 9.0,
    placementStatus: 'placed',
    company: 'Adobe',
    package: '₹18 LPA',
    skills: ['UI/UX Design', 'React', 'JavaScript', 'Python'],
    placementProbability: 90,
    applications: 3,
    offers: 1
  },
];

// Department statistics
const departmentStats = [
  { department: 'Computer Science', total: 240, placed: 218, unplaced: 22, rate: 90.8 },
  { department: 'Information Technology', total: 152, placed: 143, unplaced: 9, rate: 94.1 },
  { department: 'Electronics', total: 220, placed: 186, unplaced: 34, rate: 84.5 },
  { department: 'Mechanical', total: 165, placed: 120, unplaced: 45, rate: 72.7 },
  { department: 'Civil', total: 130, placed: 89, unplaced: 41, rate: 68.5 },
];

const Students = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const statusFilters = ['all', 'placed', 'unplaced'];
  const currentFilter = statusFilters[tabValue];
  
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = currentFilter === 'all' || student.placementStatus === currentFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleRowClick = (id: number) => {
    navigate(`/dashboard/students/${id}`);
  };

  return (
    <Box className="animate-fade-in">
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Typography variant="h4" fontWeight="bold">Students</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            placeholder="Search by name or roll no..."
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
          <Button 
            variant="outlined" 
            startIcon={<CompareArrowsIcon />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Compare
          </Button>
        </Box>
      </Box>
      
      {/* Department Stats */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Department Statistics</Typography>
        <Grid container spacing={2}>
          {departmentStats.map((dept) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={dept.department}>
              <Card>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" noWrap>
                    {dept.department}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {dept.rate}%
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                      Placed
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={dept.rate} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          bgcolor: dept.rate > 90 ? 'success.main' : 
                                  dept.rate > 75 ? 'primary.main' : 
                                  dept.rate > 60 ? 'warning.main' : 'error.main',
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="success.main">
                      {dept.placed} Placed
                    </Typography>
                    <Typography variant="caption" color="error.main">
                      {dept.unplaced} Unplaced
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
          <Tab label="All Students" />
          <Tab label="Placed" />
          <Tab label="Unplaced" />
        </Tabs>
      </Box>
      
      {/* Students Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="students table">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  CGPA
                  <IconButton size="small">
                    <SortIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Placement Details</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Probability
                  <IconButton size="small">
                    <SortIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow 
                  key={student.id}
                  hover
                  onClick={() => handleRowClick(student.id)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{student.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{student.rollNo}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SchoolIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{student.department}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {student.cgpa}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={student.placementStatus === 'placed' ? <CheckCircleIcon /> : <CancelIcon />}
                      label={student.placementStatus === 'placed' ? 'Placed' : 'Unplaced'}
                      color={student.placementStatus === 'placed' ? 'success' : 'default'}
                      size="small"
                      variant={student.placementStatus === 'unplaced' ? 'outlined' : 'filled'}
                    />
                  </TableCell>
                  <TableCell>
                    {student.placementStatus === 'placed' ? (
                      <Box>
                        <Typography variant="body2" fontWeight="medium">{student.company}</Typography>
                        <Typography variant="body2" color="success.main">{student.package}</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={student.applications} color="primary" sx={{ mr: 1 }}>
                          <AssessmentIcon fontSize="small" color="action" />
                        </Badge>
                        <Typography variant="body2" color="textSecondary">Applications</Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 60, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={student.placementProbability} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: student.placementProbability > 80 ? 'success.main' : 
                                      student.placementProbability > 60 ? 'primary.main' : 
                                      student.placementProbability > 40 ? 'warning.main' : 'error.main',
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{student.placementProbability}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {student.skills.slice(0, 2).map((skill, index) => (
                        <Chip key={index} label={skill} size="small" variant="outlined" />
                      ))}
                      {student.skills.length > 2 && (
                        <Tooltip title={student.skills.slice(2).join(', ')}>
                          <Chip label={`+${student.skills.length - 2}`} size="small" />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={(e) => { e.stopPropagation(); }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Students;