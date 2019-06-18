# PWA workshop

This is an easy and modern way to do [Google's your-first-pwapp](https://codelabs.developers.google.com/codelabs/your-first-pwapp)

## Pre-requisites

`git clone git@github.com:deanshub/pwa-workshop.git`

`npm i -g ngrok`

`npm i -g yarn` (or use the npm commands)

`yarn` (for installation)

## Introduction

Congratulations, you have a web app and it's responsive but since Eran Shabi doesn't want to access it through the browser, we want to make it easier for him by making it a PWA and installing it on our smartphone (just like any native app).

PWA is based on 2 main features:

- [Manifest File](https://developers.google.com/web/fundamentals/web-app-manifest/) - tells the container how the app should behave when it's native
- [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/) - A script separated from the web page that has rich APIs that bridges between the web app and everything that's outside of it.

We're going make it easy by generating both with [webpack](https://webpack.js.org/) and [Workbox](https://developers.google.com/web/tools/workbox/)

### 1) Start your dev environment

Start the server in dev mode

`yarn start`

Now you can start exploring the web app code. When you're ready to test it on your mobile smartphone:

you'll need to have a production build

`yarn run prod`

and https url

`ngrok http 3000`

this will generate a public URL (use the https one)

### 2) Setup the PWA manifest

#### Install [webpack pwa manifest plugin](https://github.com/arthurbergmz/webpack-pwa-manifest)

`yarn add --dev webpack-pwa-manifest`

#### Configure the plugin to generate the manifest file

```js
// client/webpack.config.js

// require the plugin
const WebpackPwaManifest = require('webpack-pwa-manifest')

// generate a manifest json (https://github.com/arthurbergmz/webpack-pwa-manifest)
const manifest = {
  name: 'Countdown',
  short_name: 'MyCountdown',
  description: 'My awesome Countdown Progressive Web App!',
  background_color: '#ffffff',
  crossorigin: 'use-credentials',
  icons: [
    {
      src: path.resolve('assets/joe.png'),
      sizes: [96, 128, 192, 256, 384, 512]
    },
    {
      src: path.resolve('assets/large-joe.png'),
      size: '1024x1024'
    }
  ]
}

// add the plugin to the list of webpack plugins
new WebpackPwaManifest(manifest),
```

### 3) Setup the Service Worker

#### Install [workbox webpack plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)

`yarn add --dev workbox-webpack-plugin`

#### Configure the plugin to generate the Service Worker

```js
// client/webpack.config.js

// require the plugin
const {GenerateSW} = require('workbox-webpack-plugin')

// add the plugin to the list of webpack plugins
new GenerateSW({
  clientsClaim: true, // Control any existing client when the Service Worker starts
  skipWaiting: true, // Skip the wait on update of the Service Worker
}),
```

This will tell Webpack to generate service-worker.js file with a few features activated (like caching, offline, updating and other)

### 3) Register the Service Worker

Now let's register the Service Worker we just created.

```js
// client/client/components/App/index.js

// Checks weather Service Workers are supported
if ('serviceWorker' in navigator) {
  // On load register the Worker and get the registration object
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
```

Once registered you now have a PWA that has caching for all assets, offline serving, service worker updating and in Chrome 67 and earlier automatically showing the prompt to install as native app.

Test it using Application -> Service Workers tab in Chorme devtools.

### 4) Install app using a button

#### Save the installation event for later use

```js
// client/client/components/App/index.js

let installPrompt

window.addEventListener('beforeinstallprompt', event => {
  // Don't show the install popup without the user asking for it (disabling auto prompt)
  event.preventDefault()

  // Save event for later
  installPrompt = event

  // Show or enable install button in your app
  setInstallable(true)
})
```

#### Use it in install app function

```js
// client/client/components/App/index.js

// use installPrompt variable
// and fill the TODOs
```

Now run `yarn run prod` and get your smartphone out, then go to the URL `ngrok http 300` generated and install the app using the Install App button

### 5) DIY: Notifications API

Try this one by your self,
When the time arrives, make sure the app notifies the user.

https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
