import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import './components.css'
import Header from './Header'
import starIcon from '../images/star.svg'
import redHeartIcon from '../images/red-heart.svg'
import heartIcon from '../images/heart.svg'
import leftIcon from '../images/left.svg'
import rightIcon from '../images/right.svg'
import Player from './Player'

const apiKey = '511f0e4b3613ed97583cf0a13a5f547e'

export const List = () => {  
  const loader = useRef(null)
  const check = useRef(null)
  const [loaderVisibility, setLoaderVisibility] = useState('none')
  const [checkVisibility, setCheckVisibility] = useState('none')
  const [favImgVisibility, setFavImgVisibility] = useState('block')


  const favMovies = localStorage.getItem('favs')
  let tempMovies;
  if(!favMovies){
    tempMovies = []
  }else{
    tempMovies = JSON.parse(favMovies)
  }

  const favsList = JSON.parse(localStorage.getItem('favs')) 
  const [favs, setFavs] = useState(localStorage.getItem('favs'))  
  
  const addRemoveFavs = (e)=>{
    // console.log('added')
    // const btn = e.currentTarget.parentElement
    // const imgUrl = btn.querySelector('img').getAttribute('src')
    // console.log(imgUrl)    
    const movieData = {
      description: e.description,
      id:e.id,
      imgUrl: e.imgUrl,
      title: e.title
    }
    let isMovieInFavs = tempMovies.filter( fav => {
      return fav.id === e.id
    } )

    if (isMovieInFavs.length === 0){
      tempMovies.push(movieData)      
    }else {
      tempMovies = tempMovies.filter( fav=> {
        return fav.id !== movieData.id
      } )
    }    
    localStorage.setItem('favs', JSON.stringify(tempMovies))      
    setLoaderVisibility('block')
    setFavImgVisibility('hidden')
    setTimeout(() => {
      setLoaderVisibility('none')
      setFavImgVisibility('block')
    }, 1);
  }

  let initialItemsToShow;

  if( window.innerWidth < 900 ){
    initialItemsToShow = 3
  }else if(window.innerWidth > 900 && window.innerWidth <1200){
    initialItemsToShow = 6
  }else{
    initialItemsToShow = 8
  }

  const [movieList, setMovieList] = useState([])
  const [trendingList, setTrendingList] =useState([])
  const [itemsToSHow, setItemsToShow] = useState(initialItemsToShow)
  const [bannerInfo, setBannerInfo] = useState({})
  const [page, setPage] = useState('1')
  const [btnBgColor, setBtnBgColor] = useState(['#14C8B9', 'inherit', 'inherit', 'inherit', 'inherit'])
  const [showPlayer, setShowPlayer] = useState(false)
  const [playerId, setPlayerId] = useState(null)

  const navigate = useNavigate()
  let token = localStorage.getItem('token')
  useEffect(()=>{
    
    const apiCall = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate`
    axios.get(apiCall)
    .then( res =>{
      setMovieList(res.data.results)      
    } )
    

    const trendingCall = 'https://api.themoviedb.org/3/trending/movie/week?api_key=511f0e4b3613ed97583cf0a13a5f547e&append_to_response=videos'
    axios.get(trendingCall)
    .then(res =>{
      setTrendingList(res.data.results)      
      const {backdrop_path, title, overview, id, poster_path} = res.data.results[0]
      setBannerInfo( prevBannerInfo => ({
        ...prevBannerInfo,
        img:`https://image.tmdb.org/t/p/original${backdrop_path}`,
        poster:`https://image.tmdb.org/t/p/original${poster_path}`,
        title,        
        overview,
        id
      }))
    })
    .catch(err =>{
      swal(<h2>Something went wrong</h2>)
    })

    const sizeHandler = ()=>{
      if( window.innerWidth < 900 ){
        setItemsToShow(3)
      }else if(window.innerWidth > 900 && window.innerWidth <1200){
        setItemsToShow(6)
      }else{
        setItemsToShow(8)
      }
    }

    window.addEventListener('resize', sizeHandler)

  }, [page, favs])

  const selectMovie = (movie)=>{
    setBannerInfo({
      img:`https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      title: movie.title,
      genres:movie.genres,
      overview:movie.overview,
      id:movie.id,
      poster:movie.poster_path
    })
  }
  
  const updateButtonColors = (currentPage) => {
    const newBtnColors = [...btnBgColor];
    newBtnColors.fill('inherit');
    newBtnColors[currentPage - 1] = '#14C8B9';
    setBtnBgColor(newBtnColors);
  };
  
  const pageChangeHandler = (event) => {
    const pageNumber = event.currentTarget.innerText;
    setPage(pageNumber);
    updateButtonColors(pageNumber);
  };
  
  const arrowHandler = (side) => {
    if (page === '1' && side === 'left') {
      return;
    }
    if (page === '5' && side === 'right') {
      return;
    }
    if (side === 'left') {
      const pageNum = +page - 1;
      setPage(String(pageNum));
      updateButtonColors(pageNum);
    }
    if (side === 'right') {
      const pageNum = +page + 1;
      setPage(String(pageNum));
      updateButtonColors(pageNum);
    }
  };

  const handlePlayer = (id)=>{
    setShowPlayer( showPlayer ? false : true )
    setPlayerId(id)    
  }
  
  const playerData = (openClose)=>{
    setShowPlayer(openClose)
  }

  return (
    
    <div className='list overflow-hidden relative'>
    { !token && <Navigate to='/filmscope' replace={true} /> }
    <Header />
    { showPlayer && <Player id={playerId} playHandler={playerData} />}
    <div className='banner min-h-[100vh] w-[100vw]' style={{
      backgroundImage:`url('${bannerInfo.img}')`,
      textShadow: '2px 2px 2px black',
      overflow:'hidden'   

      }}>
      <div className='text-white pt-20 pl-5 lg:pl-20 xl:pl-28 xl:pt-28 2xl:pl-40 2xl:pt-52 h-[400px] xl:h-[370px] 2xl:h-[620px]'>
        
        <h2 className='text-2xl lg:text-3xl font-bold 2xl:text-4xl tracking-tight'>{Object.keys(bannerInfo).length>0 ? bannerInfo.title: null}</h2>        
        <img src={starIcon} alt="star-rating" className='w-8 mb-2' />    
        <div className="flex">
          <button className='px-1 w-16 tracking-tight text-sm h-12 bg-[#0f4847] hover:bg-[#1f9997]' onClick={()=>addRemoveFavs({
            imgUrl: `https://image.tmdb.org/t/p/original${bannerInfo.poster}`,
            description: bannerInfo.overview,
            title: bannerInfo.title,
            id: bannerInfo.id
            })}>{favsList ? (favsList.filter( (fav) =>{
              return fav.id === bannerInfo.id
            } ).length>0 ? 'remove' : 'add')
            : 'add'
          }
          </button> 
          <button className='w-16 h-12 bg-[#14c5b1] hover:bg-[#18e8d0]'><Link to={`/filmscope/detail?movieID=${bannerInfo.id}`}>details</Link></button>
          <button onClick={()=>handlePlayer(bannerInfo.id)} className='w-16 h-12 bg-green-300 hover:bg-green-200'>Play trailer</button>
        </div>   
        <p className='text-slate-300 max-w-[420px] 2xl:max-w-[470px] overflow-hidden mb-8 2xl:text-lg 2xl:mb-28'>{Object.keys(bannerInfo).length>0 ? (bannerInfo.overview.length > 315 ? bannerInfo.overview.substring(0, 315) + '...' : bannerInfo.overview ) : null }</p>
      </div>

      <div className='relative'>
        <div className='absolute -top-7 left-2'>
          <p className='bg-red-500 font-bold rounded-md text-center text-sm text-white px-2'>Trending</p>
        </div>

        <div className='flex justify-between px-2 mt-4 sm:px-24 md:px-32 lg:px-10 xl:px-8'>
          {trendingList.slice(0, itemsToSHow).map((trending)=>{
            return (
              <div key={trending.id} onClick={()=> selectMovie(trending)}  className='flex-none w-24 md:w-[122px] lg:h-[215px] 2xl:w-44 cursor-pointer'>
                <img src={'https://image.tmdb.org/t/p/w500' + trending.poster_path} className='border border-slate-300' alt="" />
                <p className='text-white font-semibold text-sm tracking-tight'>{trending.title}</p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
    <h2 className='text-xl xl:text-3xl font-extrabold text-center mt-7 tracking-tighter'>Popular movies</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-6 px-4 lg:px-10 xl:px-32 mt-14 lg:mt-20'>
          
      { movieList && movieList.map( (movie)=>{
        return (
          <div className='py-3 px-3 relative' key={movie.id}>
            <div 
            onClick={()=>addRemoveFavs({
              imgUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              description: movie.overview,
              title: movie.title,
              id: movie.id
            })} 
            className='absolute bg-[rgba(128,128,128,0.9)] cursor-pointer rounded-full w-9 right-5 top-4 hover:bg-gray-300 z-10 p-1' >
              {               
              favsList ? (
                favsList.find( search => search.id === movie.id ) ? <img src='https://img.icons8.com/emoji/256/heart-suit.png' className={favImgVisibility} /> : <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Heart_empty_font_awesome.svg/512px-Heart_empty_font_awesome.svg.png?20130126204600' className={favImgVisibility} />
              ) : null
              }
              <div className='flex justify-center items-center relative'>
                <div style={{display:loaderVisibility}} className='loader'></div>
                <div style={{display:checkVisibility}} className='check absolute hidden'><img className='w-5' src="./check.svg" alt="" /></div>
              </div>
            </div>
            <div className='mb-2'>
              <img className='rounded-t-lg' src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} alt="" />
            </div>
            <div>
              <h3 className='text-left text-xl lg:text-2xl font-bold h-9 lg:h-24 tracking-tight mb-6 xl:mb-1'>{movie.title.length>28 ? movie.title.substring(0, 28) + '...' : movie.title }</h3>
              <p className='text-left h-28 lg:h-36  2xl:h-28'>{movie.overview.substring(0, 140) + '...'}</p>
              <button className='bg-[#14C8B9] px-4 rounded-md font-bold text-lg mt-2 xl:mt-7'><Link to={`/filmscope/detail?movieID=${movie.id}`}> Show more </Link></button>
            </div>
        </div>
        )
      } ) }     
      
    </div>
    <div className='flex items-center gap-4 lg:gap-7 xl:gap-10 2xl:gap-14 justify-center mt-8 xl:mt-12'>
      <img src={leftIcon} className='w-6 hidden md:block' alt="" onClick={()=> arrowHandler('left')} />
      <div className='flex items-center gap-4 lg:gap-7 xl:gap-10 2xl:gap-14 text-slate-700 dark:text-slate-300'>
        <button className='cursor-pointer w-7 h-7 rounded-md' onClick={pageChangeHandler} style={{backgroundColor:btnBgColor[0]}}>1</button>
        <button className='cursor-pointer w-7 h-7 rounded-md' onClick={pageChangeHandler} style={{backgroundColor:btnBgColor[1]}}>2</button>
        <button className='cursor-pointer w-7 h-7 rounded-md' onClick={pageChangeHandler} style={{backgroundColor:btnBgColor[2]}}>3</button>
        <button className='cursor-pointer w-7 h-7 rounded-md' onClick={pageChangeHandler} style={{backgroundColor:btnBgColor[3]}}>4</button>
        <button className='cursor-pointer w-7 h-7 rounded-md' onClick={pageChangeHandler} style={{backgroundColor:btnBgColor[4]}}>5</button>
      </div>
      <img src={rightIcon} className='w-6 hidden md:block' alt="" onClick={()=> arrowHandler('right')} />
    </div>
    </div>
    
  )
}
