var gblAlertTitle = "FedEx BEACON Component Demo";

var VERSION = {
    MAJOR: 1,
    MINOR: 0,
    FIXPACK: 0,
    BUILD: 7
};

var CURRVERSION = VERSION.MAJOR + "." + VERSION.MINOR + "." + VERSION.FIXPACK + "." + VERSION.BUILD;

var FORMS = {
    HOME: "frmHome"
};

var MATHCONSTANTS = {
    METERSTOMILES: 0.000621371,
    METERSTOFEET: 3.28084,
    SECSTOMIN: 60
};

var USERS = {
    FEDEXPROTO : gblAlertTitle + " " + CURRVERSION
};

var CONSTMSG = {
  NOEBSDK : "EB SDK not included"
};

var TIMER = {
  NAME : "syncTimer",
  DURATION : {
    SEC5  : 5,
    SEC10 : 10,
    SEC15 : 15,
    SEC30 : 30,
    SEC60 : 60
  }
};

var SCANSTATUS = {
  SCANON : "SCANNING",
  SCANOFF : "SCANNING OFF"
};

var SYNCSTATUS = {
  SYNCON : "SYNCING",
  SYNCOFF : "SYNCING OFF"
};
