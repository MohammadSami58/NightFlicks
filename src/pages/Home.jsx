import MovieCard from "../components/MovieCard";
import { useState, useEffect, useEffectEvent } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home(){

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies]= useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(()=>{
        const loadPopularMovies = async ()=>{
            try{
                const PopularMovies = await getPopularMovies();
                setMovies(PopularMovies);
            } catch (err){
                setError("Faild to fetch data...")
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, []);

    const handleSearch = async (e)=>{
        e.preventDefault();
       if (!searchQuery.trim()) return
       if(loading) return
       setLoading(true)
       setHasSearched(true)
       try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
       }catch(err){
        console.log(err)
        setError(`Faild to find  ${searchQuery}`)
        setMovies([]);
       }
       finally{
        setLoading(false)
       }
        
    }
    return (
    <div className="home">
        <form action="" onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search Your Movies.." className="search-input" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
            <button type="submit" className="search-button">Search</button>
        </form>
        {!hasSearched &&(
             <div>
            <h4 className="search-heading">Search for your movies and they will appear here</h4>
        </div>
        )}
       
       

        {error && <div className="error-message">{error}</div>}

        {loading ? <div className="loading">Loading...</div> :<div className="movies-grid">
            {movies.map((movie)=> (
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>}
        
    </div>
    )
    
}
export default Home