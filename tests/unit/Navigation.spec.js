import { mount } from '@vue/test-utils'
import Navigation from "@/components/Navigation.vue";

describe('Navigation', () => {

    it('number of tabs (navigation bars) = number of provided links (routes) [in our case = 3]', () => {
        const wrapper = mount(Navigation)
        expect(wrapper.findAll('b-nav-item').length).toBe(wrapper.vm.$data.links.length)
    })

    it('tab text is the text in each link', () => {
        const wrapper = mount(Navigation)
        expect(wrapper.find('b-nav-item').text()).toBe(wrapper.vm.$data.links[0].text)
    })
})