<template>
    <div id="form-container">
        <h4 class="form-header">{{ header_text }}</h4>
        <form @submit.prevent="$emit('on_submit', form)">
            <label>Email</label>
            <input type="email" v-model="form.email"  required>
            <label>Password</label>
            <input type="password" v-model="form.password" required>
            <div>
                <button type="submit" class="submit" :class="action">
                {{ submit_text }}
                </button>
            </div>
            <!-- <div class="text-center">
                {{ bottom_text }}
             <router-link id="form-bottom" :to="{ name:route_name }" >{{ bottom_link_text }}</router-link>
            </div> -->
        </form>
    </div>
</template>

<script>
export default {
    name:"CommonForm",
    props:{
        header_text: String,
        submit_text: String,
        bottom_text: String,
        route_name: String,
        action:String,
    },
    data(){
        return{
            form:{
                email:"",
                password:""
            },
        }
    }
}
</script>