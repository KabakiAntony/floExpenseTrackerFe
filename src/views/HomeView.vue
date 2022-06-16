<template>
    <main>
        <h2 class="center-text">FloExpense Tracker</h2>
        <p class="center-text">Tracking expenses is easy, welcome</p>
        <CommonForm  v-bind="commonFormProps" @on_submit="handleSubmit" :action="action"/>
    </main>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue"
export default{
    name:'Home',
    components:{
        CommonForm,
    },
    data(){
      return {
        commonFormProps:{
        header_text:"Login",
        submit_text:"Login",
        bottom_text:"Forgot Password ?",
        bottom_link_text:"Send link",
        route_name:"Forgot"
      },
      type:null,
      message:null,
      show:false,
      action:null,
      }
  },
}
</script>