<template>
  <md-modal-dialog
    id="dialog-b"
    v-slot="{ msg }"
    :md-close-on-esc="false"
  >
    <md-dialog-title>Dialog B</md-dialog-title>

    <md-dialog-content>
      <p>From <code>v-slot</code>: <span id="msg1">{{ msg }}</span></p>
      <p>From <code>$modal.slotProps</code>: <span id="msg2">{{ $modal.slotProps.msg }}</span></p>

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
