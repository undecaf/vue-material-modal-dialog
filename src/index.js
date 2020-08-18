import Component from "./md-modal-dialog.vue"

// Module definition for Vue.use()
const plugin = {
    install: Component.install
}

if (!process.env.ES_BUILD) {
    // Auto-install if Vue is found (eg. in browsers via <script> tag)
    let GlobalVue

    if (typeof window !== "undefined") {
        GlobalVue = window.Vue
    } else if (typeof global !== "undefined") {
        GlobalVue = global.Vue
    }

    if (GlobalVue) {
        GlobalVue.use(plugin)
    }
}

export default Component
