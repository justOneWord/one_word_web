import createApi from '~/api/index'
export default (ctx, inject) => {
  // 注入上下文 (ctx.app.$api)
  // 挂载到vue实例上面 (this.$api in your components)
  const apiAxios = createApi(ctx.$axios)
  inject('api', apiAxios())
}
