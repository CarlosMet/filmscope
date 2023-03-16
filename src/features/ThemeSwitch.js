import React, {useState, useEffect} from 'react'
import dark from '../images/dark.svg'
import light from '../images/light.svg'


const ThemeSwitch = () => {

    const [theme, setTheme] = useState("light")

    useEffect(()=>{
        if( theme === "dark" ){
            document.documentElement.classList.add("dark")
        }else{
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const  themeHandler = ()=>{
        setTheme( theme === "dark" ? "light" : "dark" )
    }

  return (
    <div>
        <button onClick={themeHandler}>
            {theme === 'dark' 
            ? <img className='w-6' src={light} />
            : <img className='w-6' src={dark} />
            }
        </button>
    </div>
  )
}

export default ThemeSwitch
