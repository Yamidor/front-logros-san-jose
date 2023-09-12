
import { Activity } from '../models/Activity';
import { activityRepository } from '../../infraestructure/repositories/activity.repository'

export const activityService = {
  getActivities: () => {
    return activityRepository.getActivities()
  },
  getActiviteById: ()=>{
    return activityRepository.getActiviteById()
  },
  getActivitesById: (id)=>{
    return activityRepository.getActivitesById(id)
  },
  createActivite: (datos) => {
    return activityRepository.createActivite(datos)
  },
}