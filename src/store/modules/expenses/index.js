const state = {        
    all_expenses:[],
    todays_expenses:[],
}

const getters = {
    AllExpenses(state){
      return state.all_expenses
    },
    TodaysExpenses(state){
      return state.todays_expenses
    }
}

const actions = {
     async getTodaysExpenses ({commit, rootState}){
      const token = rootState.auth.auth_token
      try{
        const url = `${this.$api}expenses/todays`
        const res = await fetch(url,{
        method:'GET',
        headers:{
          'auth_token': token
        },
        })
        const response = await res.json()
        if (response.status === 200){
            commit('SET_TODAYS_EXPENSES',response.data)
        }
        else if(response.status === 404){
          commit('RESET_TODAYS_EXPENSES')
        }
      }
      catch(err)
      {
        return err
  
      }
   },
async getAllExpenses({commit, rootState}){
  const token = rootState.auth.auth_token
    try{
      const url = `${this.$api}expenses`
      const res = await fetch(url,{
      method:'GET',
      headers:{
        'auth_token': token
      },
      })
      const response = await res.json()
      if (response.status === 200){
          commit('SET_ALL_EXPENSES',response.data)
      }
      else if(response.status === 404){
        commit('RESET_ALL_EXPENSES')
      }
    }
    catch(err)
    {
      return err
    }
}
}

const mutations = {
  SET_TODAYS_EXPENSES(state, payload){
    state.todays_expenses = payload;
  },
  RESET_TODAYS_EXPENSES(state){
    state.todays_expenses.length = 0;
  },
  SET_ALL_EXPENSES(state,payload){
    state.all_expenses = payload;
  },
  RESET_ALL_EXPENSES(state){
    state.all_expenses.length = 0;
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}