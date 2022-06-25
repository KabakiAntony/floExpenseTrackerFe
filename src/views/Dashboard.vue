<template>
<main>
    <Transition name="toast">
        <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <div class="actions">
    <button class="action-links" @click="openAction($event,'batchExpense')">Batch</button>
    <button class="action-links" @click="openAction($event, 'floExpense'), get_flo_expenses()">Flo</button>
    <button class="action-links" @click="openAction($event, 'foremanExpense'), get_foreman_expenses()">Foreman</button>
    <button class="action-links" @click="openAction($event, 'generateReports')">Reports</button>
    </div>
    <div class="actionContent" id="batchExpense">
        <h4>Upload batch expenses</h4>
        <p>Batch expenses and upload them in a file</p>
         <hr>
        <form @submit.prevent="uploadBatchExpenses" class="dash">
            <label >Select expense type</label>
            <select v-model="expense_for" required>
            <option value="flo">Flo</option>
            <option value="foreman">Foreman</option>
            </select>
            <label>Batch file</label>
            <input type="file"  class="file" id="newExpenseFile" accept=".xlsx, .xls" required/>
            <button :class="action" class="submit dashboard-submit">{{ new_batch_submit }}</button>
        </form>
    </div>
    <div class="actionContent" id="floExpense">
        <h4>Your expenses</h4>
        <p>Add expenses made by you</p>
        <p>Select who you are expensing / paying to foreman or other</p>
        <hr>
        <div class="holder">
            <div class="input-expenses">
                <div class="holder-padding">
                    <label >Expense to</label>
                    <select v-model="expense_to" class="holder-select" required>
                    <option value="foreman">Monies to foreman</option>
                    <option value="other">Monies to other</option>
                    </select>
                </div>
                <div v-if="expense_to === 'foreman'">
                    <form @submit.prevent="addFloExpenseToForeman" class="holder-padding">
                    <label>Amount</label>
                    <input type="number" v-model="flo_amount_foreman" required>
                    <button :class="action" class="submit holder-padding-submit">{{ flo_foreman_submit }}</button>
                    </form>
                </div>
                <div v-if="expense_to === 'other'">
                    <form @submit.prevent="addFloExpenseToOther" class="holder-padding">
                    <label>Purpose</label>
                    <input type="text" v-model="flo_purpose_other" required>
                    <label>Client</label>
                    <input type="text" v-model="flo_client_other">
                    <label>Amount</label>
                    <input type="number" v-model="flo_amount_other" required>
                    <button :class="action" class="submit holder-padding-submit">{{ flo_other_submit }}</button>
                    </form>
                </div>
            </div>
            <div class="list-expenses">
                <label class="total-label">Total expenses ={{ floTotalExpenses.toLocaleString("en-US", {style:"currency", currency:"KES"}) }}</label>
                <hr>
                <div class="list-expenses-li" v-if="expenses_by_flo.length > 0">
                    <ul v-for="expense in expenses_by_flo" :key="expense.id">
                        <li>{{ expense.amount.toLocaleString("en-US")}}&nbsp;&nbsp;&nbsp;{{ expense.purpose }}
                            <div class="buttons">
                                <button class="expense-button edit" @click="edit_flo_expenses(expense)">Edit</button>
                                <button class="expense-button remove" @click="remove_flo_expenses(expense.id)">Remove</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <p class="center-text bold-text" v-if="expenses_by_flo.length === 0">
                You have not added any expenses today</p>
            </div>
        </div>
    </div>
    <div class="actionContent" id="foremanExpense">
        <h4>Foremans expenses</h4>
        <p>Add expenses by the foreman</p>
        <hr>
        <div class="holder">
            <div class="input-expenses">
                <form @submit.prevent="addForemanExpenses" class="holder-padding">
                <label>Purpose</label>
                <input type="text" v-model="foreman_purpose" required>
                <label>Client</label>
                <input type="text" v-model="foreman_client">
                <label>Amount</label>
                <input type="number" v-model="foreman_amount" required>
                <button :class="action" class="submit holder-padding-submit">{{ foreman_expenses_submit }}</button>
                </form>
            </div>
            <div class="list-expenses">
                 <label class="total-label">Available = {{ foremanMoniesBalance.toLocaleString("en-US", {style:"currency", currency:"KES"}) }}</label>
                 <hr>
                <div class="list-expenses-li" v-if="expenses_by_foreman.length > 0">
                    <ul  v-for="expense in expenses_by_foreman" :key="expense.id">
                        <li>{{ expense.amount.toLocaleString("en-US")}}&nbsp;&nbsp;&nbsp;{{ expense.purpose }}
                            <div class="buttons">
                                <button class="expense-button edit" @click="edit_foreman_expenses(expense)">Edit</button>
                                <button class="expense-button remove" @click="remove_foreman_expenses(expense.id)">Remove</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <p class="center-text bold-text" v-if="expenses_by_foreman.length === 0">
                You have not added any expenses today</p>
            </div>
        </div>
    </div>
    <div class="actionContent reports-dash" id="generateReports">
        <h3>Get various reports</h3>
        <p>Show a report for a given duration, just enter the start and end date.</p>
        <hr>
        <h4>Your expenses</h4>
        <label>Start date</label>
        <input type="date"  v-model="flo_start_date" required>
        <label>End date</label>
        <input type="date" v-model="flo_end_date" required>
        <button :class="action" class="submit dashboard-submit" @click="get_expenses_by_flo_report" >{{ flo_expenses_report }}</button>
        <hr>
        <h4>Foreman expenses</h4>
        <label>Start date</label>
        <input type="date"  v-model="foreman_start_date" required>
        <label>End date</label>
        <input type="date" v-model="foreman_end_date" required>
        <button :class="action" class="submit dashboard-submit" @click="get_foreman_expenses_report" >{{ foreman_expenses_report }}</button>
        <hr>
        <h4>Monies to foreman</h4>
        <label>Start date</label>
        <input type="date"  v-model="monies_to_start_date" required>
        <label>End date</label>
        <input type="date" v-model="monies_to_end_date" required>
        <button :class="action" class="submit dashboard-submit" @click="get_monies_to_foreman_report" >{{ monies_to_report }}</button>
    </div>
    <h4 class="center-text text-margin" id="profileInstruction">Click on any option to carry out the task.</h4> 
    <ChangesModal v-bind="changesModalProps" @reloadExpenses="clearExpensesAndUpdate"/>
