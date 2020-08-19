import Vue from 'vue'
import VueMaterial from 'vue-material'
import { mount } from '@vue/test-utils'

import MdModalDialog from '@/../dist/components.esm'
import '@/../dist/components.css'
import MdModalDialogMock from './md-modal-dialog.mock.vue'


Vue.use(VueMaterial)
Vue.use(MdModalDialog)

describe('<md-modal-dialog>', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(MdModalDialogMock)
    })

    it('can be tested', () => {
    })
})
