interface state {
  loading: boolean
}

export const state = () => ({
  loading: false
})

export const mutations = {
  showloading(state: state, status: boolean) {
    state.loading = status
  }
}
