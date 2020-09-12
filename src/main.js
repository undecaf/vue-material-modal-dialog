import Vue from "vue"
import VueMaterial from 'vue-material'
import MdModalDialog from '@/..'
import '@/../dist/components.css'
import Deom from "@/components/Demo.vue"
import "@/main.css"


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(MdModalDialog)


new Vue({
    el: "#app",
    render: h => h(Deom),
})
