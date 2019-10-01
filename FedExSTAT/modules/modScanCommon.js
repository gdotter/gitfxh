var scannerEnabled = false;
var processingScan = false;

function gracefulExit() 
{
  kony.print("Exiting application...");

  //#ifdef EBSDK
  EB.Application.quit();
  //#endif
}

function toggleScanner(scanCallback, isMultiScan) 
{
  kony.print("toggleScanner() start");
  kony.print("Scanner currently enabled: " + scannerEnabled);

  if (scannerEnabled === false)
  {
    enableScanner(scanCallback, isMultiScan);
  } 
  else 
  {
    disableScanner();
  }

  kony.print("toggleScanner() end");
}

function enableScanner(scanCallback, isMultiScan) 
{
  kony.print("enableScanner() start");
  kony.print("Scanner enabled: " + scannerEnabled);

  //#ifdef EBSDK
  kony.print("EB SDK is included, enabling scanner.");
  
  var scanOptions = {};
  
  if (isMultiScan === true)
  {
    // scanTimeout of 0 indicates infinite timeout
    scanOptions = {allDecoders: true,
                   scanTimeout: 0,
                   aimType: EB.Barcode.AIMTYPE_CONTINUOUS_READ};
  }
  else
  {
    scanOptions = {allDecoders:true};
  }
  
  EB.Barcode.disable();
  
  EB.Barcode.enable(scanOptions, scanCallback); 

  EB.Barcode.start();  
  //#else
  kony.print("EB SDK is not included, will simulate scan.");
  //#endif

  scannerEnabled = true;
    
  kony.print("Scanner enabled: " + scannerEnabled);
  kony.print("enableScanner() end");
}

function disableScanner() 
{
  kony.print("disableScanner() start");

  //#ifdef EBSDK
  EB.Barcode.disable();
  //#endif

  scannerEnabled = false;

  kony.print("Scanner enabled: " + scannerEnabled);
  kony.print("disableScanner() end");
}

function enumerateScanner(scanEnumWidget) 
{
  kony.print("enumerateScanner() start");

  var done = false;
  var scannerArray = [];

  //#ifdef EBSDK
  scannerArray = EB.Barcode.enumerate();
  //#else
  scannerArray = [CONSTMSG.NOEBSDK];  
  //#endif

  scanEnumWidget.text = "";

  if (scannerArray.length === 0) 
  {
    scanEnumWidget.placeholder = "No Scanners Found";
  }

  if (done === false) 
  {
    for (var count = 0; count < scannerArray.length; count++) 
    {
      //#ifdef EBSDK
      scanEnumWidget.text += scannerArray[count].friendlyName;
      
      if (count <= (scannerArray.length - 2)) 
      {
        scanEnumWidget.text += "\r\n";
      }
      //#else
      scanEnumWidget.text = scannerArray[count];
	    //#endif
    }
  }

  done = true;

  kony.print(logWidget, "enumerateScanner() end");
}