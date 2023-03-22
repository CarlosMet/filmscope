import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import './components.css'
import starIcon from '../images/star.svg'
import halfStarIcon from '../images/hs.svg'
import emptyStar from '../images/empty.svg'
import oneStarIcon from '../images/onestar.svg'
import ThemeSwitch from '../features/ThemeSwitch'
import { addRevoveFav } from '../features/AddFavs'

const Detail = () => {

  let token = localStorage.getItem('token')
  const [detailsBg, setDetailsBg] = useState('')
  // const [movieid, setMovieid] = useState(query.get('movieID'))
  // let id = query.get('movieID')
  let query = new URLSearchParams(window.location.search)
  let id = query.get('movieID')
  const apiKey = '511f0e4b3613ed97583cf0a13a5f547e'
  const apiCall = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
  const secondApiCall = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  const thirdApiCall = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`


  const [movieVideo, setMovieVideo] = useState('')
  
  const [movieDetails, setMovieDetails] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [starsToShow, setStarsToShow] = useState(['','','','',''])
  console.log(window.location.href)
  const [location, setLocation] = useState(window.location.href)

  useEffect(()=>{
    window.scrollTo(0, 0)
    fetch(apiCall)
    .then(res => res.json())
    .then( data =>{      
      setMovieDetails(data)  
      setDetailsBg(`https://image.tmdb.org/t/p/w500${data.backdrop_path}`)         
      const movieTrailer = data.videos?.results.filter( trailer => {
        return trailer.name.includes('Trailer')
      } )      
      const {key} = movieTrailer[0]
      // console.log(movieTrailer)
      setMovieVideo(key)
    } )

    fetch(secondApiCall)
    .then(res=> res.json())
    .then( dat => {      
      const {results} = dat
      setRecommendations(results)
    } )

    fetch(thirdApiCall).then(res => res.json())
    .then(data => {
      const {results} = data
      setReviews(results)          
    })
  }, [location])

  const showStars = rating =>{
    let integer = Math.floor(rating/2)
    let decimal = (rating/2) - Math.floor(rating/2)
    let halfStar = false
    let stars = ['', '', '', '', '']
    

    if (decimal> 0.84){
      integer++
      halfStar = false
    }else if(decimal < 0.25){
      integer = integer
      halfStar = false
    }else{
      integer = integer
      halfStar = true
    }

    if(halfStar) {      
      stars[Math.floor(rating/2)] = 'half'
      for( let i = 0; i< integer; i++ ){
        stars[i] = 'full'        
      }
    }else{
      for( let i = 0; i< integer; i++ ){
        stars[i] = 'full'        
      }
    }    
    return stars
  }
  

  return (
    <div className=''>
      {!token && <Navigate to={'/filmscope'} />}
      {token && movieDetails
      ?<div className='relative' >
        <div className='fixed top-[35%] right-2 lg:right-10 bg-[rgba(31,31,31,0.8)] p-1 rounded-full w-8 h-8'>
          <ThemeSwitch />
        </div>

        <div style={{backgroundImage:`linear-gradient(rgba(5, 7, 12, 0.90), rgba(5,7,12,0.90) ), url(${detailsBg})`,
        backgroundSize:'cover',
        backgroundPosition:'right',
        minHeight:'100vh'
      
        }} className="py-16 md:py-3 xl:py-16 2xl:py-32 px-3 md:px-12 lg:px-24 xl:px-36 2xl:px-52">
          <h2 className="text-3xl text-white font-bold mb-4">{movieDetails.title}</h2>
          <p className="text-slate-300 text-sm mb-2">Release Date: {movieDetails.release_date}</p>
                        
          <div className='flex lg:hidden items-center gap-3 mt-2 mb-2'>
            <img src={starIcon} className='w-6' />
            <p className='text-slate-400'><span className='text-lg text-slate-200 font-semibold'>{movieDetails.vote_average? movieDetails.vote_average.toFixed(2) : null}</span> / 10</p>
            <span className='text-slate-400'>.</span>
            <p className='text-slate-400'>{movieDetails.vote_count} votes</p>
          </div>

          <div className='flex gap-2 md:gap-6'>
            <div className="w-1/3 lg:w-1/5">
              <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className=""/>
            </div>

            <div className=" w-2/3 lg:w-4/5">        
              <p className="md:text-lg text-slate-300 2xl:max-w-[800px]">{movieDetails.overview}</p>  
              <button onClick={()=> addRevoveFav({
                imgUrl: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
                description: movieDetails.overview,
                title: movieDetails.title,
                id: movieDetails.id
              })}>add</button> 
              <p className='text-white text-lg hidden lg:block mt-2 xl:mt-4 2xl:mt-9 font-semibold'>Rating:</p>              
              <div className='hidden lg:flex items-center gap-3 mt-2 2xl:mt-6'>
                <img src={starIcon} className='w-6' />
                <p className='text-slate-400'><span className='text-lg text-slate-200 font-semibold'>{movieDetails.vote_average ? movieDetails.vote_average.toFixed(2) : null }</span> / 10</p>
                <span className='text-slate-400'>.</span>
                <p className='text-slate-400'>{movieDetails.vote_count} votes</p>
             </div>                 
                                
            </div> 

          </div>  
          <p className="text-white font-medium mb-2 mt-3 lg:mt-5 2xl:mt-8">Genres:</p> 
          <div className="text-lg text-gray-200 flex flex-wrap gap-2 xl:mt-6">{movieDetails.genres && movieDetails.genres.length > 0 ? movieDetails.genres.map(genre => <p key={genre.id} className=' border border-slate-400 rounded-3xl px-4 py-2 cursor-pointer hover:bg-slate-800'>{genre.name}</p>) : 'Unknown'}
          </div>     
      </div>
        <div>
          <h2 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold mt-3 lg:mt-6 xl:mt-10'>Official trailer.</h2>
          {movieDetails.videos 
          ?<div className='mt-6'>
            <YouTube
              videoId={movieVideo}
              className={'youtube'}
              opts={{
                width: '100%',
                height: '100%'    
              }}
              
            />
          </div>  
          : null
        }
        </div>
        <div>
          <h2 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold mt-3 lg:mt-6 xl:mt-10'>Related movies</h2>

          <div className='flex my-6 lg:my-9 xl:my-12 2xl:my-16'>
          {recommendations ? 
            recommendations.slice(0,4).map( (recommended) => {
              return(                
                  <div key={recommended.id}>
                    <Link onClick={()=> setLocation(recommended.id)} to={`/filmscope/detail?movieID=${recommended.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${recommended.poster_path}`} />
                    </Link>
                  </div>                
              )
            } )
            : null
          }
          </div>

        </div>
        <div>
          <h2 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold mt-3 lg:mt-6 xl:mt-10'>Reviews</h2>

          <div className='grid grid-cols-1 gap-2 mt-3 lg:mt-6 xl:mt-12'>
          {reviews && reviews.length>0
            ? reviews.slice(0, 5).map( (review)=>{
              const starRating = showStars(review.author_details?.rating)
              return(
                <div key={review.id} className='flex gap-2 md:gap-4 lg:gap-8 p-6 w-[340px] md:w-[600px] lg:w-[850px] xl:w-[1000px] 2xl:w-[1200px] mx-auto'>
            
                    
                  <img className='avatar' src={ review.author_details?.avatar_path ?  (review.author_details?.avatar_path.includes('gravatar') ? 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png' : `https://image.tmdb.org/t/p/w500${review.author_details?.avatar_path}`) :null } />
                    

                  <div className=''>
                    <p className='text-lg font-bold'>{review.author}</p>   
                    
                    <div className='flex gap-1'>
                      {starRating.map( (singleStar, index) =>{
                         return(
                          <img className='w-4' key={index} src={singleStar === '' ? emptyStar : ( singleStar === 'full' ? oneStarIcon : (singleStar ==='half' ? halfStarIcon : '') ) } />
                         )
                      } )}
                    </div>
                    <p className='mt-4 tracking-tight text-sm md:text-base'>{review.content.length > 240 ? review.content.replace(/[\r\n]/g, "").substring(0, 240) + '...' : review.content.replace(/[\r\n]/g, "") }</p>
                  </div>

                </div>
              )
            } )
            
            : <div className='grid place-items-center'>
              <p>There are no reviews for this movie</p> 
              <img className='w-8' src='https://uxwing.com/wp-content/themes/uxwing/download/animals-and-birds/spider-icon.svg' />
            </div>
          }
          </div>

        </div>
        
      </div>
      :<div className=''>
        <div className=''>
          <div className='loading w-9 h-9 lg:w-11 lg:h-11 border-4 border-gray-400 mx-auto rounded-full border-t-transparent my-54'></div>          
        </div>
      </div>
      }
     
    </div>
  )
}

export default Detail
