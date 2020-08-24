import Vue from "vue"
import VueMaterial from 'vue-material'
import MdModalDialog from '@/../dist/components.esm'
import '@/../dist/components.css'
import Test from "@/components/Test.vue"
import "@/main.css"


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(MdModalDialog)


new Vue({
    el: "#app",
    render: h => h(Test),
})
