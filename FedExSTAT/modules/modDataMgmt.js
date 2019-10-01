var setupSyncOptions = {};
var isSyncSetup = false;

function setupSync(logWidget) 
{
  var currLogger = logWidget;
  
  function onSetupSuccess() 
  {
    currLogger.addToLog("###################  Offline Objects setup succeeded.");

    // Declare object service instance
    if (!fedExSoapObjSvc) 
    {
      currLogger.addToLog("setupSync() - onSetupSuccess() instantiating object service...");
      
      fedExSoapObjSvc = new kony.sdk.KNYObjSvc(FEDEXSOAPOBJ.SERVICENAME);
      
      isSyncSetup = true;
    }

    currLogger.addToLog("Initialization complete.");
  }

  function onSetupFailed() 
  {
    currLogger.addToLog("###################  Offline Objects setup failed.");

    currLogger.addToLog("setupSync() - onSetupFailed()");
      
    alert("Initialization encountered a problem, please contact the administrator.");
  }

  //currLogger.addToLog("setupSync() start");
  
  currLogger.addToLog("setupSync() start");

  try 
  {
    kony.sdk.getDefaultInstance().OfflineObjects.setup(setupSyncOptions, onSetupSuccess, onSetupFailed);
  } 
  catch (setupEx) 
  {
    currLogger.addToLog("setupSync() encountered an exception: " + JSON.stringify(setupEx));
  }

  currLogger.addToLog("setupSync() end");
}

function saveScanDataLocal(currController, logWidget, scannedData) 
{
  var self = currController;
  var currLogger = logWidget;
  
  currLogger.addToLog("saveScanDataLocal() start");

  function saveDataLocalSuccess(saveResponse) 
  {
    currLogger.addToLog("saveScanDataLocal().saveDataLocalSuccess() start");
    currLogger.addToLog("saveScanDataLocal() raw save response: " + JSON.stringify(saveResponse));

    if (saveResponse !== null && saveResponse !== undefined && saveResponse !== {}) 
    {
      currLogger.addToLog("Record saved locally with new ID: " + saveResponse.beaconScanId);
    }

    // Wait to start syncing until first save occurs
    //startSyncTimer(currLogger);
  
    currLogger.addToLog("saveScanDataLocal().saveDataLocalSuccess() end");
  }

  function saveDataLocalFailure(saveError) 
  {
    currLogger.addToLog("saveScanDataLocal().saveDataLocalFailure() start");
    currLogger.addToLog("Barcode save failed: " + JSON.stringify(saveError));
    currLogger.addToLog("saveScanDataLocal().saveDataLocalFailure() end");
  }

  try 
  {
    // create object to hold new record data
    var newBarcodeRecord = {};

    // set record fields to save
    newBarcodeRecord.trackItemNumber = scannedData.data;
    
    newBarcodeRecord.testKey = FEDEXCREDS.TESTKEY;
    newBarcodeRecord.testPwd = FEDEXCREDS.TESTPWD;
    newBarcodeRecord.trackType = FEDEXTRACKTYPE.STAT;
    newBarcodeRecord.trackExceptionCode = self.view.fedexSTATScanInterfacePanel.selectedExceptionCode;
    newBarcodeRecord.airbillTypeCode = "1";
    newBarcodeRecord.deviceId = FEDEXVARS.DEVICEID;
    newBarcodeRecord.trackDate = getDateRawText();
    newBarcodeRecord.trackLocationCode = FEDEXVARS.TRACKLOCCODE;
    newBarcodeRecord.trackBeginFunctionTime = scannedData.time;
    newBarcodeRecord.trackEndFunctionTime = scannedData.time;
    newBarcodeRecord.employeeNumber = FEDEXVARS.EMPID;
    newBarcodeRecord.airbillTime = scannedData.time;
    newBarcodeRecord.comment = "Scan test from Zebra device."; //getDateTimeNowISO8601();

    currLogger.addToLog(JSON.stringify(newBarcodeRecord));

    // create instance of object
    objBarcode = new kony.sdk.KNYObj(FEDEXPROTODBMOD.BEACONSCAN);

    // save object data and trigger callbacks
    objBarcode.create(newBarcodeRecord, {}, saveDataLocalSuccess, saveDataLocalFailure);
  } 
  catch (saveEx)
  {
    currLogger.addToLog("saveScanDataLocal() encountered an exception: " + JSON.stringify(saveEx));
  }

  currLogger.addToLog("saveScanDataLocal() end");
}

function syncScanData(logWidget) 
{
  //var currLogger = logWidget;
  //var currSyncStatusWidget = syncStatusWidget;
  
  logWidget.addToLog("syncData() start");

  if (isSyncSetup === false)
  {
    setupSync(logWidget);
  }
  
  logWidget.addToLog("Checking network status...");

  if (isNetworkAvailable(logWidget) === true)
  {
    logWidget.addToLog("Network is available, sync will proceed.");
    
    uploadAllScanData(logWidget);
  }
  else
  {
    logWidget.addToLog("Network is not yet available, will wait to sync.");
  }
  
  logWidget.addToLog("syncData() end");
}

function uploadAllScanData(logWidget) 
{
  //var currLogger = logWidget;
  //var currSyncStatusWidget = syncStatusWidget;
  
  logWidget.addToLog("uploadAllScanData() start");

  //currLogger.addToLog("uploadAllScanData() start");

  function uploadSyncSuccess(syncResponse) 
  {
    logWidget.addToLog("Upload of data succeeded.");
    logWidget.addToLog("Full sync response: " + JSON.stringify(syncResponse));
    //syncStatusWidget.syncResultValue = "SUCCESS";
  }

  function uploadSyncProgress(syncProgress)
  {
	  // Stubbed out, does nothing
    //syncStatusWidget.syncResultValue = "IN PROGRESS";
  }
  
  function uploadSyncFailure(syncFailure) 
  {
    logWidget.addToLog("Upload of data failed: " + JSON.stringify(syncFailure));
    //syncStatusWidget.syncResultValue = "FAIL";
  }

  try 
  {
    // Declare object service instance
    if (!fedExSoapObjSvc) 
    {
      logWidget.addToLog("uploadAllScanData() instantiating object service...");
      
      fedExSoapObjSvc = new kony.sdk.KNYObjSvc(FEDEXSOAPOBJ.SERVICENAME);
    }

    logWidget.addToLog("uploadAllScanData() starting sync...");
    
    fedExSoapObjSvc.startSync({getSyncStats:"true", syncType:"uploadOnly"}, uploadSyncSuccess, uploadSyncFailure, uploadSyncProgress);
    //fedExSoapObjSvc.startSync({}, uploadSyncSuccess, uploadSyncFailure, uploadSyncProgress);
  } 
  catch (uploadEx) 
  {
    logWidget.addToLog("uploadAllScanData() encountered an exception: " + JSON.stringify(uploadEx));
    //syncStatusWidget.syncResultValue = "FAIL";
  }

  logWidget.addToLog("uploadAllScanData() end");

  logWidget.addToLog("uploadAllScanData() end");
}