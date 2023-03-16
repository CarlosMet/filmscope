import React, { useState, useEffect, useRef } from 'react'
import ThemeSwitch from '../features/ThemeSwitch'
import { Link } from 'react-router-dom'
import axios from 'axios'
import searchIcon from '../images/search.svg'

const Header = () => {

  const [bgColor, setBgColor] = useState('rgba(0,0,0,0.2)')  
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [darkModeVisibility, setDarkModeVisibility] = useState(false)
  const [inputWidth, setInputWidth] = useState('70px')
  const [query, setQuery] = useState('')
  const [searchData, setSearchData] = useState([])
  const [menuVisibility, setMenuVisibility] = useState('none')

  useEffect(()=>{
    const scrollHandler = ()=>{
      if( window.scrollY < 180 ){
        setBgColor('rgba(0,0,0,0.35)')
        setDarkModeVisibility(false)
      }else{
        setBgColor('black')
        setDarkModeVisibility(true)
      }
    }
    window.addEventListener('scroll', scrollHandler)
    
    //  eliminar el listener del evento cuando se desmonte el componente
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
    
  },[token])

  const logoutHandler = ()=>{
    localStorage.removeItem('token')
  }
  const inputResize =()=>{
    if(window.innerWidth < 420){
      setInputWidth('115px')
    }else{
      setInputWidth('190px')
    }
  }
  const inputBlur = (e)=>{
    setInputWidth('70px')
    setTimeout(()=>{
      setSearchData([])
      e.target.value = ''
    }, 200)
  }

  const getQuery = async(e)=>{
    setQuery(e.target.value)
    try {
      const {data: {results}} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=511f0e4b3613ed97583cf0a13a5f547e&query=${e.target.value}`) 
      setSearchData(results)
    }       
    catch(error){
      console.log(error)
    }
  }
  const line1 = useRef(null)
  const line2 = useRef(null)
  const line3 = useRef(null)
  const toggleLines = ()=>{
    line1.current.classList.toggle('menuline1')
    line2.current.classList.toggle('menuline2')
    line3.current.classList.toggle('menuline3')
    if(menuVisibility === 'none'){
      setMenuVisibility('block')
    }else{
      setMenuVisibility('none')
    }
    
  }

  return (
    <>    
    <header className='nabvar fixed top-0 left-0 w-full border-b-[0.1px] border-[#313C3E] z-10'>

      <nav className='flex items-center px-2 justify-between lg:px-5 xl:px-12 2xl:px-18 h-[65px]' style={{backgroundColor:bgColor}}>

        <div className='relative'>
          <button onClick={toggleLines} className='flex flex-col gap-[3px] lg:hidden cursor-pointer z-30'>
            <div ref={line1} className='w-7 h-[3px] bg-[#14C8B9]'></div>
            <div ref={line2} className='w-3 h-[3px] bg-white'></div>
            <div ref={line3} className='w-7 h-[3px] bg-white'></div>
          </button>
          <div className="py-24 text-center block lg:hidden -z-10 absolute -top-8 -left-2 bg-white dark:bg-gray-900 w-[100vw] h-[103vh]" style={{display:menuVisibility}}>
            <Link className='' to={'/'}><div className='my-5 flex gap-2 items-center w-24 mx-auto'><img className='w-9' src="./home.svg" alt="home" /><p className='text-lg font-semibold'>Home</p></div></Link>
            <Link to={'/favs'} ><div className='my-5 flex gap-2 items-center w-24 mx-auto'><img className='w-9' src="./like.svg" alt="like" /><p className='text-lg font-semibold'>Favorites</p></div></Link>
            <div className='border mt-16 w-16 mx-auto pt-1 border-slate-500 rounded-lg dark:border-white'><ThemeSwitch /></div>
            <button className='mt-2' onClick={logoutHandler}>
            <Link to='/'>
              <div className='flex gap-4 items-center w-32 mx-auto'>
                <img className='w-9' src="./avatar.svg" alt="" />
                <p className=''>{token ? 'log out' : null}</p>
              </div>
            </Link>
            </button>
          </div>
        </div>

        <div className='text-[#14C8B9] text-2xl md:text-3xl font-extrabold xl:text-4xl ml-9 lg:ml-0'>
          <Link to='/'>
            FilmScope
          </Link>
        </div>

        <div className='hidden lg:block text-slate-300 font-semibold'>
          <ul className='flex gap-12 xl:gap-20 items-center'>
            <li className='hover:text-[#14C8B9] nav-option'>
              <Link to='/'>
                Home
              </Link>
            </li>
            <li className='hover:text-[#14C8B9] nav-option'>
              <Link to='/favs'>
                Favorites
              </Link>
            </li>
            <li className='hover:text-[#14C8B9] nav-option'>
              <Link to='/contact'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center gap-6'>

          <div>
            <div className='w-[140px] flex justify-center lg:justify-end'>
              <div className='border-b border-slate-500 relative' style={{width:inputWidth, transition: 'width 0.5s ease'}}>
                <input type="text" className='bg-transparent text-white px-5 md:w-full focus:outline-none' onChange={getQuery} onClick={inputResize} onBlur={inputBlur}/>
                <img src={searchIcon} className='w-7 p-1 top-0 -left-1 absolute' />
              </div>
            </div>
          <div className='relative'>
            {query !== '' && searchData.length>0 &&
              <div className='w-[280px] lg:w-[440px] absolute right-0 bg-[#313131] text-slate-300 py-3 rounded-b-xl'>
                {searchData.slice(0, 4).map((moviefound) =>{
                  return(
                    
                      <div key={moviefound.id} className="pb-4">
                      <div className="flex gap-3 px-4">
                        <div className='py-2'>
                          <img src={`https://image.tmdb.org/t/p/w300${moviefound.poster_path}`} className="w-20" alt="" />
                        </div>
                          <Link to={`/detail?movieID=${moviefound.id}`} onClick={()=>console.log('clicked')}>
                        <div>
                            <p className='text-white font-bold text-lg'>{moviefound.title}</p>
                            <p>{moviefound.overview.slice(0,50) + '...'}</p>
                        </div>
                          </Link>
                      </div>
                      <hr className='bg-slate-200' />
                    </div>
                    
                   
                  )
                })}
              </div>
            }
          </div>

          </div>
          
          <div className='hidden lg:flex gap-2'>
            <button className='hidden lg:block text-slate-300' onClick={logoutHandler}>
            <Link to='/'>
              {token ? 'log out' : null}
            </Link>
            </button>
            {darkModeVisibility && <ThemeSwitch />}
          </div>
        </div>

      </nav>

    </header>
    
    </>
  )
}

export default Header