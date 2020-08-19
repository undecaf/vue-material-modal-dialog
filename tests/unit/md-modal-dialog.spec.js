import Vue from 'vue'
import VueMaterial from 'vue-material'
import { mount } from '@vue/test-utils'

import MdModalDialog from '@/../dist/md-modal-dialog.esm'
import '@/../dist/md-modal-dialog.css'
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
