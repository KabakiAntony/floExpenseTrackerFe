<template>
    <div class="backdrop" id="changes-modal">
        <div class="modal">
        <button class='round-button' @click.self="closeModal"></button>
        <div class="item-to-update">
            <h4 class="center-text">Update the expense below</h4>
            <div class="items-list">
            <ul>
            <li><label class="li-label">Purpose</label></li>
            <li><label class="li-label">Amount</label></li>
            </ul>
        </div>
        <div class="items">
            <ul>
                <li>{{ expense_purpose }}</li>
                <li>{{ expense_amount}}</li>
            </ul>
        </div>
        <br>
        <hr>
        <div v-if='show' :class='type' class='changes-notif' :message='message'>{{ message }}</div>
        <form  @submit.prevent="updateExpense" class="dash">
        <input type="hidden" v-model="expense_id">
        <label>Purpose</label>
        <input type="text" v-model="expense_purpose">
        <label>Client</label>
        <input type="text" v-model="expense_client">
        <label>Amount</label>
        <input type="number" v-model="expense_amount" min="0" step="0.01">
        <button :class="action" class="submit dashboard-submit">{{ update_expense_submit }}</button>
        </form>
        <p class="center-text"><span>Make sure you save your changes to the database</span></p>
    </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "ChangesModal",
    emits:['reloadExpenses'],
    props: {
        expense_id:Number,
        expense_purpose:String,
        expense_client:String,
        expense_amount:Number,
        },
    data(){
        return{
            update_expense_submit:"Save changes",
            action:null,
            show:false,
            type:"",
            message:"",
        }
    },
    methods:{
        closeModal(){   
            this.$emit('reloadExpenses');    
            document.getElementById("changes-modal").style.display = "none";
        },
        async updateExpense(){
            this.action="submitting";
            this.update_expense_submit = "";
            let purpose = this.expense_purpose.toLocaleLowerCase();
            const expense_data = {
                "id":this.expense_id,
                "purpose":purpose,
                "expense_client":this.expense_client,
                "amount":this.expense_amount
            };
            try{
                    const url = `${this.$api}expenses/${this.expense_id}`
                    const res = await fetch(url,{
                    method:'PATCH',
                    headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken
                    },
                    body: JSON.stringify(expense_data)
                    })
                    const response = await res.json()
                    if (response.status === 200){
                        this.message = response.data;
                        this.type = "success";
                        this.show = true;
                        setTimeout(()=>{
                            this.type = "none"
                            this.message = ""
                        }, 5000)
                    }
                    else{
                        this.message = response.error;
                        this.type ="error";
                    }
                }
                catch(err){
                    let error = "The server is offline or unreachable."
                    return err
                }
                this.action = "";
                this.update_expense_submit="Save changes";
        }
    }
}
</script>

<style>
.modal{
    width:90%;
    margin: 60px auto;
    background-color: #dbdbdb;
    padding:2px 10px;
}
.backdrop{
    left:0;
    top:0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    min-height: 100vh;
}
.modal-size{
  width: 100%;
}
</style>