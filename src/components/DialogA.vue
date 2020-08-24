<template>
  <md-modal-dialog
    id="dialog-a"
    @md-opened="event = 'md-opened'"
    @md-clicked-outside="$modal.cancel('cancelled')"
    @keydown.esc="$modal.cancel('cancelled')"
  >
    <md-dialog-title>Dialog A</md-dialog-title>

    <md-dialog-content>
      <p>Event: <span id="event">{{ event }}</span></p>

      <md-field>
        <label>Some input</label>
        <md-input
          v-model="input"
          type="text"
        />
      </md-field>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button
        id="cancel-button"
        class="md-raised"
        @click="$modal.cancel('cancelled')"
      >
        Cancel
      </md-button>
      <md-button
        id="ok-button"
        class="md-raised"
        @click="$modal.submit(123)"
      >
        OK
      </md-button>
    </md-dialog-actions>
  </md-modal-dialog>
</template>

<script>
export default {
    name: "DialogA",

    data() {
        return {
            input: undefined,
            event: undefined,
        }
    },
}
</script>

<style scoped>

</style>