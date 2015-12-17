## Universal Windows Platform (uwp) samples using JXcore

With the help of uwp api you can use windows specific methods such as detecting devices connected or reading files from special folders... JXcore allows to do it with JavaScript. It supports multiple JavaScript engines. If you build JXcore with chakra engine, then you will get uwp support. To build JXcore chakra engine you will need Visual studio 2015 installed on Windows 10.

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

#### Battery status:

```javascript
if (Windows.System.Power.PowerManager.batteryStatus === batteryStatusEnum.notPresent) {
	console.log('The battery is not present.');
}
```

Available battery statuses are: `notPresent`, `discharging`, 'idle' and `charging`.
You can also get percentage of charged battery and remaning time (See `index.js` for full samples).

#### Reading/writing file in known windows folders, like pictures, documents, videos etc.

```javascript
Windows.Storage.KnownFolders.picturesLibrary.createFileAsync('sample.png',
	Windows.Storage.CreationCollisionOption.replaceExisting).done(function () {
		// created succesfully
	}, function (err) {
		// handle error
	});
```

#### Check if mouse is present:

```javascript
var mouseCapabilities = new Windows.Devices.Input.MouseCapabilities();
if (!mouseCapabilities.mousePresent) {
	console.log('Mouse is present');
} else {
	console.log('Mouse is not present');
}
```

You can find more information about windows api [here](https://msdn.microsoft.com/en-us/library/windows/apps/br211377.aspx).
