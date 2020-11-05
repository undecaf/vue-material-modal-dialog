import Vue from 'vue'
import VueMaterial from 'vue-material'


Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(VueMaterial)


describe('<md-modal-dialog> (Browser)', () => {

    before(async () => {
        // Make Vue visible in the browser context
        window.Vue = Vue
        await import('@/../dist/components.min')
        await import('@/../dist/components.css')
    })

    it('is registered as Vue component', async () => {
        expect(Vue.options.components.MdModalDialog).to.be.a('function')
        expect(Vue.$modal).to.be.a('object')
        expect(Vue.prototype.$modal).to.be.a('object')
    })
})
