import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  FormHelperText,
  Alert,
  Divider,
  Link as MuiLink,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Visibility,
  VisibilityOff,
  ArrowForward,
  ArrowBack,
  PersonAdd,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const steps = ['Account Type', 'Personal Information', 'Create Password'];

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (activeStep) {
      case 0:
        if (!role) {
          newErrors.role = 'Please select your role';
        }
        break;
      case 1:
        if (!name) {
          newErrors.name = 'Name is required';
        }
        
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
          newErrors.email = 'Please enter a valid email';
        }
        
        if (role === 'student') {
          if (!rollNo) {
            newErrors.rollNo = 'Roll number is required';
          }
          
          if (!department) {
            newErrors.department = 'Department is required';
          }
        }
        break;
      case 2:
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (!confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    try {
      await register({
        name,
        email,
        password,
        role: role as 'student' | 'admin' | 'company'
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };
  
  return (
    <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create Account
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Register for the Amity Placement Portal.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Step 1: Account Type */}
        {activeStep === 0 && (
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel id="role-label">I am a</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              label="I am a"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="company">Company</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
            </Select>
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
          </FormControl>
        )}
        
        {/* Step 2: Personal Information */}
        {activeStep === 1 && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={role === 'company' ? 'Company Name' : 'Full Name'}
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            
            {role === 'student' && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="rollNo"
                  label="Roll Number"
                  name="rollNo"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  error={!!errors.rollNo}
                  helperText={errors.rollNo}
                />
                
                <FormControl fullWidth margin="normal" error={!!errors.department}>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department"
                    value={department}
                    label="Department"
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <MenuItem value="cse">Computer Science Engineering</MenuItem>
                    <MenuItem value="it">Information Technology</MenuItem>
                    <MenuItem value="ece">Electronics & Communication</MenuItem>
                    <MenuItem value="me">Mechanical Engineering</MenuItem>
                    <MenuItem value="ce">Civil Engineering</MenuItem>
                  </Select>
                  {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
                </FormControl>
              </>
            )}
            
            {role === 'company' && (
              <TextField
                margin="normal"
                fullWidth
                id="industry"
                label="Industry"
                name="industry"
              />
            )}
          </>
        )}
        
        {/* Step 3: Create Password */}
        {activeStep === 2 && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password || 'Password must be at least 8 characters long'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<PersonAdd />}
            >
              Create Account
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              Next
            </Button>
          )}
        </Box>
        
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?
          </Typography>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 1, mb: 2, py: 1.2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;