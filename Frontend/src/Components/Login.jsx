import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    let timer;
    if (loginMessage) {
      timer = setTimeout(() => {
        setLoginMessage('');
      }, 3000); 
    }
    return () => clearTimeout(timer); 
  }, [loginMessage]);

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (password.length < 6) {
        setLoginMessage("Password should be more than 5 characters");
        return;
      }

      const loginResponse = await axios.post(`https://mediocre-movies.onrender.com/login`, { username, password });
      if (loginResponse.status === 200) {
        sessionStorage.setItem('loginSuccess', 'Login successful');
        sessionStorage.setItem('login', true);
        
        const authResponse = await axios.post(`https://mediocre-movies.onrender.com/auth`, { username, password });
        if (authResponse.status === 200) {
          document.cookie = `accessToken=${authResponse.data.accessToken}; path=/;`;
          navigate("/home");
        } else {
          setLoginMessage('Invalid Credentials');
        }
      } else {
        setLoginMessage('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
    }
  };

  return (
    <div className="form-container">
      <div className="bg-img"></div>
      <div className="trans"></div>
      
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Login Page</h3>
        <label>Username:</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <p className="error">Username is required</p>}

        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: { value: 6, message: "Password should be more than 5 characters" }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        {loginMessage && <div className="error-message">{loginMessage}</div>}

        <button type="submit" className="button">LOGIN</button>
        <p className='option'>
          Not a user?
          <span className='option2'><Link to="/signup">Sign Up</Link></span>
        </p>
      </form>
    </div>
  );
}

export default Login;
