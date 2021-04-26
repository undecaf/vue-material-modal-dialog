<template>
  <md-modal-dialog
    id="dialog-a"
    @md-opened="event = true"
    @md-clicked-outside="$modal.cancel('cancelled by outside click')"
    @keydown.esc="$modal.cancel('cancelled by ESC')"
  >
    <md-dialog-title>Dialog A</md-dialog-title>

    <md-dialog-content>
      <p><code>md-opened</code> event detected: <span id="event">{{ event }}</span></p>

      <md-field>
        <label>Some input, returned as string</label>
        <md-input
          id="input-a"
          v-model="input"
          type="text"
        />
      </md-field>

      <p>This dialog can be cancelled also by <code>ESC</code> and by an outside click.</p>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button
        id="cancel-button"
        class="md-raised"
        @click="$modal.cancel('cancelled by button')"
      >
        Cancel
      </md-button>
      <md-button
        id="ok-button"
        class="md-raised"
        @click="$modal.submit(input)"
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
            event: false,
        }
    },
}
</script>
