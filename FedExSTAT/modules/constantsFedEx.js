/*

  To enable using the Zebra Enterprise Browser (EB) SDK:
  1.  Ensure that the ebapi_modules.js file is included in the project.
  2.  Uncomment the define statement below.  
  
  To disable the Zebra EB SDK:
  1.  Comment out the define statement.

  NOTE - the ebapi_modules.js file has been edited to include ifdef tags in the file itself, 
  elminating the need to add/delete the file physically.

*/

//#define EBSDK


var FEDEXTRACKTYPE = {
  STAT : "07"
};

var FEDEXCREDS = {
  TESTKEY : "tyEMzzkW9tgmKtUp",
  TESTPWD : "u5mH3YhoguMaje7By2hZneRlL"
};

var FEDEXVARS = {
  DEFAULTWAYBILL : "813363217863",
  DEVICEID : "SNKONYTEST",
  TRACKLOCCODE : "SINA",
  EMPID : "79069"
};
