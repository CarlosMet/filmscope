import React from 'react'
import { Navigate } from 'react-router-dom'

const Favorites = () => {

    const token = localStorage.getItem('token')
    const favs = JSON.parse(localStorage.getItem('favs'))
    

  return (
    <div>
      <h2 className='text-center text-xl lg:text-2xl xl:text-3xl font-bold mt-3 lg:mt-6 xl:mt-10'>My Favorites.</h2>
    {token === 'dummietoken' 

      ?<div className='mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 place-items-center'>
        {favs && favs.map( (fav)=>{
            return(
                <div className='shadow-black shadow-lg flex flex-col items-center rounded-xl overflow-hidden max-w-[172px] h-[210px] md:max-w-[200px] mb-10 md:h-64 pb-1'>
                  <div>
                    <img className='h-28 w-[172px] md:w-[200px] md:h-36' src={fav.imgUrl} alt={fav.title} />
                  </div>
                  <div className='px-2 overflow-scroll'>
                    <h2 className='font-bold tracking-tight text-lg'>{fav.title}</h2>
                    <p className=' leading-tight text-sm'>{fav.description}</p>
                  </div>
                </div>
            )
        } )}
      </div>
      : <Navigate to={'/'} />
      
    }
    </div>
  )
}

export default Favorites
