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
  Link as MuiLink
} from '@mui/material';
import { 
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  School as SchoolIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate fields
    let hasError = false;
    
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    
    if (hasError) return;
    
    // Submit login
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
      <Box sx={{ mb: 4, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mr: 2 }}>
          <SchoolIcon fontSize="large" color="primary" />
        </Box>
        <Typography variant="h5" fontWeight="bold">
          Amity Placement Portal
        </Typography>
      </Box>
      
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Log In
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome back! Please log in to your account.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
            <MenuItem value="company">Company</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
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
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <MuiLink component={Link} to="/forgot-password" variant="body2">
            Forgot password?
          </MuiLink>
        </Box>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, py: 1.2 }}
          endIcon={<LoginIcon />}
        >
          Log In
        </Button>
        
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?
          </Typography>
          <Button 
            component={Link} 
            to="/register" 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 1, mb: 2, py: 1.2 }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;