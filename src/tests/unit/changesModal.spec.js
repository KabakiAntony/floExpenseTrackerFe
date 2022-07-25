import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ChangesModal from '@/components/ChangesModal.vue'


describe('ChangesModal.vue', () => {
  
  let wrapper;

  beforeEach(()=>{
    wrapper = shallowMount(ChangesModal,
      {
        propsData:{
          expense_id:1,
          expense_purpose:"Expense purpose",
          expense_client: "Expense client",
          expense_amount: 1000,
        }
      })
    })

  afterEach(()=>{
    wrapper.unmount();
  } )

  it('tests we are getting the right component by name', () => {

    expect(wrapper.vm.$options.name).toMatch('ChangesModal')
  })

  it('test that a form is rendered', ()=>{

    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('test that our form has input fields', ()=>{

    expect(wrapper.find('form > input').exists()).toBe(true)
  })

  it('test that our form has a hidden input field',()=>{

    expect(wrapper.get('input[type=hidden]').exists()).toBe(true)
  })

  it('test that our form has a text input field',()=>{

    expect(wrapper.get('input[type=text]').exists()).toBe(true)
  })

  it('test that our form has a number input field',()=>{

    expect(wrapper.get('input[type=number]').exists()).toBe(true)
  })

  it('test setting values on inputs',async ()=>{

    const id = 1
    const purpose  = "purpose one"
    const amount = 100

    const id_input = wrapper.find('input[type=hidden')
    const purpose_input = wrapper.find('input[type=text]')
    const amount_input = wrapper.find('input[type=number')


    await id_input.setValue(id)
    await purpose_input.setValue(purpose)
    await amount_input.setValue(amount)

    expect(Number(id_input.element.value)).toBe(1)
    expect(purpose_input.element.value).toBe("purpose one")
    expect(Number(amount_input.element.value)).toBe(100)
})

// it('test submitting the form', async ()=>{
//     const id = 1
//     const purpose  = "purpose one"
//     const amount = 100

//     const id_input = wrapper.find('input[type=hidden')
//     const purpose_input = wrapper.find('input[type=text]')
//     const amount_input = wrapper.find('input[type=number')


//     await id_input.setValue(id)
//     await purpose_input.setValue(purpose)
//     await amount_input.setValue(amount)
//     await wrapper.find('form').trigger('submit.prevent')

//     console.log(wrapper.emitted('updateExpense'))

//     expect(wrapper.emitted('updateExpense')[0][0]).toStrictEqual({
//         id,
//         purpose,
//         amount
//     })
//   })

})