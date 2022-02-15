import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {

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
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
