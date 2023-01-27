import React,{useState} from 'react'
import styles from "../styles/login.module.css"
// import { useToasts } from 'react-toast-notifications'
import {useAuth } from "../hooks"
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth()
  console.log(auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return alert("Please enter Email, Password")
    }

    const response = await auth.login(email, password)
    if(response.success){
      alert("logged in")
    }else{
      alert("failed to login")
    }

    setLoggingIn(false)

  }
  if(auth.user){
    return <Navigate replace to="/" />
  }
 

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder='Email'  value={email} 
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input type="password" placeholder='Password'  
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field} >
        <button disabled={loggingIn} className={styles.button}>{loggingIn ? 'Logging in...' : "Log In"}</button>
      </div>
    </form>
  )
}

export default Login


