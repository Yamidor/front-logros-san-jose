import { subjectRepository } from '../../infraestructure/repositories/subject.repository'
export const SubjectService = {
    getSubjects: () => {
      return subjectRepository.getSubjects()
    },
    getSubjectById: (id) => {
      return subjectRepository.getSubjectById(id)
    }
  }