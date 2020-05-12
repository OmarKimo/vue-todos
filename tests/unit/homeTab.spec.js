import { mount } from '@vue/test-utils'
import Home from "@/components/home.vue";

describe('Home', () => {
    it('"Home" is the first (biggest) paragraph in the page', () => {
        const wrapper = mount(Home)
        expect(wrapper.find('h1').text()).toBe('Home')
    })

    it('the page contains four paragraphs', () => {
        const wrapper = mount(Home)
        expect(wrapper.findAll("h1, h2, h3, h4, h5, h6").length).toBe(4)
    })
})