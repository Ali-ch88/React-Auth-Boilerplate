import classes from './ProfileForm.module.css';

const authHandler = () => {
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
}

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
