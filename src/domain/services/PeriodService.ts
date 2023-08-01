import { periodRepository } from '../../infraestructure/repositories/period.repository'
export const PeriodService = {
    getPeriods: () => {
      return periodRepository.getPeriods()
    }
  }