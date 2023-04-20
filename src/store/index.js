import { createStore } from 'vuex'
import { services } from './services'
import { blogs } from './blogs'
import { users } from './users'
import { category } from './category'
import { subcategory } from './subcategory'
import { eqps } from './equipment'
import { home} from './home.js'

export default createStore({
  state: {
    modelState: false
  },
  getters: {
    getModelState(state){
      return state.modelState
    }
  },
  mutations: {
    setModelState(state, payload){
      state.modelState = payload
    }
  },
  actions: {
    setModal(ctx, pay){
      ctx.commit('setModelState', pay)
    }
  },
  modules: {
    services,
    blogs, 
    users,
    category,
    subcategory,
    eqps,
    home
  }
})
