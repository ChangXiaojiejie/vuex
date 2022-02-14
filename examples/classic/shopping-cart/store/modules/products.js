import shop from '../../api/shop'

// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  // 获取所有的商品
  async getAllProducts ({ commit }) {
    const products = await shop.getProducts()
    commit('setProducts', products)
  }
}

// mutations
const mutations = {
  // 设置商品列表
  setProducts (state, products) {
    state.all = products
  },
  // 当商品添加成功后，商品的数量减1
  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
