import { mount } from '@vue/test-utils'
import doneList from "@/components/doneList.vue";
import Todo from "@/components/Todo.vue";

describe('doneList', () => {
    const localStorageMock = (function() {
        let store = {}
        return {
          getItem: jest.fn((key) => {
            return store[key] || null
          }),
          setItem: jest.fn((key, value) => {
            store[key] = value.toString()
          }),
          removeItem: jest.fn((key) => {
            delete store[key]
          }),
          clear: jest.fn(() => {
            store = {}
          }),
        }
      })()
      
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    })

    beforeEach(() => window.localStorage.clear());

    it("Should call localStorage getItem with \"todos\" on mounting", async() => {
        mount(doneList);
        expect(window.localStorage.getItem).toHaveBeenCalledWith("doneTodos");
    });
    
    it('don\'t display "You haven\'t done any TODO yet" if list isn\'t empty', async() => {
        const wrapper = mount(doneList)
        await wrapper.setData({
            doneTodos: [{'description': "test", completed: true}]
        })
        expect(wrapper.find('h3').exists()).toBe(false)
    })    

    it('display "You haven\'t done any TODO yet" if todos list is empty', async() => {
        const wrapper = mount(doneList)
        expect(wrapper.find('h3').exists()).toBe(true)
    }) 

    it('set doneTodos list to what in localStorage if it\'s correct', () => {
        const parsed = JSON.stringify([{ description: "doneTodo", completed: true }])
        window.localStorage.setItem("doneTodos", parsed)
        const wrapper = mount(doneList)
        expect(wrapper.vm.doneTodos).toStrictEqual([{ description: "doneTodo", completed: true }])
    }) 

    it('first paragraph is "Done TODOs"', () => {
        const wrapper = mount(doneList)
        expect(wrapper.find('h1').text()).toBe("Done TODOs")
    })

    it('renders number of todo components equal to what in doneTodos', async () => {
        const wrapper = mount(doneList)
        await wrapper.setData({
          doneTodos: [
            {'description': "test", completed: true}, 
            {'description': "test2", completed: true}
          ]
        })
        expect(wrapper.findAllComponents(Todo).length).toBe(2)
    })

    it('remove doneTodo item when it is unchecked', async () => {
        const wrapper = mount(doneList)
        await wrapper.setData({
          doneTodos: [{'description': "test", completed: true}]
        })
        expect(wrapper.vm.doneTodos.length).toBe(1)
        await wrapper.vm.toggleTodo(wrapper.findComponent(Todo))
        expect(wrapper.vm.doneTodos.length).toBe(0)
    })

    it('remove todo item when it is deleted', async () => {
        const wrapper = mount(doneList)
        await wrapper.setData({
          doneTodos: [{'description': "test", completed: true}]
        })
        expect(wrapper.vm.doneTodos.length).toBe(1)
        await wrapper.vm.deleteTodo(wrapper.findComponent(Todo))
        expect(wrapper.vm.doneTodos.length).toBe(0)
    })
})