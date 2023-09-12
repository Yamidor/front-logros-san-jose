import { http } from '../http/http'
import { CuorseDTO } from '../http/dto/CourseDTO'
import { Activity } from '../../domain/models/Activity'


export const activityRepository = {
    getActiviteById: async () => {
      const activities = await http.get<any>('http://localhost:1337/api/activities?populate[achievements][populate]=*')
      
      // we can extract this transform to a function inside this file to be reused by different methods
      return activities.data.map((activity): Activity => ({
        id: activity.id,
        name: activity.attributes.name,
        tipo: activity.attributes.normal,
        logro: activity.attributes.achievements
      }))
    },
    getActivities: async () => {
      return await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/actividades')
    },
    getActivitesById: async (id) => {
      return await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/actividades/'+id)
    },
    createActivite: async (datos) => {
      return await http.post<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/actividades', datos)
    },
  }