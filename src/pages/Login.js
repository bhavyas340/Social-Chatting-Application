import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications'; // its a hook need to define like in 9 line that is use as notification
import { useAuth } from '../hooks';

const Login= ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLogingIn] = useState(false);  // true then desabled false ...
    const {addToast} = useToasts();
    const auth = useAuth();
    console.log(auth);

    const handleSubmit = async (e)=>{
        e.preventDefault();

        setLogingIn(true);

        if(!email || !password){
           addToast("Please enter both email and password", {
            appearance: 'error',

           });
        };
        // console.log(auth);
        const response = await auth.login(email, password);
        // console.log(response.data);
        console.log("status",response);

        if(response.success){
            console.log("sucess");
            addToast("Successfully Logged In",{
                appearance:'success'
            });
        }else{
            console.log("error");
            addToast(response.message,{
                appearance:'error'
            });
        }
        setLogingIn(false);
    }
    if (auth.user) {
        return <Navigate to="/" />;
      }

return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
         <input 
         type="email" 
         placeholder='email' 
         //required 
         value={email} 
         onChange={(e)=>setEmail(e.target.value)}
         />
      </div>
      <div className={styles.field}>
      <input 
         type="password" 
         placeholder='password' 
         //required 
         value={password} 
         onChange={(e)=>setPassword(e.target.value)}
         />
      </div>
      <div className={styles.field} >
         <button disabled={loggingIn}>{loggingIn ? 'LoggingIn ...' : 'Log In'}</button>
      </div>

    </form>
)
}

export default Login;