import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          username: username,
          phone: phone,
          uid : user.uid
        });
        toast.success('User registered successfully!', {
          position: 'top-center',
          autoClose: 1000,
          closeOnClick: true,
          draggable: true
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
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
      <div className="signupParentDiv">
        <img width="300px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={onSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
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
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
