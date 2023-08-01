import { http } from '../http/http'
import { CuorseDTO } from '../http/dto/CourseDTO'
import { Course } from '../../domain/models/Course'


export const courseRepository = {
    getCourses: async () => {
      const courses = await http.get<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/cursos')
      // we can extract this transform to a function inside this file to be reused by different methods
      return courses.map((course): Course => ({
        id: course.id,
        name:course.nombre,
        
      }))
    }
  }