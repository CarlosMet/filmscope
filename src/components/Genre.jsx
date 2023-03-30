import React, { useEffect, useState } from 'react'
import playButton from '../images/play-button.svg'
import addIcon from '../images/add.svg'
import {Link} from 'react-router-dom'
import { addRevoveFav } from '../features/AddFavs'
import YouTube from 'react-youtube'
import Player from './Player'

const Genre = () => {
    let url = new URLSearchParams(window.location.search)
    let movieId = url.get('genreID')
    const apiKey = '511f0e4b3613ed97583cf0a13a5f547e'
    
    const apiCall = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${movieId}&with_watch_monetization_types=flatrate`


    const [moviesByGenre, setMoviesByGenre] = useState([])
    const [showPlayer, setShowPlayer] = useState(false)
    const [playerId, setPlayerId] = useState(null)

    useEffect(() => {
      import('./Player').then();
    }, []);

    const playerData = (openClose)=>{
      setShowPlayer(openClose)
    }

    const handlePlayer = (id)=>{
      setShowPlayer( showPlayer ? false : true )
      setPlayerId(id)
      console.log(showPlayer)
    }

    useEffect( ()=>{
        fetch(apiCall).then(res => res.json()).then(data => setMoviesByGenre(data.results))
    } ,[])

  return (
    <div className='min-h-[100vh] relative pt-3'>
      { showPlayer ? <Player id={playerId} playHandler={playerData} /> : null }
      <h1 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold mb-4'>{ `Top 20 movies` }</h1>
      <div>
        {moviesByGenre && moviesByGenre.length> 0 
        ?<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-16 xl:px-36 2xl:px-48 place-items-center gap-8'>
            {moviesByGenre.map( (movie) => {
                return(
                    <div className='rounded-md mt-2 overflow-hidden shadow-lg shadow-black h-[400px] relative'>
                        <div className='absolute flex gap-2 left-2 top-3'>
                            
                              <button onClick={()=>handlePlayer(movie.id)} className='play-hover cursor-pointer w-20 h-14 rounded-lg bg-[#38A633] grid place-items-center'>
                                <img className='w-7' src={playButton} alt="" />
                              </button>
                            
                            <div onClick={()=> addRevoveFav({
                              imgUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                              description: movie.overview,
                              title: movie.title,
                              id: movie.id
                            })} className='add-hover w-20 h-14 rounded-lg bg-rgba-70 grid place-items-center cursor-pointer'>
                              <img className='w-11' src={addIcon} alt="" />
                            </div>
                        </div>
                        <img className='genre-img w-full' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie img" />
                        <h2 className='mt-1 md:mt-3 text-center font-bold' >{movie.title}</h2>
                        <p className='px-2 lg:px-7 mt-1 lg:mt-3 text-sm lg:text-base tracking-tight'>{movie.overview}</p>
                    </div>
                )
            } )}
        </div>
        :<div>

        </div>
            }
      </div>
    </div>
  )
}

export default Genre
