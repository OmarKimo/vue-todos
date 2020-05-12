import { mount } from '@vue/test-utils'
import CreateTodo from "@/components/CreateTodo.vue";

describe('CreateTodo', () => {

    it('add new todo with the text written in the input element', () => {
        const wrapper = mount(CreateTodo)
        const textInput = wrapper.find('input')
        textInput.setValue("test");
        expect(wrapper.vm.newTodo).toBe("test")
    })

    it('emit on-new-todo event when submitting the form with correct value (not "")', () => {
        const wrapper = mount(CreateTodo)
        const textInput = wrapper.find('input')
        textInput.setValue("test")
        const formInput = wrapper.find('form')
        formInput.trigger('submit.prevent')
        expect(wrapper.emitted('on-new-todo')).toBeTruthy()
    })

    it("don't emit on-new-todo event when submitting the form with empty value ", () => {
        const wrapper = mount(CreateTodo)
        const textInput = wrapper.find('input')
        textInput.setValue("")
        const formInput = wrapper.find('form')
        formInput.trigger('submit.prevent')
        expect(wrapper.emitted('on-new-todo')).toBeFalsy()
    })
})