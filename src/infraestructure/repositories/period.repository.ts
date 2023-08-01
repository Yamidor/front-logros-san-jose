import { http } from '../http/http'
import { CuorseDTO } from '../http/dto/CourseDTO'
import { Period } from '../../domain/models/Period'


export const periodRepository = {
    getPeriods: async () => {
      const periods = await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/periodos')
      // we can extract this transform to a function inside this file to be reused by different methods
      return periods.map((period): Period => ({
        id: period.id,
        name:period.nombre,
        
      }))
    }
  }