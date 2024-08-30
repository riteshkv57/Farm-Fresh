import React,{useState} from 'react'
import './Login.css';

const Login = ({ onLogin }) => {
    const [id,setId] =useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleLogin = () =>{
        if(id==='admin' && password==='password') {
            onLogin(true);
        } else {
            setError('Invalid ID or Password');
        }
    };

  return (
    <div className='login-popup'>
      <div className='login-box'>
        <h2>Login</h2>
        {error && <p className='error'>{error}</p>}
        <input 
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
         />
         <input 
         type="password"
         placeholder="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         />
         <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login
