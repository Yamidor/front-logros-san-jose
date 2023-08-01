import React, {useEffect, useState} from 'react';
import { NavLink, Outlet} from "react-router-dom";
import Swal from 'sweetalert2'
 import '../styles/components/header.css'
const Header = (proms)=>{
    const{setIdUser} = proms
    const userName = localStorage.getItem('userName')
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    const close = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        setIdUser(null)
        Toast.fire({
            icon: 'success',
            title: 'Cerrando sistema'
        });
    }
    return(
        <>
        <header>
            <nav id='menu'>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/logros">Logros</NavLink></li>
                    <li><NavLink to="/activities">Actividades</NavLink></li>
                    <li><NavLink to="/viewPdf">Pdf</NavLink></li>
                </ul>
                <div className='user'>
                    <h3>{userName}</h3>
                    <button onClick={()=>close()}> Salir</button>
                    
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header