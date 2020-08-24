# A reusable modal dialog for Vue Material

![Minified size](https://badgen.net/bundlephobia/min/vue-material-modal-dialog)
![Open issues](https://badgen.net/github/open-issues/undecaf/vue-material-modal-dialog)
![Total downloads](https://badgen.net/npm/dt/vue-material-modal-dialog)
![License](https://badgen.net/npm/license/vue-material-modal-dialog)


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

In order to show `GuessDialog` and to receive the guessed number in some other component:

```javascript 1.8
vm.$modal
    .show(GuessDialog)
    .then(number => {
        // Do something with the guessed number
    })
    .catch(reason => {
        // In order to avoid runtime warnings, a catch clause
        // is required even if the reason is ignored
    })      
} 
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

In order to show `GuessDialog`, pass a `max` value and receive the guessed number:

```javascript 1.8
vm.$modal.show(GuessDialog, { max: 42 })
           ...
```


### Returning a reason on `ESC` and outside clicks

If the dialog is cancellable by clicking outside and/or by `ESC` _and_ if a reason is to be
returned in these cases then this is one possible approach (`cancel()` is one of the component's
`methods`):

```vue
<template>
  <md-modal-dialog @md-clicked-outside="cancel()" @keydown.esc="cancel()">
      ...
    <md-button @click="cancel()">Cancel</md-button>
      ...
  </md-modal-dialog>
</template>
```

  
## License

Software: [MIT](http://opensource.org/licenses/MIT)

Documentation: [CC-BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
