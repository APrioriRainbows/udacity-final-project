## About this Project

This is a simple, responsive interactive Google Map which displays data on a handful of local coffee shops. I built it as my capstone project for GrowWith Google's front-end scholarship program.

*A demo of this app can be seen at [this page](https://coffee-map.apriorirainbows.com).*

## Downloading and Running the Source Code

1. To download the development files, simply clone the repo and run `npm install` If you need npm you can get it here [npm](https://www.npmjs.com/get-npm).

2. Insert your Maps API key in src/map.js, and insert your clientID and clientSecret for foursquare in src/App.js.

Alternately you can create a file in src called `keys.js` which contains the following...

```
export const MAPS_API_KEY = '{your maps api key}';
export const FS_CLIENT_ID = '{your client ID}';
export const FS_CLIENT_SECRET = '{your client secret}';
```
This is already imported into the correct files, so following this format will allow your keys to work throughout the app.

3. Once this is complete, you can start the server.
`npm start` will serve the project on port 3000 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## About the Code

### Other Packages
In additional to all of the packages included with Create React App this project also utilizes [React Load Script](https://www.npmjs.com/package/react-load-script).
This allows asynchronous loading of the Google Maps Script. Instead of opting for a separate Map component (such as google-maps-react) which had limitations in terms of data handling, I chose to use React Load Script in conjunction with the Google Maps API.

### APIs
There are two APIs utilized in the project
 - Google's JavaScript Maps API
 -- Requires a key, which is free
 - Foursquare's Places API
 -- Requires a Client ID and a Client Secret, both of which are free

### Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Some relevant information from their documentation is included below.

If you'd like to edit this project please keep in mind...

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

### Supported Browsers

By default, the generated project supports all modern browsers.<br>
Support for Internet Explorer 9, 10, and 11 requires [polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md).

### Service Worker / Progressive Web App
For the demo version of the project, and the committed code, I've opted into the built-in service worker that comes with create react app.
You can read more about progressive web apps and service workers [here](https://developers.google.com/web/progressive-web-apps/).



