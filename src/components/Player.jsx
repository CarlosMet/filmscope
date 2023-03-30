import React, { useEffect, useState } from "react"
import YouTube from "react-youtube"

const Player = ({id, playHandler})=>{
    const apiKey = '511f0e4b3613ed97583cf0a13a5f547e'
    const apiCall = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    

    const [playerKey, setPlayerKey] = useState(null)
    const [playerDisplay, setPlayerDisplay] = useState('grid')
    const playerHandler = ()=>{
        playHandler(false)       
    }
    

    useEffect(()=>{
        setPlayerDisplay('grid')
        fetch(apiCall)
        .then(res => res.json())
        .then(movie => {
            const movieVideo = movie.videos.results.filter( (result) => {
                return (
                    result.name.includes('Trailer')
                )
            } )     
            const movieKey = movieVideo[0].key      
            console.log(movieKey)
            setPlayerKey(movieKey)
            
        })
        
    }, [apiCall])

    return(
        <div
        onClick={playerHandler}
        // style={{display:playerDisplay}} 
        className="fixed grid z-30 min-h-[100vh] bg-rgba-70 min-w-[100vw] top-0 left-0 place-items-center">
            <YouTube
                videoId = {playerKey}
                className={'youtube'}
                opts={{
                width: '100%',
                height: '100%'    
              }}
            />
        </div>
    )
}

export default Player