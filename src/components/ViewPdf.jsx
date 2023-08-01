import React, {useEffect, useState} from 'react';
import Select from "react-select";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Canvas, Image } from '@react-pdf/renderer';
import { CourseService } from '../domain/services/CourseService'
import { SubjectService } from '../domain/services/SubjectService'
import { PeriodService } from '../domain/services/PeriodService'
import Logo from '../img/logo.png'
import Banner from '../img/banner.png'
import Bandera from '../img/bandera.jpg'
import '../styles/components/viewPdf.css'
import Table from './Table';
// Create styles
const styles = StyleSheet.create({
  view:{
    height: 400,
    width: 600
  },
  body: {
    background: "#FFFFFF",
    paddingTop: 5,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  imageBanner:{
    height: 80,
  },
  imageLogo:{
    height: 50,
    width: 50
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bolder'
    
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  firmas: {
    marginTop: 1,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// Create Document Component
const ViewPdf = () => {
  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])
    const [periods, setPeriods] = useState([])
  useEffect(()=>{
    CourseService.getCourses().then(setCourses)
    SubjectService.getSubjects().then(setSubjects)
    PeriodService.getPeriods().then(setPeriods)
    console.log(courses)
  }, [])
  const [datos, setDatos] = useState({
    nombres: "",
    start: "",
    password: "",
    grado: "",
    periodo: "",
    materia:""
  });
  const periodos = [
    { value: "01", label: "Primero" },
    { value: "02", label: "Segundo" },
    { value: "03", label: "Tercero" },
    { value: "04", label: "Cuarto" },
  ];
  const materias = [
    { value: "01", label: "Matematicas" },
    { value: "02", label: "Castellano" },
    { value: "03", label: "Quimica" },
    { value: "04", label: "Tecnologia" },
  ]
  const options = [
    { value: "01", label: "Primero" },
    { value: "02", label: "Segundo" },
    { value: "03", label: "Tercero" },
    { value: "04", label: "Cuarto" },
    { value: "05", label: "Quinto" },
    { value: "06", label: "Sexto" },
    { value: "07", label: "Septimo" },
    { value: "08", label: "Octavo" },
    { value: "09", label: "Noveno" },
    { value: "10", label: "Decimo" },
    { value: "11", label: "Once" }
  ];
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
    });
  }
  
  return(
    <>
      <div className='container-info'>
              <p>Nombres</p>
              <input 
              type="text" 
              name="nombres" 
              placeholder='Digita nombre del estudiante'
              onChange={handleChange} 
              value={datos.nombres} />
            <br />
            <p>Fecha inicio</p>
            <input
              type="date"
              name="start"
              placeholder='Fecha inicio'
              onChange={handleChange}
              value={datos.start} />
            <br />
            <p>Fecha fin</p>
            <input
              type="date"
              name="end"
              placeholder='Fecha Fin'
              onChange={handleChange}
              value={datos.end} />
            <br />
            <p>Grado</p>
            <select name='grado'  onChange={handleChange}>
            {courses.map(grado => <option key={grado.id} value={grado.name}>{grado.name}</option>)}
            </select>
            <p>Materia</p>
            <select name='materia'  onChange={handleChange}>
            {subjects.map(marteria => <option key={marteria.id} value={marteria.name
            }>{marteria.name}</option>)}
            </select>
            <p>Perido</p>
            <select name='periodo'  onChange={handleChange}>
            {periods.map(periodo => <option key={periodo.id} value={periodo.name
            }>{periodo.name}</option>)}
            </select>
        </div>
        
        <PDFViewer style={styles.view}>
          <Document>
          <Page style={styles.body}>
            <Image style={styles.imageBanner} src={Banner}/>
            <Text style={styles.text}>
              El día {datos.start} fueron entregadas(de manera virtual y/o presencial) las actividades de recuperación
              al estudiante {datos.nombres} del grado {datos.grado} correspondiente al periodo academico {datos.periodo} de area {datos.materia} las cuales deben ser entregasdas y sustentadas(de forma escrita y/o verbal) en las fechas {datos.end}
            </Text>
            <Text>
                _________________   _________________   ________________
            </Text>
            <Text style={styles.firmas}>
              Firma del Docente                                  Firma del Estudiante             Firma del acudiente 
            </Text>
            <Table/>
            <Text style={styles.title}>FICHA DE SEGUIMINETO</Text>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
          </Page>
          </Document>
        </PDFViewer>
  </>
)
};

export default ViewPdf