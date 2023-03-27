import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { addRevoveFav } from '../features/AddFavs'
import ThemeSwitch from '../features/ThemeSwitch'
import trashIcon from '../images/trash.svg'
import play from '../images/playing.svg'

const Favorites = () => {

    const token = localStorage.getItem('token')
    const favs = JSON.parse(localStorage.getItem('favs'))
    console.log(favs)
    const [cardsBgColor, setCardsBgColor] = useState('#E5E6E6')

    useEffect(() => {
      const observer = new MutationObserver(() => {
        if (document.documentElement.classList.contains('dark')) {
          setCardsBgColor('#0D0D0C');
        } else {
          setCardsBgColor('#E5E6E6');
        }
      });
    
      observer.observe(document.documentElement, { attributes: true });
    
      return () => observer.disconnect();
    }, []);
    

  return (
    <div className='min-h-[85vh] relative bg dark:bg-[#0f0f0f]'>
      <div className='fixed top-[50%] right-2 lg:right-10 bg-[rgba(31,31,31,0.8)] p-1 rounded-full w-8 h-8 z-10'>
          <ThemeSwitch />
        </div>
      <h2 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold'>My Favorites.</h2>
    {token === 'dummietoken' 

      ?<div className='grid grid-cols-1 place-items-center px-4'>
        {favs && favs.map( (fav)=>{
            return(
              <div className='my-6 flex flex-col-reverse md:flex-row h-[420px] w-[345px] md:w-[650px] md:h-[350px] xl:w-[740px] xl:h-80 relative rounded-xl overflow-hidden shadow-gray-500 shadow-xl dark:shadow-transparent' key={fav.id}>

                  <div className='absolute top-28 left-0 px-6 md:top-9'>
                    <div className='flex gap-6 items-center'> 
                    <div>
                      <img className='w-16 h-24' src={fav.imgUrl} alt={fav.title} />
                    </div>
                    <div>
                      <h2 className='font-bold text-lg tracking-tight'>{fav.title}</h2>                      
                    </div>
                    </div>
                    <p className='tracking-tight text-sm mt-5 w-full md:w-3/5 text-[#545454]'>{ fav.description ? (fav.description.length>140 ? fav.description.substring(0, 140) + '...' : fav.description)
                    : null  
                  }</p>
                  </div>
                  <div className='absolute flex items-center gap-3 bottom-4 text-black left-8'>
                    <button onClick={()=> addRevoveFav(
                      {
                        imgUrl: `https://image.tmdb.org/t/p/original${fav.imgUrl}`,
                        description: fav.description,
                        title: fav.title,
                        id: fav.id
                      }
                    )}>
                      <img className='w-6 lg:w-7' src={trashIcon} alt="remove" />
                    </button>
                    <button>
                      <Link to={`/filmscope/detail?movieID=${fav.id}`} >
                        <img className='w-6 lg:w-7 mt-1' src={play} alt="" />
                      </Link>
                    </button>
                  </div>

                <div className='flex bg-color w-full h-1/2 md:h-full md:w-1/2 bg-[#E5E6E6] dark:bg-[#0D0D0C]'>
                  
                </div>

                <div 
                  className='bgimg w-full h-1/2 md:h-full md:w-1/2' 
                  style={{
                    backgroundImage: `linear-gradient(to right, ${cardsBgColor}, transparent), url(${fav.imgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                </div>
                
                
              </div>                
            )
        } )}
      </div>
      : <Navigate to={'/filmscope'} />
      
    }
    </div>
  )
}

export default Favorites
