import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState('');

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      if (password.length < 6) {
        setSignupError("Password should be more than 5 characters");
        return;
      }

      const response = await axios.post(`https://mediocre-movies.onrender.com/signup`, { username, password });
      if (response.status === 201) {
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('signupSuccess', 'Signup successful');
        navigate("/home");
      } else {
        setSignupError('Signup failed');
      }
    } catch (err) {
      console.error(err);
      setSignupError('An error occurred during the signup');
    }
  };

  return (
    <div className="form-container">
      <div className="bg-img"></div>
      <div className="trans"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Signup Page</h3>

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
        {signupError && <p className="error">{signupError}</p>}

        <button type="submit" className="button">SIGNUP</button>
        <p className='option'>
          Already a user?
          <span className='option2'><Link to="/login">Login</Link></span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
