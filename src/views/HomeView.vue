<template>
    <main>
        <Transition name="toast">
        <ShowAlert  v-if='show' :class='type' :message='message'/>
        </Transition>
        <h2 class="center-text">FloExpense Tracker</h2>
        <p class="center-text">Tracking expenses is easy, welcome</p>
        <CommonForm  v-bind="commonFormProps" @on_submit="handleSubmit" :action="action"/>
    </main>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import ShowAlert from "@/components/ShowAlert.vue";
import { loadToast } from "../utils"

export default{
    name:'Home',
    components:{
        CommonForm,
        ShowAlert,
    },
    data(){
      return {
        commonFormProps:{
        header_text:"Login",
        submit_text:"Login",
      },
      type:null,
      message:null,
      show:false,
      action:null,
      }
  },
  methods:{
    loadToast,
    async handleSubmit(theForm){
            this.action="submitting"
            this.commonFormProps.submit_text =" "
              let response = await this.$store.dispatch('logIn',theForm)
              if(response.status === 200){
                this.$router.push({name: 'Dashboard'})
            } else {
              let error = response.error ? response.error : response;
              this.loadToast(error, "error")
              }
            this.action = ""
            this.commonFormProps.submit_text = "Login"
        },
  }
}
</script>