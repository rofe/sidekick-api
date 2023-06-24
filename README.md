# AEM Sidekick API
This JavaScript API helps project developers communicate with the AEM Sidekick Extension. It wraps the browser's  `chrome.runtime.sendMessage()` calls with which your project page can interact with the extension.

## Requirements
- AEM Sidekick extension needs to be installed and configured for your project
- Your project's GitHub `owner` and `repo` need to be specified

## API
The following methods are available:

### `getStatus`
- Parameters: none
- Returns: `{Object}` The sidekick's current status

## Usage
Import the `SidekickAPI` class and create a new instance:
```js
import { SidekickAPI } from './sidekick-api.js';
var sk = new SidekickAPI({ owner: 'foo', repo: 'bar' });
```

All methods are asynchronous:
```js
const status = await sk.getStatus();
console.log(status);
```

### Working with local builds of AEM Sidekick
If you want to test communication with a local sidekick build, you need to set the `SIDEKICK_ID` as a global variable before using the API:
```js
window.SIDEKICK_ID = '...'; // ID of unpacked dev extension
```
