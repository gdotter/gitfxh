define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) 
    {
		},
    
    _selectedItemKey: "",
    _selectedItemValue: "",
    
		//Logic for getters/setters of custom properties
		initGettersSetters: function() 
    {
      defineGetter(this, 'selectedExceptionCode', function() {
        return this._selectedItemValue;  
      });
    },
    
    /**
     @_lbExceptionCode_onSelection(collection)
     * Purpose: Event handler for onSelection event of ListBox
     * Input:   Collection of selected items (Array)
     *          Each selected item is a JSON array, e.g. ["key1", "value1"]
     *
     * Method should not need to be modified by default.
     */
    _lbExceptionCode_onSelection: function(itemSelected)
    {
      var lbrecord = itemSelected.selectedKeyValues;
      this._selectedItemKey = lbrecord[0][0];
      this._selectedItemValue = lbrecord[0][1];
      
      this.view.lblSelected.text = lbrecord[0][1];
      this.view.forceLayout();
    }
	};
});