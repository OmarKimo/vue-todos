import { mount } from '@vue/test-utils'
import TodoList from "@/components/TodoList.vue";
import Todo from "@/components/Todo.vue";
import CreateTodo from "@/components/CreateTodo.vue";

describe('TodoList', () => {
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

    it('renders CreateTodo with mount', () => {
        const wrapper = mount(TodoList)
        expect(wrapper.findComponent(CreateTodo).exists()).toBe(true)
    })

    it("Should call localStorage getItem with \"todos\" on mounting", async() => {
        mount(TodoList);
        expect(window.localStorage.getItem).toHaveBeenCalledWith("todos");
    });
    
    it('don\'t display "No TODOs in your list yet" if todos list isn\'t empty', async() => {
        const wrapper = mount(TodoList)
        await wrapper.vm.addTodo("test")
        expect(wrapper.find('h3').exists()).toBe(false)
    })    

    it('display "No TODOs in your list yet" if todos list is empty', async() => {
        const wrapper = mount(TodoList)
        expect(wrapper.find('h3').exists()).toBe(true)
    }) 

    it('set todos list to what in localStorage if it\'s correct', () => {
        const parsed = JSON.stringify([{ description: "newTodo", completed: false }])
        window.localStorage.setItem("todos", parsed)
        const wrapper = mount(TodoList)
        expect(wrapper.vm.todos).toStrictEqual([{ description: "newTodo", completed: false }])
    }) 

    it('first paragraph is "My TODOs"', () => {
        const wrapper = mount(TodoList)
        expect(wrapper.find('h1').text()).toBe('My TODOs')
    })

    it('save new todos to localStorage', async() => {
        const wrapper = mount(TodoList)
        await wrapper.vm.addTodo("test")
        const arr = JSON.parse(window.localStorage.getItem("todos"));
        expect(wrapper.vm.todos).toStrictEqual(arr)
    })

    it('new todo is added if "on-new-todo" event is emitted', async () => {
        const addTodoMock = jest.fn()
        const wrapper = mount(TodoList, {
            methods:{
                addTodo: addTodoMock
            }
        })
        await wrapper.vm.$refs.createTodo.$emit('on-new-todo', "test")
        expect(addTodoMock).toBeCalledTimes(1)
    })

    it('renders number of todo components equal to what in todos', async () => {
        const wrapper = mount(TodoList)
        await wrapper.vm.addTodo("test")
        expect(wrapper.findAllComponents(Todo).length).toBe(1)
    })

    it('remove todo item when it is checked', async () => {
        const wrapper = mount(TodoList)
        await wrapper.vm.addTodo("test")
        await wrapper.vm.toggleTodo(wrapper.findComponent(Todo))
        expect(wrapper.vm.todos.length).toBe(0)
    })

    it('remove todo item when it is deleted', async () => {
        const wrapper = mount(TodoList)
        await wrapper.vm.addTodo("test")
        await wrapper.vm.deleteTodo(wrapper.findComponent(Todo))
        expect(wrapper.vm.todos.length).toBe(0)
    })

    it('edit todo item correctly', async () => {
        const wrapper = mount(TodoList)
        wrapper.vm.addTodo("test")
        await wrapper.vm.editTodo(wrapper.vm.todos[0], "editTest")
        expect(wrapper.vm.todos[0]['description']).toBe("editTest")
    })
})