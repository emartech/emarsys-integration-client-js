# Build status

[![Codeship Status for emartech/emarsys-integration-client-js](https://codeship.com/projects/bddb87a0-4fd8-0133-2d72-6a2063c5e118/status?branch=master)](https://codeship.com/projects/107427)

# emarsys-integration-client-js

Emarsys Integration Client JS is a library providing methods of communication between Emarsys and integrated services running in an iframe.

# Install

```bash
npm install emarsys-integration-client --save
```

# Usage

```javascript
var ClientApi = require('emarsys-integration-client');
var clientApi = ClientApi.init({
  global: window,
  integrationId: 'my-integration',
  integrationInstanceId: 1234567
});
```

In the code above, integrationId and integrationInstanceId should have the values passed in the iframe URL.

# Library methods

## alert.error(text: String)
## alert.info(text: String)
## alert.log(text: String)
## alert.success(text: String)
## alert.warn(text: String)

Calling the methods above will render different types of Emarsys UI alerts with the `text` given.

## alert.send(options: Object)

It's a lower level method for displaying custom alerts.

__Options__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|text: String|Name of the handler to pass the message to.|YES|
|icon: String|Icon class of the icon to be rendered on the left side of the alert. Eg. 'check' for a check mark or 'exclamation-circle' for an exclamation mark in a circle.|NO|
|className: String|Alert sub-class to use when rendering the alert. Eg. 'e-alert-success' for a green bar, 'e-alert-danger' for a red one.|NO|
|timeout: Int|Amount of time after the alert will fade out and get removed from the DOM, in milliseconds.|NO|5000|

## enableButton(selector: String)

This will enable a button selected.

## dialog.close()

Closing the dialog and removing it from DOM.

## dialog.confirm(options: Object)

Rendering a confirm dialog.

__Options__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|title: String|Title of the confirm dialog.|YES||
|body: String|Body text of the confirm dialog.|NO||
|cancel: String|Text of Cancel button.|YES||
|ok: String|Text of OK button.|YES||

## dialog.modal(options: Object)

Rendering a modal dialog with it's content in an iframe.

__Options__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|src: String|URL for the iframe providing the modal content.|YES||
|width: Int|Width of the modal.|NO|650|
|height: Int|Height of the modal.|NO|500|

## dialog.submit(success: Boolean, data: Object)

Submitting a dialog.

__Options__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|success: Boolean|True if the result of the dialog is truthy.|YES||
|data: Object|Arbitrary object to send to the originating service.|NO|{}|

## navigate(options: Object)

Navigating the browser to a preset page.

__Options__

|Field|Role|Mandatory|
|-----|----|---------|
|target: String|The prespecified target you would like to head to.|YES|
|params.foo: Object|The general param the actual target needs.|MIXED|

__Targets available__

|Target|Action|Params|
|------|------|------|
|email_campaigns/list|Will head to the campaign list.||
|email_campaigns/edit|Will open the editor with the campaign set.|campaign_id|
|email_analysis/list|Will head to reporting.||
|email_analysis/details|Will head to reporting details of a campaign.|campaign_id, launch_id|

## refresh()

Reloading the whole page.

## resize(height: Int)

Resizing the iframe sending the message.

|dialog.confirm|Rendering a confirm dialog|
|dialog.modal|Rendering a modal dialog|
|dialog.submit|Submitting an open dialog|
|dialog.close|Closing an open dialog|

## unload:init(options: Object)

Setting up click handler for `<a>` elements, popping a navigation confirm dialog when clicked. It makes sense to call this method right after your content gets dirty.

__Options__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|selector: String|Selector for ancestor elements of `<a>` elements.|YES||
|confirm: Object|Options for confirm dialog. See `dialog.confirm()`.|NO|Options for a general unload confirm dialog.|

## unload:reset(selector: String)

Stopping to watch click events of elements selected by `selector`.  It makes sense to call this method right after your content gets clean (ie. saved).
