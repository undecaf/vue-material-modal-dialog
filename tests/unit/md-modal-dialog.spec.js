import Vue from 'vue'
import VueMaterial from 'vue-material'
import { mount } from '@vue/test-utils'
import MdModalDialog from '@/../dist/md-modal-dialog.esm'
import MdModalDialogSpec from './md-modal-dialog.spec.vue'


Vue.use(VueMaterial)
Vue.use(MdModalDialog)

describe('md-modal-dialog', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(MdModalDialogSpec)
    })

    it('can be tested', () => {
    })
})
