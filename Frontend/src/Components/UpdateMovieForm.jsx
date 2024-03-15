import  {  useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "./UpdateMovieForm.css";

const UpdateMovieForm = () => {
  const { id } = useParams(); 
  const { register, handleSubmit, setValue } = useForm();

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`https://mediocre-movies.onrender.com/read/${id}`);
      const movieData = response.data;
      Object.keys(movieData).forEach((key) => {
        setValue(key, movieData[key]);
      });
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const onSubmit = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/update/${id}`, formData);
      console.log("Movie updated successfully:", formData);
      window.location.href = "/home";
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <>
    <h2 style={{color:"yellow"}}>Update Movie</h2>
    <div className="bg-img"></div>
    <div className="update-form-container">
    
      <form className="update-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Movie Name:</label>
        <input type="text" {...register("movieName")} />

        <label>Release Date:</label>
        <input type="text" {...register("releaseDate")} />

        <label>Industry:</label>
        <input type="text" {...register("industry")} />

        <label>Director:</label>
        <input type="text" {...register("director")} />

        <label>Budget:</label>
        <input type="text" {...register("budget")} />

        <label>IMDb Rating:</label>
        <input type="text" {...register("imdbRating")} />

        <label>Rotten Tomatoes Rating:</label>
        <input type="text" {...register("rottenTomatoesRating")} />

        <label>Has Sequel:</label>
        <select {...register("hasSequel")}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Image URL:</label>
        <input type="text" {...register("img")} />

        <button type="submit" className="update-button">
          Update Movie
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdateMovieForm;