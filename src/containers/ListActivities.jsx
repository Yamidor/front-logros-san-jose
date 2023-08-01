import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect, useNavigate } from "react-router-dom";
import { faPencilSquare, faFilePdf, faListAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { AchievementService } from '../domain/services/AchievementService'
import { CourseService } from '../domain/services/CourseService'

import '../styles/containers/listActivities.css'

const ListActivities = ()=>{
    const [achievements, setAchievements] = useState([])
    const [courses, setCourses] = useState([])
    const navigate = useNavigate();
    const id = localStorage.getItem('user')
    const formLogro = ()=>{
        const cursosOptions = `<select name='id_rol'   data-Live-search='true' required>${courses.map(curso => `<option value=${curso.id}>${curso.name}</option>`)}</select>`
        console.log(cursosOptions)
        Swal.fire({
            title: "Registrar Logro",
            html: `
            <form id="formUser">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Logro(*):</label>
                    <input class="form-control" type="text" name="nombres" id="nombres" maxlength="100" placeholder="Nombre" required>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Curso(*):</label>
                    ${cursosOptions}
                  </div>
                </div>
              </div>
                                                                                             
            </form>`
        })
    }

    const viewActivities  = (activities)=>{
        const act=[]
        activities.map((item)=>{
            if(item.tipo){
                let html = `<li>${item.name}</li>`
                act.push(html)
            }
        })
        Swal.fire({
            title: 'Actividades para este logro',
            html: `<ul>
                       ${act} 
                    </ul>`,
            
        })
    }
    const generatePdf = ()=>{
        console.log("entre")
        navigate("/viewPdf");
    }

    useEffect( async ()=>{
        await AchievementService.getAchievements(id).then(setAchievements)
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
                        <FontAwesomeIcon onClick={()=>formLogro()} icon={faPlusCircle } size="lg" color='#0D1FD1'/>
                        <FontAwesomeIcon onClick={()=>viewActivities()} icon={faListAlt} size="lg" color='#1A851F'/>
                        <FontAwesomeIcon onClick={()=>viewActivities()} icon={faListAlt} size="lg" color='#D1950D'/>
                        <FontAwesomeIcon onClick={()=>generatePdf()} icon={faFilePdf} size="lg" color='#B52323'/>
                    </td>
                </tr>
    
            )}
                
                
            </tbody>
        </table>
        
        
        
        </>
    )
}

export default ListActivities