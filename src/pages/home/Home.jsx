import React, { useEffect, useState } from "react"
import "./Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return (
        <>
            <div className="poster">
                <Carousel
    showThumbs={false}
    autoPlay={true}
    interval={3000}
    infiniteLoop={true}
    showStatus={false}
    transitionTime={1000}
    stopOnHover={false}
    swipeable={true}
    emulateTouch={true}
>
    {
        popularMovies.map(movie => (
            <Link key={movie.id} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                <div className="posterImage">
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} />
                </div>
                <div className="posterImage__overlay">
                    <div className="posterImage__title">{movie.original_title}</div>
                    <div className="posterImage__runtime">
                        {movie.release_date}
                        <span className="posterImage__rating">
                            {movie.vote_average}
                            <i className="fas fa-star star-color" />
                        </span>
                    </div>
                    <div className="posterImage__description">  {movie.overview?.split(" ").slice(0, 20).join(" ") + '...'}</div>
                </div>
            </Link>
        ))
    }
</Carousel>

                <MovieList />
            </div>
        </>
    )
}

export default Home