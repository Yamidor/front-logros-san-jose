import { courseRepository } from '../../infraestructure/repositories/course.repository'
export const CourseService = {
    getCourses: () => {
      return courseRepository.getCourses()
    }
  }