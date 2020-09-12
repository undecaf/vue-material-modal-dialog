<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <div class="md-layout-item md-title">
        &lt;md-modal-dialog&gt; demo
      </div>

      <md-button
        id="show-a"
        class="md-raised"
        @click="show(false)"
      >
        Dialog A
      </md-button>

      <md-button
        id="show-b"
        class="md-raised"
        @click="show(true)"
      >
        Dialog B
      </md-button>
    </md-app-toolbar>

    <md-app-content>
      <p class="md-title">Returned from dialog: <span id="returned">{{ result }}</span></p>
    </md-app-content>
  </md-app>
</template>

<script>
    import DialogA from '@/components/DialogA'
    import DialogB from '@/components/DialogB'

    export default {
        name: 'App',

        data() {
            return {
                result: undefined,
            }
        },

        methods: {
            show(b) {
                const dialog = b ? DialogB : DialogA
                this.result = undefined
                this.$modal
                    .show(dialog, { msg: 'A message from the Demo component' })
                    .then(result => this.result = result)
                    .catch(reason => this.result = reason)
            }
        },
    }
</script>

<style scoped>
</style>
