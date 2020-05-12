import { mount } from '@vue/test-utils'
import Todo from "@/components/Todo.vue";

describe('Todo', () => {

    it('title of the todo is the text (description) of the todo', () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'todo'
            }
        })
        expect(wrapper.find('button').text()).toBe('test')
    })

    it("'Mark as done' check button if the todo isn't done", () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'todo'
            }
        })
        expect(wrapper.find('#checkButton').attributes('title')).toBe('Mark as Done')
    })

    it("'Mark as undone' check button if the todo is done", () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'done'
            }
        })
        expect(wrapper.find('#checkButton').attributes('title')).toBe('Mark as undone')
    })

    it('No edit button when the todo is done', () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'done'
            }
        })
        expect(wrapper.findAll('button').length).toBe(3)
    })

    it('edit button is there when the todo is not done', () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'todo'
            }
        })
        expect(wrapper.findAll('button').length).toBe(4)
    })

    it("don't open the edit text input if edit button isn't clicked", () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'bla',
                completed: false,
                type: 'todo'
            }
        })
        expect(wrapper.find('input').exists()).toBe(false)
    })

    it("open the edit text input if edit button is clicked", async () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'bla',
                completed: false,
                type: 'todo'
            }
        })
        //console.log(wrapper.vm.isEditing)
        await wrapper.find('#editButton').trigger('click')
        //console.log(wrapper.vm.isEditing)
        expect(wrapper.find('input').exists()).toBe(true)
    })

    it('emit on-edit event when submitting the edit form', () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'bla',
                completed: false,
                type: 'todo'
            }, 
            data(){
                return {
                    isEditing: true
                }
            }
        })
        const textInput = wrapper.find('input')
        textInput.setValue("test")
        const formInput = wrapper.find('form')
        formInput.trigger('submit.prevent')
        expect(wrapper.emitted('on-edit')).toBeTruthy()
    })

    it('emit on-delete event when clicking on the delete button', async () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'todo'
            }
        })
        await wrapper.find('#deleteButton').trigger('click')
        expect(wrapper.emitted('on-delete')).toBeTruthy()
    })

    it('emit on-toggle event when clicking on the check button', async () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'test',
                completed: false,
                type: 'todo'
            }
        })
        await wrapper.find('#checkButton').trigger('click')
        expect(wrapper.emitted('on-toggle')).toBeTruthy()
    })

    it('return new todo text (description) when edit form is submitted', () => {
        const wrapper = mount(Todo, {
            propsData:{
                description: 'bla',
                completed: false,
                type: 'todo'
            }, 
            data(){
                return {
                    isEditing: true
                }
            }
        })
        const textInput = wrapper.find('input')
        textInput.setValue("test")
        const formInput = wrapper.find('form')
        formInput.trigger('submit.prevent')
        expect(wrapper.vm.$data.newTodoDescription).toBe('test')
    })

    it('at the end of editing call finishEditing', () => {
        const mockMethod = jest.fn()
        const wrapper = mount(Todo, {
            propsData:{
                description: 'bla',
                completed: false,
                type: 'todo'
            }, 
            methods: {
                finishEditing: mockMethod
            },
            data(){
                return {
                    isEditing: true
                }
            }
        })
        const textInput = wrapper.find('input')
        textInput.setValue("test")
        const formInput = wrapper.find('#editButton')
        formInput.trigger('click')
        expect(mockMethod).toBeCalled()
    })
})