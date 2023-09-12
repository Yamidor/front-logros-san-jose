import { periodRepository } from '../../infraestructure/repositories/period.repository'
export const PeriodService = {
    getPeriods: () => {
      return periodRepository.getPeriods()
    },
    getPeriodById: (id) => {
      return periodRepository.getPeriodById(id)
    }
  }