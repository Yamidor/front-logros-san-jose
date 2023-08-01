import { achievementRepository } from '../../infraestructure/repositories/achievement.repository'
export const AchievementService = {
    getAchievements: (id) => {
      return achievementRepository.getAchievements(id)
    },
    createAchievement: (datos) => {
      return achievementRepository.createAchievement(datos)
    },
    editAchievement: (id) => {
      return achievementRepository.editAchievement(id)
    },
    updateAchievement: (id, datos) => {
      return achievementRepository.updateAchievement(id, datos)
    },
    deleteAchievement: (id) => {
      return achievementRepository.deleteAchievement(id)
    }
  }