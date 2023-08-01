import { http } from '../http/http'
import { CuorseDTO } from '../http/dto/CourseDTO'
import { Activity } from '../../domain/models/Activity'


export const activityRepository = {
    getActivities: async () => {
      const activities = await http.get<any>('http://localhost:1337/api/activities?populate[achievements][populate]=*')
      
      // we can extract this transform to a function inside this file to be reused by different methods
      return activities.data.map((activity): Activity => ({
        id: activity.id,
        name: activity.attributes.name,
        tipo: activity.attributes.normal,
        logro: activity.attributes.achievements
      }))
    },
    getActiviteById: async () => {
      const activities = await http.get<any>('http://localhost:1337/api/activities?populate[achievements][populate]=*')
      
      // we can extract this transform to a function inside this file to be reused by different methods
      return activities.data.map((activity): Activity => ({
        id: activity.id,
        name: activity.attributes.name,
        tipo: activity.attributes.normal,
        logro: activity.attributes.achievements
      }))
    }
  }