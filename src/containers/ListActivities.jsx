import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect, useNavigate } from "react-router-dom";
import { faPencilSquare, faFilePdf, faListAlt, faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { AchievementService } from '../domain/services/AchievementService'
import { activityService} from '../domain/services/ActivityService'
import { CourseService } from '../domain/services/CourseService'

import '../styles/containers/listActivities.css'

const ListActivities = ()=>{
    const [achievements, setAchievements] = useState([])
    const [activities, setActivities] = useState([])
    const [courses, setCourses] = useState([])
    const navigate = useNavigate();
    const id_user = localStorage.getItem('user')
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
    const formLogro = (id)=>{
        
        Swal.fire({
            title: "Registrar Actividad",
            html: `
            <form id="formUser">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Nombre Actividad(*):</label>
                    <textarea id="nombre" name="nombre" rows="4" cols="50"></textarea><br><br>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                  <label for="normal">Selecciona el tipo de actividad:</label><br>
                  <select id="normal" name="normal">
                      <option value="true">Normal</option>
                      <option value="false">Recuperación</option>
                  </select><br><br>
                  </div>
                </div>
              </div>                                                                              
            </form>`,
            customClass: {
              container: 'custom-swal-container',
              popup: 'custom-swal-popup',
              content: 'custom-swal-content'
            },
            preConfirm:() => {
                const nombre = Swal.getPopup().querySelector('#nombre').value;
                const normal = Swal.getPopup().querySelector('#normal').value;
                const logroId = id
                return{
                  nombre,
                  normal,
                  logroId
                } 
            }
        }).then(async(e) => {
            if (e.value.nombre && e.value.normal) {
                try {
                  Toast.fire({
                    icon: 'success',
                    title: 'Actividad registrada'
                });
                await activityService.createActivite(JSON.stringify(e.value))
                await AchievementService.getAchievements(id_user).then(setAchievements)
              } catch (error) {
                Toast.fire({
                  icon: 'error',
                  title: 'No se pudo resgitrar actividad'
                });
              } 
            }else{
              Toast.fire({
                  icon: 'error',
                  title: 'Debes ingresar los campos obligatorios'
                });
            }
        });
    }

    const viewActivities  = async (id)=>{
        const res= await activityService.getActivitesById(id)
        console.log(res)
        Swal.fire({
            title: 'Actividades para este logro',
            html: `<div class="container">
                      <div class="row">
                          <div class="col-md-6 bg-primary text-white">
                              <h2>Actividades</h2>
                              <ul class="list-group">
                                ${res.map((activity, index) => activity.normal? `<li class="list-group-item" key=${index}>${activity.nombre}</li>`:'').join('')}
                              </ul>
                          </div>
                          <div class="col-md-6 bg-warning text-white">
                              <h2>Recuperaciones</h2>
                              <ul class="list-group">
                                ${res.map((activity, index) => !activity.normal? `<li class="list-group-item" key=${index}>${activity.nombre}</li>`:'').join('')}
                              </ul>
                          </div>
                      </div>
                    </div>`
            
        })
    }
    
    useEffect( async ()=>{
        await AchievementService.getAchievements(id_user).then(setAchievements)
        await CourseService.getCourses().then(setCourses)

    }, [])

    return(
        <>
        
        <table className="customTable">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>LOGRO</th>
                    <th>GRADO</th>
                    <th>PERIODO</th>
                    <th>MATERIA</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>
            {achievements.map((item) => 
                <tr key={item.id}>
                    <td>{item.number}</td>
                    <td>{item.name}</td>
                    <td>{item.course.nombre}</td>
                    <td>{item.period.nombre}</td>
                    <td>{item.subject.nombre}</td>
                    <td className='actions'>
                        <FontAwesomeIcon onClick={()=>formLogro(item.id)} icon={faPlusCircle } size="lg" color='#0D1FD1'/>
                        <FontAwesomeIcon onClick={()=>viewActivities(item.id)} icon={faEye } size="lg" color='#A5A5A5'/>
                        
                    </td>
                </tr>
    
            )}
                
                
            </tbody>
        </table>
        
        
        
        
        </>
    )
}

export default ListActivities