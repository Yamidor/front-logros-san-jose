import React, {useEffect, useState} from 'react';
import { Outlet} from "react-router-dom";
import '../styles/components/main.css'
const Main = ()=>{
    
    return(
        <>
        <main className='bg-gray-800'>
            <Outlet/>
        </main>
        </>
    )
}

export default Main