define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) 
    {
    },
    
    //_defaultHeight: "",
    //_newHeight,
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() 
	  {
    },
    
    // Public methods
    addToLog: function(logData)
    {
      if ((typeof logData === "string") || (logData instanceof String))
      {
        this.view.txaLog.text = logData + "\r\n" + this.view.txaLog.text;
      }
      else
      {
        this.view.txaLog.text = JSON.stringify(logData) + "\r\n" + this.view.txaLog.text;
      }
    },
    
    clearLog: function()
    {
      this.view.txaLog.text = "";
    },
    
    // Private method
    _togglePanel: function()
    {
      if (this._defaultHeight === "")
      {
        this._defaultHeight = this.view.height;
      }
      
      if (this.view.txaLog.isVisible === false)
      {
        this.view.txaLog.isVisible = true;
				this.view.height = "300dp";
        this.view.lblShowHideBtn.text = 'HIDE';
      } 
      else 
      {
        this.view.txaLog.isVisible = false;
				this.view.height = "60dp";
        this.view.lblShowHideBtn.text = 'SHOW';
      }
      
      this.view.forceLayout();
    }
    
  };
});