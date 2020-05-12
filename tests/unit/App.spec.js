import { mount } from '@vue/test-utils'
import App from "@/App.vue";
import Navigation from "@/components/Navigation.vue";


describe('App', () => {
    it('renders Navigation with mount', () => {
        const wrapper = mount(App)
        expect(wrapper.findComponent(Navigation).exists()).toBe(true)
    })
})