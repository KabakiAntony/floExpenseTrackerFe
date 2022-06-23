const state = {        
    expenses:[]
}

const getters = {
    Expenses(state){
        return state.expenses
    }
}

const actions = {
   async getExpenses ({commit, rootState}, start_date, end_date){
        const token = rootState.auth.auth_token
        try{
          const url = `${this.$api}expenses/${start_date}/${end_date}`
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
     }
}

const mutations = {
    SET_EXPENSES (state,payload){
        state.expenses = payload
     },

    RESET_EXPENSES(state){
        state.expenses.length = 0;
     }
}

export default{
  state,
  getters,
  actions,
  mutations
}