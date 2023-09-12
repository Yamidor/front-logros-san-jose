import React, { useState, useEffect } from 'react';
import Pdf from './Pdf';

const SelectActivities = ({ activities, logrosFiltrados, datos, periodo, materia, grado}) => {
  
  // Estado para almacenar logros con actividades
  const [logrosConActividades, setLogrosConActividades] = useState([]);

  // Función para agregar o quitar una actividad de un logro
  const toggleActividad = (logroId, actividadId) => {
    setLogrosConActividades((prevLogrosConActividades) => {
      const updatedLogros = prevLogrosConActividades.map((logro) => {
        if (logro.id === logroId) {
          const actividadIndex = logro.actividades.findIndex(
            (actividad) => actividad.id === actividadId
          );
  
          if (actividadIndex !== -1) {
            // Crear una nueva copia del logro con la actividad actualizada
            const updatedActividades = [...logro.actividades];
            updatedActividades[actividadIndex] = {
              ...updatedActividades[actividadIndex],
              selected: !updatedActividades[actividadIndex].selected,
            };
  
            return { ...logro, actividades: updatedActividades };
          }
        }
        return logro;
      });
      
      return updatedLogros
    });
  };
  // Cuando cambian los logros o las actividades, actualizar logrosConActividades
  useEffect(() => {
    const logrosActualizados = logrosFiltrados.map((logro) => {
      const actividadesDelLogro = activities
        .filter((actividad) => actividad.logroId === logro.id && !actividad.normal)
        .map((actividad) => ({ ...actividad, selected: false }));
      return { ...logro, actividades: actividadesDelLogro };
    });
    //setLogroActividades(logrosActualizados)
    setLogrosConActividades(logrosActualizados);
  }, [logrosFiltrados, activities]);

  return (
    <>
    <div className='card p-4'>

      <h4 className="text-body-secondary">Logros y Actividades</h4>
      {logrosConActividades.map((logro) => (
        <div className='card' key={logro.id}>
          <h6 className="font-monospace" style={{fontSize: 12}}>{logro.name}</h6>
          <ul className='list-group'>
            {logro.actividades.map((actividad) => (
              <li
                key={actividad.id}
                onClick={() => toggleActividad(logro.id, actividad.id)}
                className={`list-group-item ${actividad.selected ? 'active': ''}`}
                style={{fontSize: 10}}
              >
                {actividad.nombre}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
    </div>
    <Pdf datos={datos} periodo={periodo} grado={grado} materia={materia} logrosConActividades={logrosConActividades}/>
    </>
  );
};

export default SelectActivities;

