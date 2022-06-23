import { createStore } from "vuex";
import auth from './modules/auth';
import expenses from './modules/expenses';
import VuexPersistence from 'vuex-persist'

const store = createStore({
  modules: {
    auth,
    expenses
    },
  plugins: [new VuexPersistence().plugin],
});


export default store