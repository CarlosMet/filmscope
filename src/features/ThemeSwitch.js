import React, {useState, useEffect} from 'react'


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
            ? <img className='w-6' src='/light.svg' />
            : <img className='w-6' src='/dark.svg' />
            }
        </button>
    </div>
  )
}

export default ThemeSwitch
