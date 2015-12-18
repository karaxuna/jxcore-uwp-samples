var uwp = jxcore.uwp;
uwp.projectNamespace("Windows");

// date
var date = new Windows.Globalization.Calendar(['ka-ge']);
var localized = [
	date.eraAsString() + ' ' + date.yearAsString(),
	date.dayOfWeekAsString(),
	date.dayAsString() + ' ' + date.monthAsString()
].join(', ');
console.log('Localized date:', localized);
console.log('Number of days in current month:', date.numberOfDaysInThisMonth);

// check battery status
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

// check remaining charge percent
var remainingChargePercent = Windows.System.Power.PowerManager.remainingChargePercent;
console.log(remainingChargePercent + '% of battery is charged.');

// check remaning battery time
if (batteryStatus === batteryStatusEnum.discharging) {
	var remainingDischargeTime = Windows.System.Power.PowerManager.remainingDischargeTime;
	var remainingMinutes = parseInt(remainingDischargeTime / 60000);
	console.log(remainingMinutes + ' minutes of battery time left.');
} else {
	console.log('Battery is not discharging. No meaning to calculate battery time.');
}

// mouse presence
var mouseCapabilities = new Windows.Devices.Input.MouseCapabilities();
if (!mouseCapabilities.mousePresent) {
	console.log('Mouse is present');
} else {
	console.log('Mouse is not present');
}

// keyboard presence
var keyboardCapabilities = new Windows.Devices.Input.KeyboardCapabilities();
if (!mouseCapabilities.keyboardPresent) {
	console.log('Keyboard is present');
} else {
	console.log('Keyboard is not present');
}

// file operations
var sampleFileName = 'sample.png',
	picturesLibrary = Windows.Storage.KnownFolders.picturesLibrary,
	replaceExisting = Windows.Storage.CreationCollisionOption.replaceExisting;

(function createFileInPicturesFolder() {
	picturesLibrary.createFileAsync(sampleFileName, replaceExisting).done(function (file) {
	    console.log('File \'sample.png\' created in pictures folder');
	    getFileFromPicturesFolder();
	}, function (error) {
	    console.log('Creating file failed:', error);
	});
})()

function getFileFromPicturesFolder() {
	console.log('Reading file that we just created...');
	picturesLibrary.tryGetItemAsync(sampleFileName).done(function (file) {
	    if (file !== null) {
	        console.log('File name: ' + file.name);
	    } else {
	        console.log('Could not read file');
	    }

	    // close uwp
	    uwp.close();
	});
}