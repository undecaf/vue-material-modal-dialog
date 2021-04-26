<template>
  <md-modal-dialog
    id="dialog-b"
    v-slot="{ msg }"
    :md-close-on-esc="false"
  >
    <md-dialog-title>Dialog B</md-dialog-title>

    <md-dialog-content>
      <p>Message passed via <code>v-slot</code>: <span id="msg1">{{ msg }}</span></p>
      <p>Message passed via <code>$modal.slotProps</code>: <span id="msg2">{{ $modal.slotProps.msg }}</span></p>

      <md-field>
        <label>Some input, returned in an object</label>
        <md-input
          id="input-b"
          v-model="input"
          type="text"
        />
      </md-field>

      <p>This dialog cannot be cancelled by <code>ESC</code>.</p>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button
        id="cancel-button"
        class="md-raised"
        @click="$modal.cancel({ reason: 'cancelled' })"
      >
        Cancel
      </md-button>
      <md-button
        id="ok-button"
        class="md-raised"
        @click="$modal.submit({ result: input })"
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
        }
    },
}
</script>
