# A reusable modal dialog for Vue Material


In [Vue Material](https://vuematerial.io/), components showing
a dialog have to contain an [`MdDialog`](https://vuematerial.io/components/dialog),
or a component based on an `MdDialog`.

There will be a separate dialog instance nested in each such component, 
even if different components use the same dialog or if components are repeated 
by `v-for`.

This repository provides a new component, `MdModalDialog`, as a substitute for
Vue Material's `MdDialog`. It offers the following features:

+   For each dialog there is at most a single instance, no matter how many components use it
+   `MdModalDialog` supports the same props and events as [`MdDialog`](https://vuematerial.io/components/dialog)
+   Simple API: showing the dialog returns a promise which will be fulfilled or rejected
    when the dialog is closed
+   Custom properties can be passed to a dialog


## Usage

### Installation

As a package:

```shell script
$ npm install vue-material-modal-dialog
    or
$ yarn add vue-material-modal-dialog
```

Included as `<script>`:

```html
<script src="https://cdn.jsdelivr.net/npm/vue-material-modal-dialog/dist/components.min.js"></script>
```


### Registering `MdModalDialog`

```javascript 1.8
import MdModalDialog from 'vue-material-modal-dialog'
import 'vue-material-modal-dialog/dist/md-modal-dialog.css'

    ...
// This must come after Vue.use(VueMaterial):
Vue.use(MdModalDialog)
```


### Controlling modal dialogs

`MdModalDialog` provides these functions:

+   `vm.$modal.show(dialog, [props])`  
    +   `{Vue component} dialog`
    +   `{Object} [props]`
    
    Shows a dialog component, can pass properties to the dialog instance; does not
    preserve the dialog state across `show()` calls.
    
    Returns a `Promise` that can be fulfilled by `vm.$modal.submit()` and
    rejected by `vm.$modal.cancel()`. Both functions close the dialog.

+   `vm.$modal.submit([result])`
    +   `{Any} [result]`
    
    Closes the dialog and fulfills the `Promise`; can return a result.

+   `vm.$modal.cancel([reason])`
    +   `{Any} [reason]`
    
    Closes the dialog and rejects the `Promise`; can return a reason.


### Creating modal dialog components

Just use `MdModalDialog` in the same way as `MdDialog` (without `md-active`),
for example for an input dialog:

```vue
<template>
  <md-modal-dialog>
    <md-dialog-title>Guess a number</md-dialog-title>

    <md-dialog-content>
      <md-field>
        <label>A number</label>
        <md-input type="number" v-model="number" />
      </md-field>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button @click="$modal.submit(number)">Submit</md-button>
      <md-button @click="$modal.cancel()">Cancel</md-button>  
    </md-dialog-actions>
  </md-modal-dialog>
</template>

<script>
  export default {
    name: 'GuessDialog',
      ...
  }
</script>
```

Some other component shows `GuessDialog` and receives the guessed number:

```vue
<template>
    ...
  <md-button @click="guess">Guess a number</md-button>
    ...
</template>

<script>
import GuessDialog from '@/components/guess-dialog'

export default {
    ...
  methods: {
    guess() {
      this.$modal
          .show(GuessDialog)
          .then(number => {
            // Do something with the guessed number
          })
          .catch(reason => {
            // Must be specified even if the reason is
            // irrelevant in order to avoid runtime warnings.
          })      
    } 
  },
}
</script>
```


### Passing properties to modal dialogs

Let's extend the example with an upper limit to the guessed number.
Use `v-slot` to make `GuessDialog` accept property `max`:

```vue
<template>
  <md-modal-dialog v-slot="{ max }">
    <md-dialog-title>Guess a number up to {{ max }}</md-dialog-title>

    <md-dialog-content>
      <md-field>
        <label>A number</label>
        <md-input type="number" v-model="number" :max="max" />
      </md-field>
    </md-dialog-content>
    ...
</template>
...
```

Elsewhere, show `GuessDialog` and pass a value for `max`:

```javascript 1.8
this.$modal.show(GuessDialog, { max: 42 })
           ...
```

## License

[MIT](http://opensource.org/licenses/MIT)
