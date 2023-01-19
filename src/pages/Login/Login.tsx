
import { useNavigate } from 'react-router-dom'
import { useCallback,useEffect, useRef,useState } from 'react';



import bcrypt from "bcryptjs-react";
import jwt_decode from "jwt-decode";
import './Login.css';
import Logo from '../../assets/logo.png';
import Swal from 'sweetalert2';
import { Loader } from '../../components/Loader/Loader';

import { useDispatch } from "react-redux";
import { login, offlineLogin } from "../../slices/auth";

 
 

export const Login = () => {
    
    const [loading, setLoading] = useState(false);
    const [loadingOffline, setLoadingOffline] = useState(false);
    const navigate = useNavigate()

    
    const dispatch = useDispatch();

  
    const userNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    
    const getStoredUserToken = useCallback(async () =>{
      const loggedInUserToken = await localStorage.getItem("token");
      if (loggedInUserToken) {
        
        
         dispatch(offlineLogin(loggedInUserToken))
         navigate('home')
        
      }
    
    },[dispatch, navigate])


    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if(!userNameRef.current?.value) {
          
          Swal.fire({
            title: 'Error!',
            text: 'Please enter a valid username or email or phone number',
            icon: 'error'
          })
        }
        else if(!passwordRef.current?.value) {
          
          Swal.fire({
            title: 'Error!',
            text: 'Please enter a valid password',
            icon: 'error'
          })
        }
        else{
          await postData()
        }
        
        
    }

    const postData = async () => {
      setLoading(true)
      let username = userNameRef.current?.value;
      let password = passwordRef.current?.value;

      dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
        setLoading(false);
        console.log("login")
      })
      .catch((err:any) => {
        setLoading(false);
        setLoadingOffline(true);

        const loggedInUser:any = localStorage.getItem("user");
        
            if(loggedInUser){
              let decoded:any = jwt_decode(loggedInUser);
             
              const password:any = passwordRef.current?.value;
              const username:any = userNameRef.current?.value;

             
              if(bcrypt.compareSync(password, decoded.user.password)){
                
                  if(username === decoded.user.username){
                    setLoadingOffline(false)
                    
                    dispatch(offlineLogin(loggedInUser))
                    localStorage.setItem("token", loggedInUser);
                    navigate('home')
                    
                  }else{
                    setLoadingOffline(false)
                    Swal.fire({
                      title: 'Error!',
                      text: 'Please enter a valid username or email or phone number',
                      icon: 'error'
                    })
                  }
              }else{
                  setLoadingOffline(false)
                  Swal.fire({
                    title: 'Error!',
                    text: 'Please enter a valid password',
                    icon: 'error'
                  })
              }
             
              
            }else{
              console.log(err)
            }
        console.log(err)
      });
    //   const postData = {
    //     name: "generateToken",
    //     param: {
    //       username: userNameRef.current?.value,
    //       password: passwordRef.current?.value
    //     }
    // };
    
    //     try {
         
    //        const res = await fetch(`http://zaoga-online.co.zw/api/`, {
    //         // const res = await fetch(`https://zaoga-online.grebles.co.zw/api/`, {
    //           method: "post",
    //           headers: {
    //             "Content-Type": "application/json",
    //             "x-access-token": "token-value",
    //           },
    //           body: JSON.stringify(postData),
    //         }); 
    //         const data = await res.json();
          
    //       if(data.response?.result?.token){
    //         localStorage.setItem('token',data.response.result.token)
    //         localStorage.setItem('user',data.response.result.token)
    //         let decoded:any = jwt_decode(data.response.result.token);
    //         await userContext?.setUser({
    //             id: decoded.user.id,
    //             username: decoded.user.username,
    //             firstname: decoded.user.firstName,
    //             lastname: decoded.user.lastName,
    //             token: `Bearer ${data.response.result.token}` 
    //         })
    //         setLoading(false)
    //         // setLoading(false)
    //         navigate('home')
    //         console.log(userContext)
    //       }else{
    //         setLoading(false)
    //         // setLoading(false)
    //         await userContext?.setUser(null)
    //         Swal.fire({
    //           title: 'Error!',
    //           text: data.response?.result,
    //           icon: 'error'
    //         })
    //         // console.log(data.error?.message)
    //       }
          
    //     } catch (err) {
    //         setLoading(false)
    //         // setLoading(false)
    //         setLoadingOffline(true)
            
    //         const loggedInUser:any = localStorage.getItem("user");
    //         if(loggedInUser){
    //           let decoded:any = jwt_decode(loggedInUser);
             
    //           const password:any = passwordRef.current?.value;
    //           const username:any = userNameRef.current?.value;

             
    //           if(bcrypt.compareSync(password, decoded.user.password)){
    //               if(username === decoded.user.username){
    //                 setLoadingOffline(false)
    //                 await userContext?.setUser({
    //                   id: decoded.user.id,
    //                   username: decoded.user.username,
    //                   firstname: decoded.user.firstName,
    //                   lastname: decoded.user.lastName,
    //                   token: loggedInUser
    //                 })
    //                 navigate('home')
                    
    //               }else{
    //                 setLoadingOffline(false)
    //                 Swal.fire({
    //                   title: 'Error!',
    //                   text: 'Please enter a valid username or email or phone number',
    //                   icon: 'error'
    //                 })
    //               }
    //           }else{
    //               setLoadingOffline(false)
    //               Swal.fire({
    //                 title: 'Error!',
    //                 text: 'Please enter a valid password',
    //                 icon: 'error'
    //               })
    //           }
             
              
    //         }else{
    //           console.log(err)
    //         }
   
            
    //     }
      }


      useEffect(() => {
          // dispatch(clearMessage());
          getStoredUserToken() 
        }, [getStoredUserToken,dispatch]);
  

    return ( 
      <>
              <Loader text='Logging In Online.....' loading={loading} />
              <Loader text='Logging In Offline.....' loading={loadingOffline} />
              <div className='loginContainer'>         
                      <div className='form'>            
                          <img width="230" alt="zaoga-logo" src={Logo}/>
                          <form onSubmit={handleLogin}>
                        
                              <input className='formInput' ref={userNameRef} type="text" placeholder="User ID"/>
                              <input className='formInput'  ref={passwordRef} type="password" placeholder="Password"/>
                              <button className='loginButton' type='submit'>login</button>               
                          </form>
                      </div>
              </div>

       
      </>  
     );
}
