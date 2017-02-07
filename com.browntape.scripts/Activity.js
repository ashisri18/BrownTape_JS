var base=require('../com.browntape.library/BaseLib')
var logreport = require('../com.browntape.library/LogReport');
var propertiesReader=require('properties-reader');
var gen=require('../com.browntape.library/GenericLib');
var loginBrownTape=require('../com.browntape.po/BrowntapeLoginPO');
var activityLog=require('../com.browntape.po/ActivitiesLogPO');
var chai=require('chai');
var expect = require('chai').expect;
var fs = require('fs');
var module = "ACTIVITY MODULE";
var log=logreport.logger("LogReport");
var properties=propertiesReader('properties file/config.properties');
var generic= null;
var loginBT = null;
var activity = null;
var baselib =null;
var passedcount=0,failedcount=0;
var AC_TC_ERROR_ACTIVITY=null,AC_DESC_ERROR_ACTIVITY=null,AC_STATUS_ERROR_ACTIVITY=null;

log.info('*********  ACTIVITY MODULE ***************');
log.info('');
describe("ACTIVITY MODULE",function ()
{
    generic=new gen();
    baselib=new base();
    loginBT=new loginBrownTape();
    var bt=generic.excelReadData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID1'));

    it(generic.excelReadData('Test Scenario.xlsx','Activity','ACTIVITY_TC_01')[1], function () {
        activity = new activityLog();
        try
        {
            log.info('********* Start of Error Activity  ***************');
            browser.windowHandleMaximize();
            log.info("WINDOW MAXIMIZING DONE");
            baselib.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');
            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1], bt[2]);
            log.info('Logged into BrownTape Done');
            var timeAndReason=activity.reasonsAndTimeOfFailure();
            log.info('Timestamps');
            log.info(timeAndReason[0]);
            log.info('Status Message');
            log.info(timeAndReason[1]);
            log.info(' Cause and time of the failure for the choosen getEleProductLnk is displayed on "Activites" page');
            log.info('********* End of Error Activity   ***************');
            AC_TC_ERROR_ACTIVITY = "ACTIVITY_TC_01";
            AC_DESC_ERROR_ACTIVITY = generic.excelReadData('Test Scenario.xlsx', 'Activity', AC_TC_ERROR_ACTIVITY)[1];
            AC_STATUS_ERROR_ACTIVITY = "Pass";
            var myOptions = {
                AC_TC_ERROR_ACTIVITY: AC_TC_ERROR_ACTIVITY,
                AC_DESC_ERROR_ACTIVITY: AC_DESC_ERROR_ACTIVITY,
                AC_STATUS_ERROR_ACTIVITY: AC_STATUS_ERROR_ACTIVITY
            }
            var data = JSON.stringify(myOptions);
            console.log("data");
            fs.writeFile('json/Activity_Report.json', data, function (err)
                                                            {
                                                                if (err)
                                                                {
                                                                    console.log('There has been an error saving your configuration data.');
                                                                    console.log(err.message);
                                                                    return;
                                                                }
                                                            })

                passedcount++;
                generic.resultCounts(module, passedcount, failedcount);
        }
        catch (e)
        {
            log.info('this Test Case got Failed :' + e);
            AC_TC_ERROR_ACTIVITY = "ACTIVITY_TC_01";
            AC_DESC_ERROR_ACTIVITY = generic.excelReadData('Test Scenario.xlsx', 'Activity', AC_TC_ERROR_ACTIVITY)[1];
            AC_STATUS_ERROR_ACTIVITY = "Fail";
            log.info('********* End of Error Activity   ***************');
            var myOptions = {
                AC_TC_ERROR_ACTIVITY: AC_TC_ERROR_ACTIVITY,
                AC_DESC_ERROR_ACTIVITY: AC_DESC_ERROR_ACTIVITY,
                AC_STATUS_ERROR_ACTIVITY: AC_STATUS_ERROR_ACTIVITY
            }
            var data = JSON.stringify(myOptions);
            console.log("data");
            fs.writeFile('json/Activity_Report.json', data, function (err)
                                                            {
                                                                if (err)
                                                                {
                                                                    console.log('There has been an error saving your configuration data.');
                                                                    console.log(err.message);
                                                                    return;
                                                                }
                                                            })
                failedcount++;
                generic.resultCounts(module, passedcount, failedcount);
                throw  e;
        }
    })
});

