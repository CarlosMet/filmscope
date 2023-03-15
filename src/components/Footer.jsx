import React from 'react'

const Footer = () => {
  return (
    <div className='mt-6 lg:mt-12 xl:mt-16 grid place-items-center bg-black'>
      <footer>

        <div className='bg-[black] py-12 px-2 lg:px-12 md:flex items-center md:gap-8 lg:gap-12 xl:gap-20 2xl:gap-28'>
          <div>
            <p className='text-3xl tracking-tight xl:text-4xl 2xl:text-5xl font-bold text-[#14C8B9] mb-8 md:mb-0'>FilmScope</p>
          </div>
          <div className="flex gap-8 md:gap-12 lg:gap-16 xl:gap-24 2xl:gap-36">

            <div className='text-white'>
              <h3 className='mb-6 lg:mb-8 font-bold h-8'>Discover</h3>
              <ul className='tracking-tight'>
                <li>Trending movies</li>
                <li>Popular movies</li>
                <li>Get recommendations</li>
                
              </ul>
            </div>
            <div className='text-white'>
              <h3 className='mb-6 lg:mb-8 font-bold h-8'>Features</h3>
              <ul className='tracking-tight'>
                <li>Trailers</li>
                <li>Search</li>                
              </ul>
            </div>

          </div>
        </div>

      </footer>
      <p className='text-white'>By Carlosmet</p>
    </div>
  )
}

export default Footer
