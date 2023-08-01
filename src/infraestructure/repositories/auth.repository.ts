import { http } from '../http/http'
import { Teacher} from '../../domain/models/Teacher'


export const authRepository = {
    postLogin: async (user, password) => {
      const data= {
        "user": user,
        "password": password
      }
      return await http.post<any>('https://logros-san-jose-efe5a28642ce.herokuapp.com/api/v1/profesores', JSON.stringify(data))
    }
  }