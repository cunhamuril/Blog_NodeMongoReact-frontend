import api from '../services/api'

async function verifyToken() {
  const result = await api.get('/admin/verifytoken', {
    headers: { Authorization: `Bearer ${localStorage.EXBLOG_TOKEN}` }
  })

  localStorage.setItem("IS_LOGGED", result.data.success)

  return result.data.success
}

export default verifyToken