import axios from "axios";
import { useForm } from "react-hook-form";
import "./Form.css";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await axios.post("https://mediocre-movies.onrender.com/add", formData);
      sessionStorage.setItem("registrationSuccess", "true");
      console.log(formData);
      window.location.href = "/home";
    } catch (error) {
      console.error(error);
    }
  };

  return ( 
    <div className="form-container">
      <div className="bg-img"></div>
      <div className="trans"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Movie Name:</label>
        <input type="text" {...register("movieName", { required: true })} />
        {errors.movieName && <p className="error">Movie Name is required</p>}

        <label>Release Date:</label>
        <input type="text" {...register("releaseDate", { required: true })} />
        {errors.releaseDate && (
          <p className="error">Release Date is required</p>
        )}

        <label>Industry:</label>
        <input type="text" {...register("industry", { required: true })} />
        {errors.industry && <p className="error">Industry is required</p>}

        <label>Director:</label>
        <input type="text" {...register("director", { required: true })} />
        {errors.director && <p className="error">Director is required</p>}

        <label>Budget:</label>
        <input type="text" {...register("budget", { required: true })} />
        {errors.budget && <p className="error">Budget is required</p>}

        <label>IMDb Rating:</label>
        <input type="text" {...register("imdbRating", { required: true })} />
        {errors.imdbRating && <p className="error">IMDb Rating is required</p>}

        <label>Rotten Tomatoes Rating:</label>
        <input
          type="text"
          {...register("rottenTomatoesRating", { required: true })}
        />
        {errors.rottenTomatoesRating && (
          <p className="error">Rotten Tomatoes Rating is required</p>
        )}

        <label>Has Sequel:</label>
        <select {...register("hasSequel")}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Image URL:</label>
        <input
          type="text"
          {...register("img", { required: true, pattern: /^https?:\/\/.+/ })}
        />
        {errors.img && (
          <p className="error">
            Valid URL starting with "http://" or "https://" is required
          </p>
        )}

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
