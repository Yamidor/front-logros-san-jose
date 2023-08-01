import { error } from 'console'
import { authRepository } from '../../infraestructure/repositories/auth.repository'
export const AuthService = {
  postLogin: async (user, password) => {
      return await authRepository.postLogin(user, password)
    }
  } 