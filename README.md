## Universal Windows Platform (uwp) samples using JXcore

With uwp api you can use windows specific methods such as detecting devices connected or reading files from special folders [etc](https://msdn.microsoft.com/en-us/library/windows/apps/br211377.aspx).

JXcore is fork of nodejs and supports multiple JavaScript engines. If you build it with chakra engine on Windows 10 and Visual Studio 2015, you will be able to use uwp api.

### Build

Clone JXcore code from repository:

```bash
git clone https://github.com/jxcore/jxcore.git
```

Build with chakra engine:

```bash
vcbuild.bat --engine-chakra
```

After successfull build, you will have jxcore executable available in `Release/jx.exe`.
To run samples, cd to samples directory and run:

```bash
<path-to-jxcore>/Release/jx.exe index.js
```

### Uwp api call examples

First you  have to define which namespace you need (`Windows` in this case):

```javascript
var uwp = jxcore.uwp;
uwp.projectNamespace("Windows");
```

#### Battery status:

```javascript
var batteryStatus = Windows.System.Power.PowerManager.batteryStatus;
var batteryStatusEnum = Windows.System.Power.BatteryStatus;

if (batteryStatus === batteryStatusEnum.notPresent) {
	console.log('The battery or battery controller is not present.');
} else if (batteryStatus === batteryStatusEnum.discharging) {
	console.log('The battery is discharging.');
} else if (batteryStatus === batteryStatusEnum.idle) {
	console.log('The battery is idle.');
} else if (batteryStatus === batteryStatusEnum.charging) {
	console.log('The battery is charging.');
}
```

#### Reading/writing file in known windows folders, like pictures, documents, videos etc.

```javascript
Windows.Storage.KnownFolders.picturesLibrary.createFileAsync('sample.png',
	Windows.Storage.CreationCollisionOption.replaceExisting).done(function () {
		// created succesfully
	}, function (err) {
		// handle error
	});
```

*Methods that end with `Async` are asynchronous and return promise.

#### Input devices:

```javascript
// check if mouse is present
var mouseCapabilities = new Windows.Devices.Input.MouseCapabilities();
if (!mouseCapabilities.mousePresent) {
	console.log('Mouse is present');
} else {
	console.log('Mouse is not present');
}

// check if keyboard is present
var keyboardCapabilities = new Windows.Devices.Input.KeyboardCapabilities();
if (!mouseCapabilities.keyboardPresent) {
	console.log('Keyboard is present');
} else {
	console.log('Keyboard is not present');
}
```

After completing all the calls you have to call `uwp.close()` to release uwp or the process won't finish.
You can find more information about windows api [here](https://msdn.microsoft.com/en-us/library/windows/apps/br211377.aspx).
