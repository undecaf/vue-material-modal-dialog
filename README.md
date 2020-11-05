# A reusable modal dialog for Vue Material

![Minified size](https://badgen.net/bundlephobia/min/vue-material-modal-dialog)
![Open issues](https://badgen.net/github/open-issues/undecaf/vue-material-modal-dialog)
![Vulnerabilities](https://snyk.io/test/npm/vue-material-modal-dialog/badge.svg)
![Total downloads](https://badgen.net/npm/dt/vue-material-modal-dialog)
![License](https://badgen.net/npm/license/vue-material-modal-dialog)


In [Vue Material](https://vuematerial.io/), components showing
a dialog have to _contain_ an [`MdDialog`](https://vuematerial.io/components/dialog),
or a component based on `MdDialog`. This couples the modal dialog to the surrounding component
and creates a separate dialog instance/comment placeholder for each occurrence, eventually
multiplied by `v-for`.

This repository provides a component, `MdModalDialog`, that avoids this situation.
It acts as a substitute for Vue Material's `MdDialog`, offering the following additional features:

+   `MdModalDialog`s are completely _decoupled_ from other components
+   They only have to be `import`ed but not to be placed in the `<template>` of other components
+   `MdModalDialog` supports the same props and events as [`MdDialog`](https://vuematerial.io/components/dialog)
+   Simple API: showing the dialog returns a promise which will be fulfilled or rejected
    when the dialog is closed
+   Input data can be transferred from the dialog to the calling component
+   Properties can be passed for runtime customization of the dialog
+   At any point in time there will be at most one single `MdModalDialog` instance

A simple online example [is available here](https://undecaf.github.io/vue-material-modal-dialog/example/)
([example source code](https://github.com/undecaf/vue-material-modal-dialog/blob/master/src/components/Demo.vue)).


## Installation

As a module:

```shell script
$ npm install vue-material-modal-dialog
    or
$ yarn add vue-material-modal-dialog
```

Included as `<script>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-material-modal-dialog/dist/components.css">
<script src="https://cdn.jsdelivr.net/npm/vue-material-modal-dialog/dist/components.min.js"></script>
```


## Usage

### Registering the `MdModalDialog` component

```javascript 1.8
import MdModalDialog from 'vue-material-modal-dialog'
import 'vue-material-modal-dialog/dist/md-modal-dialog.css'
    ...
// This must come after Vue.use(VueMaterial):
Vue.use(MdModalDialog)
```


### Controlling modal dialogs

`MdModalDialog` provides these functions:

#### `vm.$modal.show(dialog, [props])`, `Vue.modal.show(dialog, [props])`

+   `{Vue component} dialog`
+   `{Object} [props]`

Shows a dialog component in pristine state, can pass `props` to the dialog instance; does not
preserve the dialog state across `show()` calls.

Returns a `Promise` that can be fulfilled by `vm.$modal.submit()` and
rejected by `vm.$modal.cancel()`. Either function closes the dialog.


#### `vm.$modal.submit([result])`, `Vue.modal.submit([result])`

+   `{Any} [result]`

Closes the dialog and fulfills the `Promise`; can return a `result`.


#### `vm.$modal.cancel([reason])`, `Vue.modal.cancel([reason])`

+   `{Any} [reason]`

Closes the dialog and rejects the `Promise`; can return a `reason` for rejection.


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

Showing `GuessDialog` and receiving the guessed number in some other component:

```javascript 1.8
vm.$modal
    .show(GuessDialog)
    .then(number => {
        // Do something with "number"
    })
    .catch(reason => {
        // In order to avoid runtime warnings, a catch clause
        // is required even if "reason" is ignored
    })      
} 
```


### Passing properties to modal dialogs

Let's extend the example with a configurable upper limit for the guessed number.
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

Showing `GuessDialog` and passing a `max` value:

```javascript 1.8
vm.$modal
    .show(GuessDialog, { max: 42 })
    .then(...)
    .catch(...)
```


### Returning a reason on `ESC` and outside clicks

+   If a dialog is configured to be closed by clicking outside and/or by `ESC`,
+   _and_ if a reason is to be returned in these cases

then this is one possible approach:

```vue
<template>
  <md-modal-dialog
    @md-clicked-outside="$modal.cancel('byClick')"
    @keydown.esc="$modal.cancel('byEsc')">
      ...
    <md-button @click="$modal.cancel('byButton')">Cancel</md-button>
      ...
  </md-modal-dialog>
</template>
```

  
## License

Software: [MIT](http://opensource.org/licenses/MIT)

Documentation: [CC-BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
