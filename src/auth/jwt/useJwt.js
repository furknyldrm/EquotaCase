import axios from '../../axios'


 const server = 'https://api2.binance.com'


export default {

  getInfo() {
    return axios.get(`${server}/api/v3/ticker/24hr`, {headers:{Authorization:`JWT ${localStorage.getItem('accessToken')}` }})
  },
}
