define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) 
    {
    },

    //_defaultHeight: "",
    //_newHeight,
    _logger: null,
    _showPanel: true,
    _defaultShowScan: true,
    _defaultShowSync: true,
    _timerStarted: false,
    _timerSyncStarted: false,

    //Events to be assigned by developer
    onScanActivated: function() {},
    onScanReceived: function(scanData) {},
    onScanDeactivated: function() {},
    onSyncActivated: function() {},
    onSyncDeactivated: function() {},
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() 
    {
      defineGetter(this,'isTimerStarted',function(){
				return this._timerStarted;
      });
      defineGetter(this,'logWidget',function(){
				return this._logger;
      });
      defineSetter(this,'logWidget',function(val){
        this._logger = val;
      });
    },

    // Private methods
    
    /**
      @_preShow
      Purpose:  Component preShow event handler function.
    */
    _preShow: function()
    {
      // Need to set permanent visibility based upon design-time configuration of properties.
      this._defaultShowScan = this.view.flxScanner.isVisible;
      this._defaultShowSync = this.view.flxSync.isVisible;
      this._showPanel = true;
    },
    
    _btnActivateScan_onClick: function()
    {
      toggleScanner(this.onScanReceived, false);

      if (scannerEnabled === true)
      {
        this.view.lblScanPowerStatus.text = SCANSTATUS.SCANON;
        this.view.btnActivateScan.skin = "btnred90";
        this.view.btnActivateScan.text = "SCAN OFF";
        
        this.onScanActivated();
      }
      else
      {
        this.view.lblScanPowerStatus.text = SCANSTATUS.SCANOFF;
        this.view.btnActivateScan.skin = "btngreen90";
        this.view.btnActivateScan.text = "SCAN ON";
        
        this.onScanDeactivated();
      }
    },

    _btnActivateSync_onClick: function()
    { 
      if (this._timerStarted === false)
      {
        this.startSyncTimer();
        
        this.view.lblSyncPowerStatus.text = SYNCSTATUS.SYNCON;
        this.view.btnActivateSync.skin = "btnred90";
        this.view.btnActivateSync.text = "SYNC OFF";
        
        this.onSyncActivated();
      }
      else if (this._timerStarted === true)
      {
        this.stopSyncTimer();
        
        this.view.lblSyncPowerStatus.text = SYNCSTATUS.SYNCOFF;
        this.view.btnActivateSync.skin = "btngreen90";
        this.view.btnActivateSync.text = "SYNC ON";
        
        this.onSyncDeactivated();
      }
    },

    _togglePanel: function()
    {
      if (this._defaultHeight === "")
      {
        this._defaultHeight = this.view.height;
      }
      
      if (this._showPanel === false)
      {
        if (this._defaultShowScan === true)
        {
          this.view.flxScanner.isVisible = true;
        }

        if (this._defaultShowSync === true)
        {
          this.view.flxSync.isVisible = true;
        }
        
        this.view.lblShowHideBtn.text = 'HIDE';
        this._showPanel = true;
      } 
      else 
      {
        if (this._defaultShowScan === true)
        {
          this.view.flxScanner.isVisible = false;
        }

        if (this._defaultShowSync === true)
        {
          this.view.flxSync.isVisible = false;
        }

        this.view.lblShowHideBtn.text = 'SHOW';
        this._showPanel = false;
      }
      
      this.view.forceLayout();
    },
    
    startSyncTimer: function()
    {
      this._logger.addToLog("startSyncTimer() start");

      // Interval in seconds
      var timerDuration = TIMER.DURATION.SEC5;

      if (this._timerStarted === false)
      {
        kony.timer.schedule(TIMER.NAME, this.syncOnTimer, timerDuration, true);

        this._timerStarted = true;

        this._logger.addToLog("Sync timer started; will run every " + timerDuration + " seconds.");
      }
      else
      {
        this._logger.addToLog("Timer already started.");
      }

      this._logger.addToLog("startSyncTimer() end");
    },

    stopSyncTimer: function()
    {
      this._logger.addToLog("stopSyncTimer() start");

      this._logger.addToLog("Stopping Sync timer...");

      if (this._timerStarted === true)
      {
        kony.timer.cancel(TIMER.NAME);

        this._timerStarted = false;
        this._timerSyncStarted = false;
      }

      this._logger.addToLog("Sync timer stopped.");

      this._logger.addToLog("stopSyncTimer() end");
    },

    syncOnTimer: function()
    {
      this._logger.addToLog("syncOnTimer() start");

      if (this._timerSyncStarted === false)
      {
        this._timerSyncStarted = true;

        syncScanData(this._logger);

        this._timerSyncStarted = false;
      }
      else
      {
        this._logger.addToLog("Sync already running.");
      }
      
      this._logger.addToLog("syncOnTimer() end");
    },

    resetControlPanel: function()
    {
      this._logger.addToLog("resetControlPanel() start");
      
      if (this._timerStarted === true)
      {
        this.stopSyncTimer();
      }
      
      this._logger.addToLog("resetControlPanel() end");
    }

  };
});