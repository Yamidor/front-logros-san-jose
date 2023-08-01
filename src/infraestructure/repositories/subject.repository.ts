import { http } from '../http/http'
import { CuorseDTO } from '../http/dto/CourseDTO'
import { Subject } from '../../domain/models/Subject'


export const subjectRepository = {
    getSubjects: async () => {
      const materias = await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/materias')
      // we can extract this transform to a function inside this file to be reused by different methods
      return materias.map((subject): Subject => ({
        id: subject.id,
        name:subject.nombre,
        
      }))
    }
  }