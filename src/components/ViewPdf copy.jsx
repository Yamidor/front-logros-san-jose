import React, {useEffect, useState} from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image  } from '@react-pdf/renderer';
import Logo from '../img/pru1.jpg'
import '../styles/components/viewPdf.css'

// Create styles
const styles = StyleSheet.create({
  view:{
    height: 400,
    width: 600
  },
  body: {
    background: "#B52323",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    
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
  image: {
    marginVertical: 0,
    marginHorizontal: 0,
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
  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  }
  
  return(
    <>
        <div className='container-info'>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Enter a text"
          />

        </div>
        
        <PDFViewer style={styles.view}>
          <Document>
          <Page style={styles.body}>
          <Image style={styles.image} src={Logo} />
            
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.author}>Miguel de Cervantes</Text>
            <Text style={styles.subtitle}>
              Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
              Quijote de la Mancha
            </Text>
            <Text style={styles.text}>
              En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
              mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
              antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
              carnero, salpicón las más noches, duelos y quebrantos los sábados,
              lentejas los viernes, algún palomino de añadidura los domingos,
              consumían las tres partes de su hacienda. El resto della concluían sayo
              de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
              mismo, los días de entre semana se honraba con su vellori de lo más
              fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
              que no llegaba a los veinte, y un mozo de campo y plaza, que así
              ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
              hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
              enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
              tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna
              diferencia en los autores que deste caso escriben), aunque por
              conjeturas verosímiles se deja entender que se llama Quijana; pero esto
              importa poco a nuestro cuento; basta que en la narración dél no se salga
              un punto de la verdad
            </Text>
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