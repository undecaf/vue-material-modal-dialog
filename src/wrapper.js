import MdModalDialog from "./md-modal-dialog.vue"

// Install function executed by Vue.use()
export const install =  MdModalDialog.install

// Auto-install if Vue is found (eg. in browsers via <script> tag)
let GlobalVue

if (typeof window !== "undefined") {
    GlobalVue = window.Vue
} else if (typeof global !== "undefined") {
    GlobalVue = global.Vue
}

if (GlobalVue) {
    GlobalVue.use({ install })
}
