import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Logo from '../img/logo.png'
import Bandera from '../img/bandera.jpg'
const styles = StyleSheet.create({
    view:{
      height: 400,
      width: 600
    },
    nota:{
      marginLeft: 20,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12

    },
    encabezado:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textEncabezado:{
      textAlign: 'center',
      fontSize: 10
    },
    textContainer:{
      flex: 1,
      padding: 30
    },
    logo:{
      width:50,
      height: 50
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
    textBold:{
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bolder',
      color: 'blue'
    },
    firmasLine: {
      marginLeft: 10
    },
    firmas: {
      marginTop: 1,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      marginLeft: 10
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    table:{
      display: 'table',
      width: '97%',
      borderStyle: 'solid',
      borderWidth: 1,
      marginLeft: 10,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
      borderStyle: 'solid',
      borderTopWidth: 1,
      fontSize: 10
    },
    tableColHeader: {
      width: '20%',
      textAlign: 'center',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      backgroundColor: '#D3D3D3',
      padding: 5,
    },
    tableCol: {
      width: '20%',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      padding: 5,
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

const Pdf = ({logrosConActividades, datos, periodo, materia, grado}) => {
  const formatReadableDate = (dateString) => {
    const adjustedDateString = dateString + 'T00:00:00-05:00';
    const options = { timeZone: 'America/Bogota', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(adjustedDateString);
    return date.toLocaleDateString('es-CO', options);
  };
  
 
  console.log(logrosConActividades)
  return (
    <PDFViewer style={{ width: '50%', height: '400px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.encabezado}>
            <View>
              <Image style={styles.logo} src={Logo}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textEncabezado}>MUNICIPIO EBÉJICO - ANTIOQUIA INSTITUCIÓN EDUCATIVA URBANA SAN JOSÉ
                    Resolución 128485 Octubre z6 de 2014
                    Resolución 0680 Febrero 4 de 2003
                    DANE 105240000136
                    NIT 811 039 962 1
              </Text>
            </View>
            <View>
              <Image style={styles.logo} src={Bandera}/>
            </View>
            
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>
              El día fueron {datos.start &&(<Text>{formatReadableDate(datos.start)}</Text>)} entregadas (de manera virtual y/o presencial) las actividades de recuperación
              al estudiante <Text>{datos.nombres}</Text> del grado <Text>{grado.nombre}</Text> correspondiente al periodo académico <Text>{periodo.nombre}</Text> del área de <Text>{materia.nombre}</Text>, las cuales deben ser entregadas y sustentadas (de forma escrita y/o verbal) en la fecha {datos.start &&(<Text>{formatReadableDate(datos.end)}</Text>)}.
            </Text>
            <Text style={styles.firmasLine}>
                _________________   _________________   ________________
            </Text>
            <Text style={styles.firmas}>
              Firma del Docente                                  Firma del Estudiante             Firma del acudiente 
            </Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}>
                        <Text>Periodo</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text>Logro</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text>Actividad</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text>Entregó</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text>Observaciones</Text>
                    </View>
                </View>
                {logrosConActividades.map((logro)=>
                    logro.actividades.map((actividad) =>
                      actividad.selected ? (
                        <View key={logro.id} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                              <Text>{logro.period.nombre}</Text> 
                          </View>
                          <View style={styles.tableCol}>
                              <Text>{logro.name}</Text> 
                          </View>
                          <View style={styles.tableCol}>
                              <Text>{actividad.nombre}</Text>
                          </View>
                          <View style={styles.tableCol}>
                              <Text>  </Text> 
                          </View>
                          <View style={styles.tableCol}>
                              <Text>  </Text>
                          </View>
                        </View>

                      ): null
                    )
                    
                )} 
            </View>
            <View>
              <Text style={styles.nota}>Nota:</Text>
            </View>
            <Text style={styles.firmasLine}>
                _________________   _________________   ________________
            </Text>
            <Text style={styles.firmas}>
              Firma del Docente                                  Firma del Estudiante             Firma del acudiente 
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Pdf;
