// 高阶函数
export default (axios) => () => ({
  index(params) {
    return axios.post('/word', params)
  }
})
