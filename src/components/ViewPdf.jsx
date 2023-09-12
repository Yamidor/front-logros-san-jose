import React, {useEffect, useState} from 'react';
import { CourseService } from '../domain/services/CourseService'
import SelectActivities from './SelectActivities';
import { SubjectService } from '../domain/services/SubjectService'
import { PeriodService } from '../domain/services/PeriodService'
import { AchievementService } from '../domain/services/AchievementService'
import { activityService} from '../domain/services/ActivityService'
import { makeStyles } from '@material-ui/core/styles'
import Banner from '../img/banner.png'
import '../styles/components/viewPdf.css'
import Pdf from './Pdf';
// Create styles

// Create Document Component
const ViewPdf = () => {
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [periods, setPeriods] = useState([])
  const [periodo, setPeriodo] = useState({id:"", nombre:""})
  const [materia, setMateria] = useState({id:"", nombre:""})
  const [grado, setGrado] = useState({id:"", nombre:""})
  const [achievements, setAchievements] = useState([])
  const [activities, setActivities] = useState([])
  const [logroActividades, setLogroActividades] = useState([]);
  const id = localStorage.getItem('user')
  useEffect(()=>{
    AchievementService.getAchievements(id).then(setAchievements)
    CourseService.getCourses().then(setCourses)
    SubjectService.getSubjects().then(setSubjects)
    PeriodService.getPeriods().then(setPeriods)
    activityService.getActivities().then(setActivities)
  }, [])
  const [datos, setDatos] = useState({
    nombres: "",
    start: "",
    password: "",
    grado: "",
    periodo: "",
    materia:"",
    end: ""
  });
  
 
  const handleChange = (event) => {
    if(event.target.name=="grado"){
      CourseService.getCourseById(event.target.value).then(setGrado)
    }
    if(event.target.name=="materia"){
      SubjectService.getSubjectById(event.target.value).then(setMateria)
    }
    if(event.target.name=="periodo"){
      PeriodService.getPeriodById(event.target.value).then(setPeriodo)
    }
    const { name, value } = event.target;
    setDatos((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
    });
  }
  const logrosFiltrados = achievements.filter((logro) => {
    return (
      logro.course.id.includes(datos.grado) &&
      logro.subject.id.includes(datos.materia) &&
      logro.period.id.includes(datos.periodo)
    )
  });
  
  return(
    <>
      <div className='card p-3' style={{marginRight:40, width: 300}}>
        <div class="mb-3">
          <label for="nombres" class="form-label">Nombres</label>
          <input 
                  type="text" 
                  name="nombres" 
                  placeholder='Digita nombre del estudiante'
                  onChange={handleChange} 
                  value={datos.nombres} />
        </div>
        <div class="mb-3">
          <label for="star" class="form-label">Fecha inicio</label>
          <input
                  type="date"
                  name="start"
                  placeholder='Fecha inicio'
                  onChange={handleChange}
                  value={datos.start} />
        </div>
        <div class="mb-3">
          <label for="end" class="form-label">Fecha fin</label>
          <input
                  type="date"
                  name="end"
                  placeholder='Fecha Fin'
                  onChange={handleChange}
                  value={datos.end} />
        </div>
            <div>
  
                <p>Grado</p>
                <select name='grado'  onChange={handleChange}>
                {courses.map(grado => <option key={grado.id} value={grado.id}>{grado.name}</option>)}
                </select>
                <p>Materia</p>
                <select name='materia'  onChange={handleChange}>
                {subjects.map(marteria => <option key={marteria.id} value={marteria.id
                }>{marteria.name}</option>)}
                </select>
                <p>Perido</p>
                <select name='periodo'  onChange={handleChange}>
                {periods.map(periodo => <option key={periodo.id} value={periodo.id
                }>{periodo.name}</option>)}
                </select>
            </div>
        </div>
        <SelectActivities datos={datos} periodo={periodo} materia={materia} grado={grado} setLogroActividades={setLogroActividades} logroActividades={logroActividades} activities={activities} logrosFiltrados={logrosFiltrados} />
        
  </>
)
};

export default ViewPdf