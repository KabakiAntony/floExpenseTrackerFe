<template>
<main>
    <div class="actions">
    <button class="action-links" @click="openAction($event,'batchExpense')">Batch</button>
    <button class="action-links" @click="openAction($event, 'floExpense')">Flo</button>
    <button class="action-links" @click="openAction($event, 'foremanExpense')">Foreman</button>
    <button class="action-links" @click="openAction($event, 'generateReports')">Reports</button>
    </div>
    <div class="actionContent" id="batchExpense">
        <h3>Upload batch expenses</h3>
        <p>Batch expenses and upload them in a file</p>
         <hr>
        <form @submit.prevent="uploadBatchExpenses" class="dash">
            <label >Select expense type</label>
            <select  v-model="expense_type" required>
            <option value="flo">Flo</option>
            <option value="foreman">Foreman</option>
            </select>
            <label>Batch file</label>
            <input type="file"  class="file" id="newBatchFile" accept=".xlsx, .xls" required/>
            <button :class="action" class="submit dashboard-submit">{{ new_batch_submit }}</button>
        </form>
    </div>
    <div class="actionContent" id="floExpense">
        <h3>Your expenses</h3>
        <p>Add expenses made by you</p>
        <p>Select who you are expensing / paying to foreman or other</p>
        <hr>
        <div class="holder">
            <div class="input-expenses">
                <div class="holder-padding">
                    <label >Expense to</label>
                    <select  v-model="expense_to" required class="holder-select">
                    <option value="foreman">Monies to foreman</option>
                    <option value="other">Monies to other</option>
                    </select>
                </div>
                <div v-if="expense_to === 'foreman'">
                    <form @submit.prevent="addFloExpenses" class="holder-padding">
                    <label>Amount</label>
                    <input type="number" v-model="flo_amount" required>
                    <button :class="action" class="submit holder-padding-submit">{{ flo_expenses_submit }}</button>
                    </form>
                </div>
                <div v-if="expense_to === 'other'">
                    <form @submit.prevent="addFloExpenses" class="holder-padding">
                    <label>Purpose</label>
                    <input type="text" v-model="flo_purpose" required>
                    <label>Client</label>
                    <input type="text" v-model="flo_client">
                    <label>Amount</label>
                    <input type="number" v-model="flo_amount" required>
                    <button :class="action" class="submit holder-padding-submit">{{ flo_expenses_submit }}</button>
                    </form>
                </div>
            </div>
            <div class="list-expenses">
                <label>Todays expenses</label>
                <div class="list-expenses-li">
                    <ul>
                        <li>expense one
                            <div class="buttons">
                                <button class="expense-button edit">Edit</button>
                                <button class="expense-button remove">Remove</button>
                            </div>
                        </li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="actionContent" id="foremanExpense">
        <h3>Foremans expenses</h3>
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
                 <label>Todays expenses</label>
                <div class="list-expenses-li">
                    <ul>
                        <li>expense one
                            <div class="buttons">
                                <button class="expense-button edit">Edit</button>
                                <button class="expense-button remove">Remove</button>
                            </div>
                        </li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                        <li>expense one</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="actionContent" id="generateReports">
        <h3>Generate various reports</h3>
    </div>
    <h4 class="center-text text-margin" id="profileInstruction">Click on any option to carry out the task.</h4> 

</main>
</template>
<script>
import { openAction } from '../utils'

export default{
    name:'Dashboard',
    data(){
        return{
            expense_type:null,
            flo_purpose:null,
            flo_client:null,
            flo_amount:null,
            foreman_purpose:null,
            foreman_client:null,
            foreman_amount:null,
            expense_to:null,
            flo_expenses_submit:"Add expense",
            foreman_expenses_submit:"Add expense",
            new_batch_submit:"Upload file",
        }
    },
    methods:{
        openAction,
    }
}
</script>
<style>
</style>