import React, { useState, useEffect }from 'react';
import {Outlet} from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from "../containers/Login";
import '../styles/components/app.css'


const Layout = ()=>{
    const [idUser, setIdUser] = useState(null)
    useEffect(() => {
        setIdUser(localStorage.getItem('user'))
    }, [idUser])
    
    
    return(
        <>
        {idUser?
        <>
        <Header setIdUser={setIdUser}/>
        <Main/>
        <Footer/>
        </>
        :
        <Login setIdUser={setIdUser} />
        }
        </>
    )
}

export default Layout