
import { Activity } from '../models/Activity';
import { activityRepository } from '../../infraestructure/repositories/activity.repository'








export const activityService = {
  getActivities: () => {
    return activityRepository.getActivities()
  },
  getActiviteById: ()=>{
    return activityRepository.getActiviteById()
  }
}