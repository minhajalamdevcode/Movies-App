import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"

const MovieList = () => {
    const [movieList, setMovieList] = useState([])
    const [error, setError] = useState(false) // NEW: Error state
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok")
            }
            return res.json()
        })
        .then(data => {
            setMovieList(data.results)
            setError(false)
        })
        .catch(err => {
            console.error("API Fetch Error:", err)
            setError(true) // NEW: Error set on fail
        })
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>

            {error ? (
                <div className="error__message" style={{
                    backgroundColor: "#000000",
                    border: "1px solid #ffeeba",
                    color: "#ffffff",
                    textAlign: "center",
                    lineHeight: "2.5",
                    fontSize: "1.50rem",
                    padding: "1rem",
        
                    borderRadius: "8px",
                    margin: "20px 0"
                }}>
                    <strong>⚠️ Network Issue Detected:</strong> Unable to load movie data.
                    <br />
                    Please try using a <strong>VPN</strong> or switch your internet connection.
                </div>
            ) : (
                <div className="list__cards">
                    {
                        movieList.map((movie, index) => (
                            <Cards key={index} movie={movie} />
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default MovieList
