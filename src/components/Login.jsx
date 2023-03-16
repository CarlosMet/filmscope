import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
 

const Login = () => {
    let token = localStorage.getItem('token')
    const navigate = useNavigate()        

    const submitHandler = (event)=>{
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value        

        const regexEmail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

        if(email === '' || password === ''){
            swal(
                <div>
                    <h2>Fields can not be empty</h2>
                    <p>Please try again</p>
                </div>
            )
            return;
        }

        if(email !== '' && !regexEmail.test(email)){
            swal(
                <div>
                    <h2>insert a valid mail</h2>
                    <p>The email you entered is not valid</p>
                </div>
            )
            return;
        }

        if ( regexEmail.test(email) && password.length<8 ){
            swal(
                <p>Password must contain more than 8 characters</p>
            )
        }else if(regexEmail.test(email) && password.length>=8){
            console.log("successfully logged")
        //     axios.post('http://challenge-react.alkemy.org', { email, password })
        //     .then( res => {                
        //         const token = res.data.token
        //         swal(<h2>Succesfully logged in</h2>)
        //         // localStorage.setItem('token', token);  
        //         localStorage.setItem('token', token)              
        //         navigate('/list')
        //     } )
        // }
            localStorage.setItem('token', 'dummietoken')
            swal(<h2>Succesfully logged in</h2>)
            navigate('/list')
        }
            
    }

    

  return (
    <>
    { token && <Navigate to='/list'/> }
    <div className='login py-24 lg:py-28 2xl:py-48'>
        <form onSubmit={submitHandler} className='flex flex-col max-w-[280px] mx-auto gap-2 items-center py-20 lg:max-w-[350px] text-white rounded-xl'>
            <h2 className='text-xl font-bold mb-3'>Sign in</h2>
            <label htmlFor="">
                <span className='font-semibold'>Email:</span><br />
                <input className='border bg-gray-500 rounded-md w-[200px] px-2' type="email" name='email' />
            </label>
            <label htmlFor="">
                <span className='font-semibold'>Password:</span><br />
                <input className='border bg-inherit rounded-md w-[200px] px-2' type="password" name='password' />
            </label>
            <button className='bg-[#14C8B9] w-[200px] rounded-md mt-6' type='submit'>Sign in</button>
            <p className='text-white'> Note: This is a dummie login* </p>
        </form>

    </div>
    </>
  )
}

export default Login