# Build status

[![Codeship Status for emartech/emarsys-integration-client-js](https://codeship.com/projects/bddb87a0-4fd8-0133-2d72-6a2063c5e118/status?branch=master)](https://codeship.com/projects/107427)
[![Dependency Status](https://david-dm.org/emartech/emarsys-integration-client-js.svg)](https://david-dm.org/emartech/emarsys-integration-client-js)
[![devDependency Status](https://david-dm.org/emartech/emarsys-integration-client-js/dev-status.svg)](https://david-dm.org/emartech/emarsys-integration-client-js#info=devDependencies)
# emarsys-integration-client-js

Emarsys Integration Client JS is a library providing methods of communication between Emarsys and integrated services running in an iframe.

# Requirements

- [Node.js](https://nodejs.org/en) >= 16.14.2

# Install

```bash
npm install emarsys-integration-client --save
```

# Usage

```javascript
const { integrationClient } = require('emarsys-integration-client');

const result = await itegrationClient.getUrl({ target: 'email_analysis/list' });
const href = result.data.url;

```

# Legacy usage

Earlier versions of this package required you to create an instance with custom config.
Most methods now work without this, but if you are using `messageToService` explicitly,
you might still need to instantiate like this:

```javascript
var IntegrationClient = require('emarsys-integration-client');
var integrationClient = IntegrationClient.init({
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
|text: String|Alert message.|YES|
|icon: String|Icon class of the icon to be rendered on the left side of the alert. Eg. 'check' for a check mark or 'exclamation-circle' for an exclamation mark in a circle.|NO|
|className: String|Alert sub-class to use when rendering the alert. Eg. 'e-alert-success' for a green bar, 'e-alert-danger' for a red one.|NO|
|timeout: Int|Amount of time after the alert will fade out and get removed from the DOM, in milliseconds.|NO|1500|

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

## getUrl(options: Object)

Returns the url of a preset page. [Available targets](https://github.com/emartech/emarsys-integration-js#navigate)

__Options__

|Field|Role|Mandatory|
|-----|----|---------|
|target: String|The prespecified target you would like a link to.|YES|
|params.foo: Object|The general param the actual target needs.|MIXED|

## navigate(options: Object)

Navigating the browser to a preset page. [Available targets](https://github.com/emartech/emarsys-integration-js#navigate)

__Options__

|Field|Role|Mandatory|
|-----|----|---------|
|target: String|The prespecified target you would like to head to.|YES|
|params.foo: Object|The general param the actual target needs.|MIXED|

## refresh()

Reloading the whole page.

## resize(height: Int)

Resizing the iframe.

## track(options: Object)

Sending a track message.

## unload:init(options: Object)

Setting up click handler for `<a>` elements, popping a navigation confirm dialog when clicked. It makes sense to call this method right after your content gets dirty.

__Options__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|selector: String|Selector for ancestor elements of `<a>` elements.|YES||
|confirm: Object|Options for confirm dialog. See `dialog.confirm()`.|NO|Options for a general unload confirm dialog.|

## unload:reset(selector: String)

Stopping to watch click events of elements selected by `selector`.  It makes sense to call this method right after your content gets clean (ie. saved).

# Contributing

Contributions are welcomed.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/***`)
3. Commit your Changes (`git commit -m 'Added feature: ...'`)
4. Push to the Branch (`git push origin feature/***`)
5. Open a Pull Request

# Code of Conduct

See [Code of Conduct here](https://github.com/emartech/.github/blob/main/CODE_OF_CONDUCT.md).

# Licensing

[MIT](https://github.com/emartech/emarsys-integration-client-js/blob/master/LICENSE)

