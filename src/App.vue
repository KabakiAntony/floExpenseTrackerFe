<script>
import { mapGetters } from "vuex";

export default {
  methods:{
    async logOut(){
      try{
          this.$store.commit('SET_IS_LOGGED_IN',false)
          this.$store.commit('SET_AUTH_TOKEN',null)
          this.$store.commit('RESET_ALL_EXPENSES')
          this.$store.commit('RESET_TODAYS_EXPENSES')
          this.$router.push({name:"Home"})
      }
      catch(err){
        console.log(err)
      }
    }
  },
  computed:{
    ...mapGetters({ token:"AuthToken", isLoggedIn:"IsLoggedIn" }),
    screenName(){
      if(this.token){
        const tokenParts = this.token.split('.')
        const tokenBody = JSON.parse(atob(tokenParts[1]))
        return tokenBody.screen_name
      }
    }
  },  
}
</script>

<template>
    <header>
        <!-- Logo -->
        <a href="#" class="logo">FloET</a>
        <!-- Hamburger icon -->
        <input class="side-menu" type="checkbox" id="side-menu"/>
        <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
        <!-- Menu -->
        <nav>
            <ul class="menu" v-if="isLoggedIn">
                <li>
                <router-link :to="{ name: 'Dashboard'}">Hi {{ screenName }}</router-link>
                </li>
                <li>
                  <a class="logout" @click="logOut">Logout</a>
                </li>
            </ul>
        </nav>
    </header>
<router-view/>
<footer>
    <p>&copy; FloET 2022&nbsp;&nbsp;<a href="https://twitter.com/kabakiantony">Developed by</a></p>
</footer>
</template>

<style>
@import '@/assets/base.css';
</style>
