import { http } from '../http/http'
import { CuorseDTO } from '../http/dto/CourseDTO'
import { Logro } from '../../domain/models/Logro'


export const achievementRepository = {
    getAchievements: async (id) => {
      const achievements = await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/logros/'+id)
      
      // we can extract this transform to a function inside this file to be reused by different methods
      return achievements.map((logro): Logro => ({
        id: logro.id,
        number: logro.numero,
        name: logro.nombre,
        subject: logro.Materium,
        period: logro.Periodo,
        teacher: logro.Profesor,
        course: logro.Curso
      }))
    },
    createAchievement: async (datos) => {
      return await http.post<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/logros', datos)
    },
    editAchievement: async (id) => {
      return await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/logro/'+id)
    },
    updateAchievement: async (id, datos) => {
      return await http.put<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/logro/'+id, datos)
    },
    deleteAchievement: async (id) => {
      return await http.delete<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/logro/'+id)
    }
    
  }