</main>
</template>
<script>
import { openAction, loadToast, todaysDate } from '../utils';
import ShowAlert from "@/components/ShowAlert.vue";
import ChangesModal  from "@/components/ChangesModal.vue"

export default{
    name:'Dashboard',
    components:{
        ShowAlert,
        ChangesModal
    },
    data(){
        return{
            changesModalProps:{
                expense_id:"",
                expense_purpose:"",
                expense_client:"",
                expense_amount:0.0,
            },
            /* notification props */
            type:null,
            message:null,
            show:false,
            action:null,
            /* batch file*/
            expense_for:null,
            /* flo to foreman */
            flo_amount_foreman:null,
            flo_foreman_submit:"Add expense",
            /* flo expense list*/
            expenses_by_flo:[],
            all_expenses_by_flo:[],
            /* foreman expense list */
            expenses_by_foreman:[],
            all_expenses_by_foreman:[],
            /* foreman balances */
            foreman_balances:[],
            /* flo amount other */
            flo_purpose_other:null,
            flo_client_other:null,
            flo_amount_other:null,
            /* foreman expense */
            foreman_purpose:null,
            foreman_client:null,
            foreman_amount:null,
            expense_to:null,
            /* list all expenses */
            all_expenses:[],
            /* todays expenses */
            todays_expenses:[],
            /* reports */
            flo_start_date:null,
            flo_end_date:null,
            flo_expenses_report:"Get report",
            foreman_start_date:null,
            foreman_end_date:null,
            foreman_expenses_report:"Get report",
            monies_to_start_date:null,
            monies_to_end_date:null,
            monies_to_report:"Get report",
            flo_other_submit:"Add expense",
            foreman_expenses_submit:"Add expense",
            new_batch_submit:"Upload file",
        }
    },
    computed:{
        foremanMoniesBalance(){
            let moniesBalance = 0;
            let foremanExpense = 0;
            this.foreman_balances.forEach((expense) =>{
                moniesBalance += expense.amount
            });

            this.all_expenses_by_foreman.forEach((expense) =>{
                foremanExpense += expense.amount
            });
            return moniesBalance - foremanExpense
        },
        floTotalExpenses(){
            let totalExpenses = 0;
            this.all_expenses_by_flo.forEach((expense)=>{
                totalExpenses += expense.amount
            });
            return totalExpenses
        }
    },
    methods:{
        openAction,
        loadToast,
        todaysDate,
        async uploadBatchExpenses(){
            this.action="submitting";
            this.new_batch_submit = "";
            let fileInput = document.getElementById('newExpenseFile');
            const theFile = new FormData();
            theFile.append('newExpenseFile',fileInput.files[0]);
            theFile.append('expense_for', this.expense_for)
            try{
                    const url = `${this.$api}expenses/upload`
                    const res = await fetch(url,{
                    method:'POST',
                    headers:{
                        'auth_token':this.$store.getters.AuthToken
                    },
                    body: theFile
                    })
                    const response = await res.json()
                    if (response.status === 200){
                        this.message = response.data;
                        this.type = "success";
                        this.loadToast(this.message, this.type);
                    }
                    else{
                        this.message = response.error;
                        this.type ="error";
                        this.loadToast(this.message, this.type);
                    }
                }
                catch(err){
                    let error = "The server is offline or unreachable.";
                    this.loadToast(error, "error");
                }
                this.action = "";
                this.new_batch_submit="Upload file";
        },
        async addFloExpenseToForeman(){
            const expense = {
                "expense_for": "flo",
                "purpose":"foreman",
                "expense_client":'foreman',
                "amount":this.flo_amount_foreman
            };

            this.action="submitting";
            this.flo_foreman_submit ="";
            const url = `${this.$api}expenses`;
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken,
                    },
                    body: JSON.stringify(expense)
                    })
            const response = await res.json()
            if(response.status === 201){
               this.flo_amount_foreman = "";
               this.message = "Expense added successfully";
               this.loadToast(this.message, "success");
               await this.get_flo_expenses();
            } else {
                this.loadToast(response.error, "error");
              }
            this.action="";
            this.flo_foreman_submit ="Add expense";
        },
        async addFloExpenseToOther(){
            const expense = {
                "expense_for": "flo",
                "purpose": this.flo_purpose_other,
                "expense_client":this.flo_client_other,
                "amount":this.flo_amount_other
            };

            this.action="submitting";
            this.flo_other_submit ="";
            const url = `${this.$api}expenses`;
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken,
                    },
                    body: JSON.stringify(expense)
                    })
            const response = await res.json()
            if(response.status === 201){
                this.message = "Expense added successfully"
                this.loadToast(this.message, "success");
                this.flo_amount_other = "";
                this.flo_purpose_other = "";
                this.flo_client_other ="";
                await this.get_flo_expenses();
            } else {
                this.loadToast(response.error, "error")
              }
            this.action="";
            this.flo_other_submit ="Add expense";
        },
        async addForemanExpenses(){
            const expense = {
                "expense_for": "foreman",
                "purpose": this.foreman_purpose,
                "expense_client":this.foreman_client,
                "amount":this.foreman_amount
            };

            this.action="submitting";
            this.foreman_expenses_submit ="";
            const url = `${this.$api}expenses`;
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken,
                    },
                    body: JSON.stringify(expense)
                    })
            const response = await res.json()
            if(response.status === 201){
                this.message = "Expense added successfully";
                this.loadToast(this.message, "success");
                this.foreman_amount = "";
                this.foreman_purpose = "";
                this.foreman_client ="";
                await this.get_foreman_expenses();
            } else {
                this.loadToast(response.error, "error");
              }
            this.action="";
            this.foreman_expenses_submit ="Add expense";
        },
        async get_flo_expenses(){
            await this.get_todays_expenses();
            this.expenses_by_flo = this.todays_expenses.filter((arr)=>{
                return  (arr.expense_for === "flo" && arr.expense_date === todaysDate())
            })

            await this.$store.dispatch('getAllExpenses')
            this.all_expenses = this.$store.getters.AllExpenses

            this.all_expenses_by_flo = this.all_expenses.filter((arr)=>{
                return arr.expense_for === "flo"
            });
        },
        async get_foreman_expenses(){
            await this.get_todays_expenses();
            this.expenses_by_foreman = this.todays_expenses.filter((arr)=>{
                return  (arr.expense_for === "foreman" && arr.expense_date == todaysDate())
            })

            await this.$store.dispatch('getAllExpenses')
            this.all_expenses = this.$store.getters.AllExpenses

            this.foreman_balances = this.all_expenses.filter((arr)=>{
                return (arr.expense_for === "flo" && arr.purpose === "foreman")
            });

            this.all_expenses_by_foreman = this.all_expenses.filter((arr)=>{
                return arr.expense_for === "foreman"
            });
        },     
        async remove_flo_expenses(id){
            if(confirm('Are you sure you want to delete this expense ?')){
                const url = `${this.$api}expenses/${id}`
                const res = await fetch(url,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'auth_token':this.$store.getters.AuthToken,
                        },
                        })
                const response = await res.json()
                if(response.status === 200){
                    this.loadToast("Expense removed successfully", "success");
                    await this.get_flo_expenses();
                } else {
                    this.loadToast(response.error, "error")
                }
            }
            
        },
        async remove_foreman_expenses(id){
            if(confirm('Are you sure you want to delete this expense ?')){
                const url = `${this.$api}expenses/${id}`
                const res = await fetch(url,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'auth_token':this.$store.getters.AuthToken,
                        },
                        })
                const response = await res.json()
                if(response.status === 200){
                    this.loadToast("Expense removed successfully", "success");
                    await this.get_foreman_expenses();
                } else {
                    this.loadToast(response.error, "error")
                }
            }
        },
        /* edit expenses */
        async edit_flo_expenses(expense){
            document.getElementById("changes-modal").style.display = "block";
            this.changesModalProps.expense_id = expense.id;
            this.changesModalProps.expense_purpose = expense.purpose;
            this.changesModalProps.expense_client = expense.expense_client;
            this.changesModalProps.expense_amount = expense.amount;
        },
        async edit_foreman_expenses(expense){
            document.getElementById("changes-modal").style.display = "block";
             this.changesModalProps.expense_id = expense.id;
             this.changesModalProps.expense_purpose = expense.purpose;
             this.changesModalProps.expense_client = expense.expense_client;
             this.changesModalProps.expense_amount = expense.amount;
        },
        async clearExpensesAndUpdate(){
            await this.get_flo_expenses();
            await this.get_foreman_expenses();
        },
        async get_todays_expenses(){
            // get all expenses for the day
            await this.$store.dispatch('getTodaysExpenses');
            this.todays_expenses = this.$store.getters.TodaysExpenses;
        },
        /* report functions */
        async get_expenses_by_flo_report(){},
        async get_foreman_expenses_report(){},
        async get_monies_to_foreman_report(){},
    },
    async created(){
        await this.$store.dispatch('getAllExpenses');
        this.all_expenses = this.$store.getters.AllExpenses;
    },
    mounted(){
        // we don't want the modal showing on load
        // the reason is we don't want to use v-show or v-if
        document.getElementById("changes-modal").style.display = "none";
    }
}
</script>
<style>
</style>