define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** btnScanOnClick defined for fedexSTATScanInterfacePanel **/
    AS_UWI_cbee4daa83a04158a8b4f6c98e082977: function AS_UWI_cbee4daa83a04158a8b4f6c98e082977(eventobject) {
        var self = this;
        return self.fedexSTATScanInterfacePanel_btnScanOnClick.call(this);
    },
    /** onScanActivated defined for fedexScanSyncControlPanel **/
    AS_UWI_a7423a5cbe3e49abaf9dd56e5c4e2ee4: function AS_UWI_a7423a5cbe3e49abaf9dd56e5c4e2ee4() {
        var self = this;
        this.view.fedexSTATScanInterfacePanel.isScanEnabled = true;
    },
    /** onScanDeactivated defined for fedexScanSyncControlPanel **/
    AS_UWI_c9a099f5d3f04d4e9af012977259e86a: function AS_UWI_c9a099f5d3f04d4e9af012977259e86a() {
        var self = this;
        this.view.fedexSTATScanInterfacePanel.isScanEnabled = false;
    },
    /** preShow defined for frmHome **/
    AS_Form_f8c296e88ef14e1f88c95898fd200251: function AS_Form_f8c296e88ef14e1f88c95898fd200251(eventobject) {
        var self = this;
        return self.frmHome_preShow.call(this);
    },
    /** postShow defined for frmHome **/
    AS_Form_ee4d39eeec05425e92b437e3abf5b035: function AS_Form_ee4d39eeec05425e92b437e3abf5b035(eventobject) {
        var self = this;
        return self.frmHome_postShow.call(this);
    },
    /** onDeviceBack defined for frmHome **/
    AS_Form_ebcc0d0689ed4b219612e10d060dbc82: function AS_Form_ebcc0d0689ed4b219612e10d060dbc82(eventobject) {
        var self = this;
        return gracefulExit.call(this);
    },
    /** onBreakpointChange defined for frmHome **/
    AS_Form_c3c1ed2418f044dfa2f38c51a789f029: function AS_Form_c3c1ed2418f044dfa2f38c51a789f029(eventobject, breakpoint) {
        var self = this;
        return self.frmHome_onBreakpointChange.call(this);
    },
    /** onScanReceived defined for fedexScanSyncControlPanel **/
    AS_UWI_ga6be77763294fecbf5dc8ea0c21b6f8: function AS_UWI_ga6be77763294fecbf5dc8ea0c21b6f8() {
        var self = this;
    }
});