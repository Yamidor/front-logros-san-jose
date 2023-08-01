import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilSquare, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Logro } from '../domain/models/Logro'
import Swal from 'sweetalert2'
import { AchievementService } from '../domain/services/AchievementService'
import { CourseService } from '../domain/services/CourseService'
import { SubjectService } from '../domain/services/SubjectService'
import { PeriodService } from '../domain/services/PeriodService'
import '../styles/containers/LogrosView.css'

const LogrosView = ()=>{
    const [achievements, setAchievements] = useState([])
    const [achievement, setAchievement] = useState([])
    const [courses, setCourses] = useState([])
    const [subjects, setSubjects] = useState([])
    const [periods, setPeriods] = useState([])
    const id = localStorage.getItem('user')
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
    const deleteLogro = async(item)=>{
      Swal.fire({
        title: `¿Quieres eliminar el logro ${item.name}?` ,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          AchievementService.deleteAchievement(item.id)     
          Toast.fire({
            icon: 'success',
            title: 'Logro eliminado...'
          });   
          AchievementService.getAchievements(id).then(setAchievements)
        }
      })
      

    }
    const editLogro = (logro)=>{
      Swal.fire({
        title: "Registrar Logro",
        html: `  
        <form id="formUser">
            <div className="row">
                <div className="col-12">
                    <div class="form-group">
                        <label for="">Numero(*):</label>
                        <input class="form-control"  type="number" name="numero" id="numero" maxlength="100" placeholder="numero" required>
                    </div>
                </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label for="">Logro(*):</label>
                <input class="form-control"  type="text" name="nombre" id="nombre" maxlength="100" placeholder="Nombre" required>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label for="">Curso(*):</label>
                <select name='cursoId' id='cursoId'  data-Live-search='true' required>
                ${courses.map(curso => `<option value="${curso.id}">${curso.name}</option>`)}
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label for="">Mateia(*):</label>
                <select name='materiaId' id='materiaId'  data-Live-search='true' required>
                ${subjects.map(materia => `<option value="${materia.id}">${materia.name}</option>`)}
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label for="">Periodo(*):</label>
                <select name='periodoId' id='periodoId'  data-Live-search='true' required>
                ${periods.map(periodo => `<option value="${periodo.id}">${periodo.name}</option>`)}
                </select>
              </div>
            </div>
          </div>
                                                                                         
        </form>`,
        preConfirm:() => {
            const numero = Swal.getPopup().querySelector('#numero').value
            const nombre = Swal.getPopup().querySelector('#nombre').value;
            const cursoId = Swal.getPopup().querySelector('#cursoId').value;
            const materiaId = Swal.getPopup().querySelector('#materiaId').value;
            const periodoId = Swal.getPopup().querySelector('#periodoId').value;
            return{
              id: logro.id,
              numero,
              nombre,
              cursoId,
              materiaId,
              periodoId,
              profesorId: localStorage.getItem('user')
            }
            
        },
        didOpen: () =>{
          document.getElementById('numero').value=logro.number;
          document.getElementById('nombre').value=logro.name;
        }
    }).then((e) => {
      if (e.value.nombre && e.value.numero) {
          console.log(e.value.nombre)
          try {
            Toast.fire({
              icon: 'success',
              title: 'Logro actualizado'
          });
          AchievementService.updateAchievement(id, JSON.stringify(e.value))         
          AchievementService.getAchievements(id).then(setAchievements)
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: 'No se pudo actualizar el logro'
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

    const formLogro = ()=>{
        Swal.fire({
            title: "Registrar Logro",
            html: `      
              

            <form id="formUser">
                <div className="row">
                    <div className="col-12">
                        <div class="form-group">
                            <label for="">Numero(*):</label>
                            <input class="form-control"  type="number" name="numero" id="numero" maxlength="100" placeholder="numero" required>
                        </div>
                    </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="">Logro(*):</label>
                    <input class="form-control"  type="text" name="nombre" id="nombre" maxlength="100" placeholder="Nombre" required>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Curso(*):</label>
                    <select name='cursoId' id='cursoId'  data-Live-search='true' required>
                    ${courses.map(curso => `<option value="${curso.id}">${curso.name}</option>`)}
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Mateia(*):</label>
                    <select name='materiaId' id='materiaId'  data-Live-search='true' required>
                    ${subjects.map(materia => `<option value="${materia.id}">${materia.name}</option>`)}
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Periodo(*):</label>
                    <select name='periodoId' id='periodoId'  data-Live-search='true' required>
                    ${periods.map(periodo => `<option value="${periodo.id}">${periodo.name}</option>`)}
                    </select>
                  </div>
                </div>
              </div>
                                                                                             
            </form>`,
            preConfirm:() => {
                const numero = Swal.getPopup().querySelector('#numero').value
                const nombre = Swal.getPopup().querySelector('#nombre').value;
                const cursoId = Swal.getPopup().querySelector('#cursoId').value;
                const materiaId = Swal.getPopup().querySelector('#materiaId').value;
                const periodoId = Swal.getPopup().querySelector('#periodoId').value;
                return{
                  numero,
                  nombre,
                  cursoId,
                  materiaId,
                  periodoId,
                  profesorId: localStorage.getItem('user')
                }
                
            }
        }).then(async(e) => {
          if (e.value.nombre && e.value.numero) {
              try {
                Toast.fire({
                  icon: 'success',
                  title: 'Logro registrado'
              });
              await AchievementService.createAchievement(JSON.stringify(e.value))
              await AchievementService.getAchievements(id).then(setAchievements)
            } catch (error) {
              Toast.fire({
                icon: 'error',
                title: 'No se pudo resgitrar el logro'
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

    useEffect(async ()=>{
        await AchievementService.getAchievements(id).then(setAchievements)
        await CourseService.getCourses().then(setCourses)
        await SubjectService.getSubjects().then(setSubjects)
        await PeriodService.getPeriods().then(setPeriods)
    }, [])
    return(
        <>
       
        <div className='container-botton-new'>
            <button onClick={formLogro}><FontAwesomeIcon  icon={faPlusCircle }  color='#FFFFFF'/>Nuevo</button>
        </div>
        <table className="customTable">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>LOGRO</th>
                    <th>GRADO</th>
                    <th>MATERIA</th>
                    <th>PERIODO</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>
            {achievements.map((item) => 
                <tr key={item.id}>
                    <td>{item.number}</td>
                    <td>{item.name}</td>
                    <td>{item.course.nombre}</td>
                    <td>{item.subject.nombre}</td>
                    <td>{item.period.nombre}</td>
                    <td className='actions'>
                        <FontAwesomeIcon onClick={()=>editLogro(item)} icon={faPencilSquare} size="2x" color='#229378'/>
                        <FontAwesomeIcon onClick={()=>deleteLogro(item)} icon={faTrash} size="2x" color='#F10B0B'/>
                    </td>
                </tr>
    
            )}
                
                
            </tbody>
        </table>
        
        </>
    )
}

export default LogrosView