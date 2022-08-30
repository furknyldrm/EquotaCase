import axios from '../../axios'

export default {
  SET_BEARER (state, accessToken) {
    axios.defaults.headers.common['Authorization'] = `JWT ${accessToken}`
  }
}
