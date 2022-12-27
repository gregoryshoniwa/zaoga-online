
import { useNavigate } from 'react-router-dom'
import { useContext,useEffect, useRef } from 'react';
import { UserContext } from '../contexts/UserContext'
import jwt_decode from "jwt-decode";


export const Login = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()

    const userNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
   
    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        if (loggedInUser) {
          const foundUser = loggedInUser;
          let decoded:any = jwt_decode(foundUser);
          userContext?.setUser({
                id: decoded.user.id,
                username: decoded.user.username,
                firstname: decoded.user.firstName,
                lastname: decoded.user.lastName,
                rank: decoded.user.rank,
                role: decoded.user.role,
                token: foundUser
            })
            navigate('home')
        }
      }, [navigate, userContext]);

    
    
    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await postData()
        
    }

    const postData = async () => {
        const postData = {
            name: "generateToken",
            param: {
              username: userNameRef.current?.value,
              password: passwordRef.current?.value
            }
        };
    
        try {
          const res = await fetch(`http://zaoga-online.co.zw/api/`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "token-value",
            },
            body: JSON.stringify(postData),
          }); 
          const data = await res.json();
          
          if(data.response.result.token){
            localStorage.setItem('token',JSON.stringify(data.response.result.token))
            let decoded:any = jwt_decode(data.response.result.token);
            await userContext?.setUser({
                id: decoded.user.id,
                username: decoded.user.username,
                firstname: decoded.user.firstName,
                lastname: decoded.user.lastName,
                rank: decoded.user.rank,
                role: decoded.user.role,
                token: data.response.result.token
            })
            navigate('home')
          }else{
            await userContext?.setUser(null)
            console.log(data.response.result)
          }
          
        } catch (err) {
            console.log(err)
        }
      }

    return ( 
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="UserName" ref={userNameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type='submit'>login</button>
        </form>
     );
}
