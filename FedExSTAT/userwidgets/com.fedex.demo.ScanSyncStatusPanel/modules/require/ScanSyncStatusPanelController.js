define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
    
    /**
     * @function
     *
     */
    resetStatusPanel: function() {
      this.view.lblAWBNumberVal.text = FEDEXVARS.DEFAULTWAYBILL;
      this.view.lblScanResultVal.text = " - ";
      this.view.lblSyncResultVal.text = " - ";
    }
	};
});