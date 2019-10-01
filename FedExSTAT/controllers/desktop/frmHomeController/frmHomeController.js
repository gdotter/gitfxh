define({ 

  //Type your controller code here 
  frmHome_preShow: function()
  {
    this.view.fedexScanSyncControlPanel.logWidget = this.view.fedexLogPanel;
    
    this.view.fedexLogPanel.addToLog("preShowEvent() start");
    
    // reset form
    this.resetScanForm();
    
    this.view.fedexLogPanel.addToLog("Prototype version: " + CURRVERSION);
    this.view.fedexLogPanel.addToLog(JSON.stringify(kony.os.deviceInfo()) + "\r\n");
    
    this.view.fedexHeader.version = "v" + CURRVERSION;
    
    this.view.fedexLogPanel.addToLog("preShowEvent() end");
    
    this.view.fedexScanSyncControlPanel.onScanReceived = this.fedexScanSyncControlPanel_onScanReceived;
  },
  
  frmHome_postShow: function()
  {
    this.view.fedexLogPanel.addToLog("postShowEvent() start");
    
    // set up sync
    setupSync(this.view.fedexLogPanel);
    
    this.view.fedexLogPanel.addToLog("postShowEvent() end");
  },
  
  frmHome_onBreakpointChange: function()
  {
    this.view.fedexLogPanel.addToLog("onBreakpointChange() start");
    
    this.view.fedexHeader.version = "v" + CURRVERSION;
    
    this.view.fedexLogPanel.addToLog("onBreakpointChange() end");
  },
  
  resetScanForm: function()
  {
    this.view.fedexScanSyncStatusPanel.resetStatusPanel();
    
    this.view.fedexScanSyncControlPanel.resetControlPanel();
  },
  
  fedexScanSyncControlPanel_onScanReceived: function(scanData)
  {
    if (scanData.data === "" || scanData.time === "") 
    {
      this.view.fedexScanSyncStatusPanel.awbNumberValue = "Scan not received";
      this.view.fedexScanSyncStatusPanel.scanResultValue = "NOT RECEIVED";
    }
    else
    {
      this.view.fedexScanSyncStatusPanel.awbNumberValue = scanData.data;
      this.view.fedexScanSyncStatusPanel.scanResultValue = "SUCCESS";

      saveScanDataLocal(this, this.view.fedexLogPanel, scanData);
    }
  },
  
  fedexSTATScanInterfacePanel_btnScanOnClick: function() 
  {
    this.view.fedexLogPanel.addToLog("fedexSTATScanInterfacePanel_btnScanOnClick() start");

    this.view.fedexScanSyncStatusPanel.awbNumberValue = "Scan now";

    // Comment out next two lines if disabling EB SDK
    this.view.fedexLogPanel.addToLog("EB SDK enabled, using...");
    EB.Barcode.start();

    /*
    // Originally removed via conditional compilation constant
    // but didn't seem to work within the context of a form controller.
    // Commenting for reference.  Uncomment when disabling SDK
    // as other tags seem to be OK
    this.view.fedexLogPanel.addToLog("EB SDK not enabled, using fake data...");
    var fakeScanData = {};
    fakeScanData.data = FEDEXVARS.DEFAULTWAYBILL;
    fakeScanData.time = getTime24NowRawText();

    saveScanDataLocal(this, this.view.fedexLogPanel, fakeScanData);
    */

    this.view.fedexLogPanel.addToLog("fedexSTATScanInterfacePanel_btnScanOnClick() end");
  }

 });