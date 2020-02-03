import api from './api'

export const isAuthenticated = () => {
  // Verifica se tem token, para então verificar se o token é válido  
  if (getToken()) {
    return async () => {
      const res = await api.get('/admin/verifytoken')

      return res.data.success
    }
  }
}

export const getToken = () => localStorage.EXBLOG_TOKEN

export const getUserId = () => localStorage.EXBLOG_USER_ID

export const signin = (token, user_id) => {
  localStorage.setItem("EXBLOG_TOKEN", token)
  localStorage.setItem("EXBLOG_USER_ID", user_id)
}

export const signout = () => {
  localStorage.removeItem("EXBLOG_TOKEN")
  localStorage.removeItem("EXBLOG_USER_ID")
}



