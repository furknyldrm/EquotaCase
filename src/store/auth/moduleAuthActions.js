import useJwt from '../../auth/jwt/useJwt'

export default {
  getInfo(stt, payload) {
    return new Promise((resolve, reject) => {
      useJwt.getInfo(payload).then(response => {
        resolve(response)
      }).catch(error => { reject(error) })
    })
  },
}
