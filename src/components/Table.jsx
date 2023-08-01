import React from 'react';
const Table = ()=>{
    return(
        <>
        <table>
            <thead>
                <tr>
                <th>Periodo</th>
                <th>Logros</th>
                <th>Actividades</th>
                <th>Entrego</th>
                <th>Observaciones y Valoración</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Logro 1</td>
                <td>Actividad 1</td>
                <td>Si</td>
                <td>Observaciones 1</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Logro 2</td>
                <td>Actividad 2</td>
                <td>No</td>
                <td>Observaciones 2</td>
                </tr>
                <tr>
                <td>3</td>
                <td>Logro 3</td>
                <td>Actividad 3</td>
                <td>Si</td>
                <td>Observaciones 3</td>
                </tr>
                <tr>
                <td>4</td>
                <td>Logro 4</td>
                <td>Actividad 4</td>
                <td>Si</td>
                <td>Observaciones 4</td>
                </tr>
                <tr>
                <td>5</td>
                <td>Logro 5</td>
                <td>Actividad 5</td>
                <td>No</td>
                <td>Observaciones 5</td>
                </tr>
            </tbody>
        </table>

        </>
    )
}
export default Table