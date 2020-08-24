<template>
  <md-dialog
    v-bind="$attrs"
    :md-active.sync="$modal._active"
    v-on="$listeners"
    @md-closed="$modal.cancel()"
  >
    <slot v-bind="$modal._slotProps" />
  </md-dialog>
</template>


<script>
import Vue from 'vue'

export default {
    name: 'MdModalDialog',

    install(Vue, options) {
        if (this.install.installed) {
            return
        }
        this.install.installed = true

        const Container = Vue.component(
            'ModalDialogContainer',
            {
                data() {
                    return {
                        dialog: null,
                    }
                },

                render: function(createElement) {
                    const element = createElement(this.dialog)

                    if (!element.asyncFactory || element.asyncFactory.resolved) {
                        this.$nextTick(() => this.$modal._active = !element.isComment)
                    }

                    return element
                },
            })

        const container = new Container()
        container.$mount()
        document.body.appendChild(container.$el)


        Vue.prototype.$modal = {
            _active: false,
            _slotProps: {},
        }

        Vue.observable(Vue.prototype.$modal)

        Vue.prototype.$modal.show = function(dialog, slotProps = {}) {
            this._slotProps = slotProps
            container.dialog = dialog

            return new Promise((resolve, reject) => {
                const settle = (fn, result) => {
                    container.dialog = null
                    fn(result)
                }

                this.submit = settle.bind(this, resolve)
                this.cancel = settle.bind(this, reject)
            })
        }

        Vue.component('MdModalDialog', this)
    },
}
</script>

<style>
/* Workaround for: MdModalDialog button text may not appear in Webkit browsers */
.md-dialog-actions .md-ripple {
    z-index: auto;
}
</style>
