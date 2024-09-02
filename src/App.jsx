import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
  const validateForm = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Username is required.";
    if (!email) formErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) formErrors.email = "Invalid email format.";
    if (!password) formErrors.password = "Password is required.";
    else if (password.length < 6) formErrors.password = "Password must be at least 6 characters long.";
    return formErrors;
  };

  const evaluatePasswordStrength = (password) => {
    let strength = '';
    if (password.length >= 6) {
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const conditionsMet = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

      if (conditionsMet === 1) strength = 'Weak';
      else if (conditionsMet === 2) strength = 'Medium';
      else if (conditionsMet >= 3) strength = 'Strong';
    } else {
      strength = 'Too Short';
    }
    return strength;
  };

 
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
     
      console.log('Form submitted successfully', { username, email, password });
     
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordStrength('');
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <div className='rform'>
        <form onSubmit={handleSubmit}>
          <h3>Registration</h3>
          <div className='input-box'>
            <input
              type="text"
              placeholder='UserName'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FontAwesomeIcon className='icon' icon={faUser} />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className='input-box'>
            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon className='icon' icon={faEnvelope} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className='input-box'>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
            <FontAwesomeIcon className='icon' icon={faLock} />
            {errors.password && <p className="error">{errors.password}</p>}
         
            {password && (
              <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                <p>Password Strength: {passwordStrength}</p>
              </div>
            )}
          </div>
          <div className="remember-forget">
            <label><input type="checkbox" />Remember Me</label>
            <a href="#">Forget Password?</a>
          </div>
          <button type='submit'>Registration</button>
          <div className="login-link">
            <p>Already have an account? <a href="#">Login</a></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
