import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/authStatContext';

import classes from './AuthForm.module.css';


const AuthForm = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  const authCts = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
setIsLoading(true);
    // ADD VALIDATION 
    let url;
if (isLogin) {
url = 
'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDR5r9uwWzJcVPWZg0R7ObmVhssRRPvGGo'
} else {
  url =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDR5r9uwWzJcVPWZg0R7ObmVhssRRPvGGo'
}

  fetch( url,{
    method: 'POST',
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecure: true
    }),
    headers: {
      'Content-Type' : 'application/Json'
    }
  }).then(res => {
    setIsLoading(false);
    if (res.ok) {
       return res.json();
    } else {
      return res.json().then(data => {
        let errorMessage  = 'Authentication Error';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
        throw new Error(errorMessage);
       
      });
    }
  }).then(data => {
    authCts.login(data.idToken);
  }).catch((err) => {
    alert(err.message);
  });
};

  



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
          { isLoading && <p>Sending Loading .......</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
