import React, {useState} from 'react';
import Swal from 'sweetalert2'
import { AuthService } from '../domain/services/AuthService'
import '../styles/components/login.css'
const Login = (proms)=>{
    const{setIdUser} = proms
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
    const [datosLogin, setDatosLogin] = useState({
        user: "",
        password: ""
      });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatosLogin((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
        });
      }
    const start = async()=>{
      try {
        Toast.fire({
          icon: 'success',
          title: 'Bienvenido'
        });
        const response = await AuthService.postLogin(datosLogin.user, datosLogin.password)
        localStorage.setItem('user', response.id);
        setIdUser(localStorage.setItem('user', response.id))
        localStorage.setItem('userName', response.nombres);
        
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'El usuario no existe'
        });
        
      }
       


    }
    return(
        <>
        <div className="container">
          <form>
            <h1>Iniciar sesión</h1>
            <label htmlFor="username">Usuario:</label>
            <input type="text"  
                name='user' 
                placeholder='Digita usuario'
                onChange={handleChange} 
                value={datosLogin.user}/>
                
            <label htmlFor="password">Contraseña:</label>
            <input type="password"  
                name='password' 
                placeholder='Digita password'
                onChange={handleChange} 
                value={datosLogin.password}/>
  
            
          </form>
          <button onClick={()=>start()}>Ingresar</button>
        </div>
        
        </>
    )
}

export default Login