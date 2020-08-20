import Vue from 'vue'
import VueMaterial from 'vue-material'


Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(VueMaterial)

window.Vue = Vue
import('@/../dist/components.min')


describe('<md-modal-dialog> (Browser)', () => {
    it('is registered as Vue component', async () => {
        expect(Vue.options.components.MdModalDialog).to.be.a('function')
    })
})
