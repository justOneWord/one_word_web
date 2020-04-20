export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    console.log('request')
    store.commit('showloading', true)
    return config
  })

  $axios.onResponse((response) => {
    store.commit('showloading', false)
    if (response.status === 200) {
      return response
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    return Promise.reject(error)
  })
}
