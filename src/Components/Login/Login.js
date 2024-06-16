import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!', {
        position: 'top-center',
        autoClose: 1000,
        closeOnClick: true,
        draggable: true
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: 'bottom-center',
        autoClose: 5000,
        closeOnClick: true,
        draggable: true
      });
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
