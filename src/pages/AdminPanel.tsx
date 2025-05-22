import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  Tab, 
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Switch,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  PersonAdd as PersonAddIcon,
  Business as BusinessIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStudentDialogOpen = () => {
    setOpenStudentDialog(true);
  };

  const handleStudentDialogClose = () => {
    setOpenStudentDialog(false);
  };

  const handleCompanyDialogOpen = () => {
    setOpenCompanyDialog(true);
  };

  const handleCompanyDialogClose = () => {
    setOpenCompanyDialog(false);
  };

  const handleEmailDialogOpen = () => {
    setOpenEmailDialog(true);
  };

  const handleEmailDialogClose = () => {
    setOpenEmailDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Sample data for students
  const studentsData = [
    { id: 1, name: 'Rahul Sharma', rollNo: 'A12345', department: 'Computer Science', cgpa: 9.2, email: 'rahul.sharma@example.com', status: 'active' },
    { id: 2, name: 'Priya Patel', rollNo: 'A12346', department: 'Information Technology', cgpa: 8.7, email: 'priya.patel@example.com', status: 'active' },
    { id: 3, name: 'Amit Kumar', rollNo: 'A12347', department: 'Electronics', cgpa: 8.1, email: 'amit.kumar@example.com', status: 'active' },
    { id: 4, name: 'Sneha Gupta', rollNo: 'A12348', department: 'Computer Science', cgpa: 8.5, email: 'sneha.gupta@example.com', status: 'active' },
    { id: 5, name: 'Vikram Singh', rollNo: 'A12349', department: 'Mechanical', cgpa: 7.8, email: 'vikram.singh@example.com', status: 'inactive' },
  ];

  // Sample data for companies
  const companiesData = [
    { id: 1, name: 'Google', industry: 'Technology', hr: 'Sarah Johnson', email: 'hr@google.com', status: 'active' },
    { id: 2, name: 'Microsoft', industry: 'Technology', hr: 'John Smith', email: 'hr@microsoft.com', status: 'active' },
    { id: 3, name: 'Amazon', industry: 'E-commerce', hr: 'David Brown', email: 'hr@amazon.com', status: 'active' },
    { id: 4, name: 'Infosys', industry: 'IT Services', hr: 'Priya Mehta', email: 'hr@infosys.com', status: 'active' },
    { id: 5, name: 'TCS', industry: 'IT Services', hr: 'Raj Patel', email: 'hr@tcs.com', status: 'inactive' },
  ];

  // Sample data for placement drives
  const placementDrivesData = [
    { id: 1, company: 'Google', role: 'Software Engineer', date: '2025-06-15', status: 'upcoming', eligibility: 'CGPA >= 8.0, CSE/IT/ECE' },
    { id: 2, name: 'Microsoft', role: 'Full Stack Developer', date: '2025-06-18', status: 'upcoming', eligibility: 'CGPA >= 7.5, CSE/IT/ECE/EEE' },
    { id: 3, company: 'Amazon', role: 'SDE-1', date: '2025-06-20', status: 'upcoming', eligibility: 'CGPA >= 7.0, All Engineering' },
    { id: 4, company: 'IBM', role: 'Systems Engineer', date: '2025-05-15', status: 'completed', eligibility: 'CGPA >= 7.0, CSE/IT/ECE/EEE' },
    { id: 5, company: 'Wipro', role: 'Project Engineer', date: '2025-05-10', status: 'completed', eligibility: 'CGPA >= 6.0, All Branches' },
  ];

  return (
    <Box className="animate-fade-in">
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Typography variant="h4" fontWeight="bold">Admin Panel</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
          >
            Export Data
          </Button>
          <Button 
            variant="contained" 
            startIcon={<CloudUploadIcon />}
            color="primary"
          >
            Generate Report
          </Button>
        </Box>
      </Box>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Actions
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<PersonAddIcon />} 
                onClick={handleStudentDialogOpen}
                fullWidth
                sx={{ py: 1.2 }}
              >
                Add Student
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<BusinessIcon />} 
                onClick={handleCompanyDialogOpen}
                fullWidth
                sx={{ py: 1.2 }}
              >
                Add Company
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                color="info" 
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: 1.2 }}
              >
                Create New Drive
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outlined" 
                color="success" 
                startIcon={<EmailIcon />} 
                onClick={handleEmailDialogOpen}
                fullWidth
                sx={{ py: 1.2 }}
              >
                Send Notification
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
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
          <Tab label="Students" />
          <Tab label="Companies" />
          <Tab label="Placement Drives" />
          <Tab label="Reports" />
        </Tabs>
      </Box>
      
      {/* Students Tab */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6">Student Management</Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search students..."
                size="small"
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
              >
                Filter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleStudentDialogOpen}
              >
                Add Student
              </Button>
            </Box>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="students table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>CGPA</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsData
                  .filter(student => 
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.cgpa}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={student.status} 
                          color={student.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* Companies Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6">Company Management</Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search companies..."
                size="small"
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
              >
                Filter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleCompanyDialogOpen}
              >
                Add Company
              </Button>
            </Box>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="companies table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>HR Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companiesData
                  .filter(company => 
                    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    company.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.id}</TableCell>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.hr}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={company.status} 
                          color={company.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* Placement Drives Tab */}
      {tabValue === 2 && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6">Placement Drives</Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search drives..."
                size="small"
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
              >
                Filter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
              >
                Create Drive
              </Button>
            </Box>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="placement drives table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Eligibility</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {placementDrivesData
                  .filter(drive => 
                    drive.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    drive.role.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((drive) => (
                    <TableRow key={drive.id}>
                      <TableCell>{drive.id}</TableCell>
                      <TableCell>{drive.company}</TableCell>
                      <TableCell>{drive.role}</TableCell>
                      <TableCell>{new Date(drive.date).toLocaleDateString()}</TableCell>
                      <TableCell>{drive.eligibility}</TableCell>
                      <TableCell>
                        <Chip 
                          label={drive.status} 
                          color={drive.status === 'upcoming' ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {/* Reports Tab */}
      {tabValue === 3 && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Reports & Analytics</Typography>
            
            <Button 
              variant="contained" 
              startIcon={<RefreshIcon />}
            >
              Refresh Data
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Placement Reports
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                      onClick={() => showSnackbar('Placement report downloaded successfully')}
                    >
                      Department-wise Placement Report
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                      onClick={() => showSnackbar('Company participation report downloaded successfully')}
                    >
                      Company Participation Report
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                      onClick={() => showSnackbar('Trend analysis report downloaded successfully')}
                    >
                      Year-on-Year Trend Analysis
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      onClick={() => showSnackbar('Package distribution report downloaded successfully')}
                    >
                      Package Distribution Report
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Student Analytics
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                      onClick={() => showSnackbar('CGPA distribution report downloaded successfully')}
                    >
                      CGPA Distribution Analysis
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                      onClick={() => showSnackbar('Skills gap report downloaded successfully')}
                    >
                      Skills Gap Analysis
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                      onClick={() => showSnackbar('Interview performance report downloaded successfully')}
                    >
                      Interview Performance Report
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      fullWidth
                      onClick={() => showSnackbar('Placement probability report downloaded successfully')}
                    >
                      Placement Probability Report
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {/* Add Student Dialog */}
      <Dialog open={openStudentDialog} onClose={handleStudentDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Full Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Roll Number" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone Number" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select label="Department">
                    <MenuItem value="cse">Computer Science</MenuItem>
                    <MenuItem value="it">Information Technology</MenuItem>
                    <MenuItem value="ece">Electronics & Comm.</MenuItem>
                    <MenuItem value="me">Mechanical</MenuItem>
                    <MenuItem value="ce">Civil</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="CGPA" type="number" inputProps={{ step: 0.1, min: 0, max: 10 }} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Skills (comma separated)" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label="Student is eligible for placement"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                  >
                    Upload Resume
                    <input type="file" hidden />
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    No file selected
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStudentDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              handleStudentDialogClose();
              showSnackbar('Student added successfully');
            }}
          >
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Add Company Dialog */}
      <Dialog open={openCompanyDialog} onClose={handleCompanyDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Company Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Industry" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="HR Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="HR Email" type="email" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="HR Phone" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Company Website" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address" fullWidth multiline rows={2} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="About Company" fullWidth multiline rows={3} />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                  >
                    Upload Company Logo
                    <input type="file" hidden />
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    No file selected
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCompanyDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              handleCompanyDialogClose();
              showSnackbar('Company added successfully');
            }}
          >
            Add Company
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Send Email Notification Dialog */}
      <Dialog open={openEmailDialog} onClose={handleEmailDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Send Email Notification</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Recipient Group</InputLabel>
                  <Select label="Recipient Group">
                    <MenuItem value="all_students">All Students</MenuItem>
                    <MenuItem value="placed_students">Placed Students</MenuItem>
                    <MenuItem value="unplaced_students">Unplaced Students</MenuItem>
                    <MenuItem value="companies">All Companies</MenuItem>
                    <MenuItem value="cse_students">CSE Students</MenuItem>
                    <MenuItem value="it_students">IT Students</MenuItem>
                    <MenuItem value="ece_students">ECE Students</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Subject" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Message Content" fullWidth multiline rows={6} />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                  >
                    Attach File
                    <input type="file" hidden />
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    No file selected
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              handleEmailDialogClose();
              showSnackbar('Email notification sent successfully');
            }}
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;