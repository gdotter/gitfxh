function homeInit()
{
  frmHome.flxScanner.isVisible=false;
  frmHome.flxSync.isVisible=false;
  frmHome.flxSettings.height='55dp';
  frmHome.lblHideBtnSet.text='SHOW';
  frmHome.txaLog.isVisible=false;
  frmHome.flxLog.height='55dp';
  frmHome.lblHideBtnLog.text='SHOW';
}

function toggleShowSettings()
{
  if (frmHome.flxSettings.height==="55dp")
  {
    frmHome.flxScanner.isVisible=true;
    frmHome.flxSync.isVisible=true;
    frmHome.flxSettings.height='200dp';
    frmHome.lblHideBtnSet.text='HIDE';
  } else {
    frmHome.flxScanner.isVisible=false;
    frmHome.flxSync.isVisible=false;
    frmHome.flxSettings.height='55dp';
    frmHome.lblHideBtnSet.text='SHOW';
  }
}

function toggleShowLog()
{
  if (frmHome.flxLog.height==="55dp")
  {
    frmHome.txaLog.isVisible=true;
    frmHome.flxLog.height='300dp';
    frmHome.lblHideBtnLog.text='HIDE';
  } else {
    frmHome.txaLog.isVisible=false;
    frmHome.flxLog.height='55dp';
    frmHome.lblHideBtnLog.text='SHOW';
  }
}