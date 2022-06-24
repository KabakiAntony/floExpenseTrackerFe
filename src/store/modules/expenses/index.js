const state = {        
    expenses:[],
    monies_to_foreman:[],
    all_foreman_expenses:[]
}

const getters = {
    Expenses(state){
        return state.expenses
    },
    ForemanMonies(state){
      return state.monies_to_foreman
    },
    AllForemanExpenses(state){
      return state.all_foreman_expenses
    }
}

const actions = {
   async getExpenses ({commit, rootState}, expenses_for){
        const token = rootState.auth.auth_token
        try{
          const url = `${this.$api}expenses/${expenses_for}`
          const res = await fetch(url,{
          method:'GET',
          headers:{
            'auth_token': token
          },
          })
          const response = await res.json()
          if (response.status === 200){
              commit('SET_EXPENSES',response.data)
          }
          else if(response.status === 404){
            commit('RESET_EXPENSES')
          }
          return data
        }
        catch(err)
        {
          return err
    
        }
     },
     async getForemanMonies ({commit, rootState}){
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
            commit('SET_FOREMAN_MONIES',response.data)
        }
        else if(response.status === 404){
          commit('RESET_FOREMAN_MONIES')
        }
        return response
      }
      catch(err)
      {
        return err
  
      }
   },
   async getAllForemanExpenses ({commit, rootState}){
    const token = rootState.auth.auth_token
    try{
      const url = `${this.$api}expenses/foreman`
      const res = await fetch(url,{
      method:'GET',
      headers:{
        'auth_token': token
      },
      })
      const response = await res.json()
      if (response.status === 200){
          commit('SET_ALL_FOREMAN_EXPENSES',response.data)
      }
      else if(response.status === 404){
        commit('RESET_ALL_FOREMAN_EXPENSES')
      }
      return response
    }
    catch(err)
    {
      return err

    }
 }
}

const mutations = {
    SET_EXPENSES (state,payload){
        state.expenses = payload;
     },

    RESET_EXPENSES(state){
        state.expenses.length = 0;
     },
     SET_FOREMAN_MONIES (state,payload){
      state.monies_to_foreman = payload;
   },

  RESET_FOREMAN_MONIES(state){
      state.monies_to_foreman.length = 0;
   },
   SET_ALL_FOREMAN_EXPENSES(state,payload){
     state.all_foreman_expenses = payload;
   },
   RESET_ALL_FOREMAN_EXPENSES(state){
    state.all_foreman_expenses.length = 0;
   }
}

export default{
  state,
  getters,
  actions,
  mutations
}