function logData(logObject, logString) 
{
  if (logObject !== undefined && logObject !== null)
  {
    logObject.text = logString + "\r\n" + logObject.text;
  }
}

/* Network Check */
function isNetworkAvailable(logWidget)
{
  logWidget.addToLog("isNetworkAvailable() start");
  
  var networkIsAvailable = false;
  
  networkIsAvailable = kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
  
  logWidget.addToLog("Network available: " + networkIsAvailable);
  
  logWidget.addToLog("isNetworkAvailable() end");
  
  return networkIsAvailable;
}

/* Alert / Loading Screen Functions */
function showLoadingScreen(message) 
{
  //message = " " + message + " \n";
  //kony.print(message);
  message = " " + message + " ";

  kony.application.showLoadingScreen("sknBlockedUI", message, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
}

function dismissLoadingScreen() 
{
  kony.application.dismissLoadingScreen();
}

function showAlertWithHandler(alertMsg, handlerFunc) 
{
    kony.ui.Alert({
        message: alertMsg,
        alertType: constants.ALERT_TYPE_INFO,
        alertTitle: gblAlertTitle,
        yesLabel: "Ok",
        noLabel: "Cancel",
        alertHandler: handlerFunc
    }, {});
}

/* Toast Functions */
function showToast(toastMsg)
{
  //#ifdef iphone
  kony.ui.Alert(
	               {
                     message:toastMsg,
                     alertType: constants.ALERT_TYPE_INFO,
                     alertTitle: gblAlertTitle,
                     yesLabel:"Ok",
                     noLabel: "Cancel",
	               	 alertHandler: toastAlertHandler
                   },{}
                );  
  //#endif
  //#ifdef android
  toast = new kony.ui.Toast({"text" : toastMsg, "duration" : constants.SHORT});
  toast.show();
  //#endif
}

function toastAlertHandler()
{
  // Stubbed for now
}

/* Date/Time Functions */

/*
	formatSelectedDate(calendarWidget)
    Input:  Calendar Widget reference
    Output:  Date string in format "YYYY-MM-DD"
*/
function formatSelectedDate(calwidget)
{
  var formattedDate = "";
  
  var selectedyear = calwidget.year;
  var selectedmon = calwidget.month;
  var selectedday = calwidget.day;
  
  if (selectedmon < 10)
  {
    selectedmon = "0" + selectedmon;
  }

  if (selectedday < 10)
  {
    selectedday = "0" + selectedday;
  }
  
  formattedDate = selectedyear + "-" + selectedmon + "-" + selectedday;
  
  return formattedDate;
}

/*
	formatDateForDB(calendarWidget)
    Input:  Calendar Widget reference
    Output:  Date string in UTC format "YYYY-MM-DDT00:00:00Z"
*/
function formatDateForDB(calwidget)
{
  var formattedDate = "";
  
  var selectedyear = calwidget.year;
  var selectedmon = calwidget.month;
  var selectedday = calwidget.day;
  
  if (selectedmon < 10)
  {
    selectedmon = "0" + selectedmon;
  }

  if (selectedday < 10)
  {
    selectedday = "0" + selectedday;
  }
  
  formattedDate = selectedyear + "-" + selectedmon+ "-" + selectedday + "T00:00:00Z";
  
  return formattedDate;
}

/*
	formatDBDateForApp(dateFromDB)
    Input:  Date string in UTC format "YYYY-MM-DDT00:00:00Z"
    Output:  Date/time string in format "MM/DD/YYYY HH:MI:SS"
*/
function formatDBDateForApp(dbDate)
{
  // Incoming date has the format YYYY-MM-DDTHH:MM:SSZ
  // POC is not doing time zone conversion.
  var retDate = "";
  
  var datetoformat = dbDate.split("T");
  var datetoparse = datetoformat[0];
  var yr = datetoparse.substring(0, 4);
  var mo = datetoparse.substring(5, 7);
  var dy = datetoparse.substring(8);
  
  var timestr = datetoformat[1];
  var timetoparse = timestr.slice(0, (timestr.length - 1));  // drops the Z
  var timesplit = timetoparse.split(":");
  var hr = timesplit[0];
  var mi = timesplit[1];
  var sc = timesplit[2];
  
  retDate = mo + "/" + dy + "/" + yr + " " + hr + ":" + mi + ":" + sc;
  
  return retDate;
}

/*
	getDateTimeNow()
    Input:  Nothing
    Output:  Date/time string in format "YYYY-MM-DD HH:MI:SS"
*/
function getDateTimeNow() 
{
  var returnDate = "";

  var newDate = new Date();

  // Date component
  var newYear = newDate.getFullYear();
  var newMonth = newDate.getMonth();
  var newDay = newDate.getDate();

  if (newMonth < 10) 
  {
    newMonth = "0" + newMonth;
  }

  if (newDay < 10) 
  {
    newDay = "0" + newDay;
  }

  // Time component
  var newHour = newDate.getHours();
  if (newHour < 10)
  {
    newHour = "0" + newHour;
  }

  var newMinutes = newDate.getMinutes();
  if (newMinutes < 10)
  {
    newMinutes = "0" + newMinutes;
  }

  var newSeconds = newDate.getSeconds();
  if (newSeconds < 10)
  {
    newSeconds = "0" + newSeconds;
  }

  returnDate = newYear + "-" + newMonth + "-" + newDay + " " + newHour + ":" + newMinutes + ":" + newSeconds;
  
  return returnDate;
}

/*
	getDateRawText()
    Input:  Nothing
    Output:  Date/time string in format "YYYYMMDD"
*/
function getDateRawText() 
{
  var returnDate = "";

  var newDate = new Date();

  // Date component
  var newYear = newDate.getFullYear();
  var newMonth = newDate.getMonth();
  var newDay = newDate.getDate();

  if (newMonth < 10) 
  {
    newMonth = "0" + newMonth;
  }

  if (newDay < 10) 
  {
    newDay = "0" + newDay;
  }

  returnDate = newYear + "" + newMonth + "" + newDay;
  
  return returnDate;
}

/*
	getTime24NowRawText()
    Input:  Nothing
    Output:  Time string in 24hr format "HHMI"
*/
function getTime24NowRawText() 
{
  var returnDate = "";

  var newDate = new Date();

  // Time component
  var newHour = newDate.getHours();
  if (newHour < 10)
  {
    newHour = "0" + newHour;
  }

  var newMinutes = newDate.getMinutes();
  if (newMinutes < 10)
  {
    newMinutes = "0" + newMinutes;
  }

  var newSeconds = newDate.getSeconds();
  if (newSeconds < 10)
  {
    newSeconds = "0" + newSeconds;
  }

  returnDate = newHour + "" + newMinutes;
  
  return returnDate;
}

/*
	getDateTimeNowISO8601()
    Input:  Nothing
    Output:  Date string in UTC format "YYYY-MM-DDT00:00:00Z"
*/
function getDateTimeNowISO8601() 
{
  var returnDate = "";

  var newDate = new Date();

  // Date component
  var newYear = newDate.getFullYear();
  var newMonth = newDate.getMonth();
  var newDay = newDate.getDate();

  if (newMonth < 10) 
  {
    newMonth = "0" + newMonth;
  }

  if (newDay < 10) 
  {
    newDay = "0" + newDay;
  }

  // Time component
  var newHour = newDate.getHours();
  if (newHour < 10)
  {
    newHour = "0" + newHour;
  }

  var newMinutes = newDate.getMinutes();
  if (newMinutes < 10)
  {
    newMinutes = "0" + newMinutes;
  }

  var newSeconds = newDate.getSeconds();
  if (newSeconds < 10)
  {
    newSeconds = "0" + newSeconds;
  }

  returnDate = newYear + "-" + newMonth + "-" + newDay + "T" + newHour + ":" + newMinutes + ":" + newSeconds + "Z";
  
  return returnDate;
}

function toConvertMiles(meterValue)
{
  var mileValue = "";
  
  mileValue = meterValue * MATHCONSTANTS.METERSTOMILES;
  mileValue = mileValue.toFixed(1);
  
  if (mileValue === 0.0)
  {
    mileValue = meterValue * MATHCONSTANTS.METERSTOFEET;
    mileValue = mileValue.toFixed(0) + " Feet";
  }
  else
  {
    mileValue = mileValue + " Miles";
  }
  
  return mileValue;
}

function toConvertMins(secValue)
{
  var minValue = "";
  
  minValue = secValue / MATHCONSTANTS.SECSTOMIN;
  minValue = minValue.toFixed(0);

  if (minValue === 0)
  {
    minValue = secValue + " Seconds";
  }
  else
  {
    minValue = minValue + " Minutes";
  }
  
  return minValue;  
}