var base=require('../com.browntape.library/BaseLib')
var logreport = require('../com.browntape.library/LogReport');
var gen=require('../com.browntape.library/GenericLib');
var propertiesReader=require('properties-reader');
var channellisting=require('../com.browntape.po/ChannelListingPO');
var loginBrownTape=require('../com.browntape.po/BrowntapeLoginPO');
var listWatch=require('../com.browntape.po/ListingWatchPO');
var stockComparing=require('../com.browntape.po/CompareStockPO');
var comparingZeroProducts=require('../com.browntape.po/ZeroProductPO');
var comparingNonZeroProducts=require('../com.browntape.po/NonZeroProductPO');
var chai=require('chai');
var expect = require('chai').expect;
var fs = require('fs');
var module = "INVENTORY MODULE";
var log=logreport.logger("LogReport");
var properties=propertiesReader('properties file/config.properties');
var list = null;
var generic= null;
var loginBT = null;
var watch=null;
var compare=null;
var outOfStock=null;
var inStock=null;
var baselib =null;
var passedcount=0,failedcount=0;
var IN_TC_LISTING_WATCH=null,IN_DESC_LISTING_WATCH=null,IN_STATUS_LISTING_WATCH=null;
var IN_TC_CHANNEL_LISTING=null,IN_DESC_CHANNEL_LISTING=null,IN_STATUS_CHANNEL_LISTING=null;
var IN_TC_COMPARING_STOCK=null,IN_DESC_COMPARING_STOCK=null,IN_STATUS_COMPARING_STOCK=null;
var IN_TC_ZERO_PRODUCT=null,IN_DESC_ZERO_PRODUCT=null,IN_STATUS_ZERO_PRODUCT=null;
var IN_TC_NONZERO_PRODUCT=null,IN_DESC_NONZERO_PRODUCT=null,IN_STATUS_NONZERO_PRODUCT=null;

log.info('********* INVENTORY MODULE ***************');
log.info('');
describe("INVENTORY MODULE",function ()
{
    baselib=new base();
    generic=new gen();
    loginBT=new loginBrownTape();
    var bt=generic.excelReadData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID1'));

    it(generic.excelReadData('Test Scenario.xlsx','Inventory','INVENTORY_TC_01')[1], function ()
    {
        watch=new listWatch();
        log.info('********* Start of Listing Watch ***************');
        try
        {
            browser.windowHandleMaximize();
            log.info('Window Maximizing Done');
            baselib.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');
            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');
            var sd=generic.excelReadData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID2'));
            log.info('Reading SnapDeal USERNAME and PASSWORD From Excel Done');
            var listchannel=watch.listSnapdeal(properties.get('SDURL'),sd[1],sd[2]);
            expect(listchannel[0]).to.equal(listchannel[1]);
            log.info('Reading URL From Properties File Done');
            log.info("Total listing under BT and channel is same ");
            log.info('********* End of ChannelListingPO Watch  *************');
            IN_TC_LISTING_WATCH="INVENTORY_TC_01";
            IN_DESC_LISTING_WATCH=generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_LISTING_WATCH)[1];
            IN_STATUS_LISTING_WATCH="Pass";
            passedcount++;
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e);
            log.info('********* End of Listing Watch  *************');
            IN_TC_LISTING_WATCH="INVENTORY_TC_01";
            IN_DESC_LISTING_WATCH=generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_LISTING_WATCH)[1];
            IN_STATUS_LISTING_WATCH="Fail";
            failedcount++;
            throw  e;
        }
    })

    it(generic.excelReadData('Test Scenario.xlsx','Inventory','INVENTORY_TC_02')[1], function ()
    {
        log.info('*********  Start of Channel Listing  ***************');
        list = new channellisting();
        try
        {
            baselib.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');
            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');
            var channel=list.channellist();
            expect(channel[0]).to.equal(channel[1]);
            log.info('Channel listings shown on the Inventory List Page and the Product Details Page are same');
            log.info('********* End of Channel ChannelListingPO   ***************');
            IN_TC_CHANNEL_LISTING="INVENTORY_TC_02";
            IN_DESC_CHANNEL_LISTING=generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_CHANNEL_LISTING)[1];
            IN_STATUS_CHANNEL_LISTING="Pass";
            passedcount++;
        }
        catch(e)
        {
            log.info('this Test Case got Failed :'+e)
            IN_TC_CHANNEL_LISTING="INVENTORY_TC_02";
            IN_DESC_CHANNEL_LISTING=generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_CHANNEL_LISTING)[1];
            IN_STATUS_CHANNEL_LISTING="Fail";
            failedcount++;
            log.info('********* End of Channel Listing   ***************');
            throw  e;
        }
    })

    it(generic.excelReadData('Test Scenario.xlsx','Inventory','INVENTORY_TC_03')[1], function ()
    {
        log.info('********* Start of Compare Stock  ***************');
        compare=new stockComparing();
        try
        {
            baselib.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');
            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');
            var stocks=compare.compareQuantity();
            expect(stocks).to.equal("Pass");
            log.info('The condition "QtyOnChannel <= DedicatedStock) == TRUE" is satisfied');
            log.info('********* End of CompareStockPO Stock ***************');
            IN_TC_COMPARING_STOCK="INVENTORY_TC_03";
            IN_DESC_COMPARING_STOCK= generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_COMPARING_STOCK)[1];
            IN_STATUS_COMPARING_STOCK="Pass";
            passedcount++;
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e)
            log.info('********* End of Compare Stock ***************');
            IN_TC_COMPARING_STOCK="INVENTORY_TC_03";
            IN_DESC_COMPARING_STOCK= generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_COMPARING_STOCK)[1];
            IN_STATUS_COMPARING_STOCK="Fail"
            failedcount++;
            throw  e;
        }
    })

    it(generic.excelReadData('Test Scenario.xlsx','Inventory','INVENTORY_TC_04')[1], function ()
    {
        log.info('********* Start of compare out of stock Products  ***************');
        outOfStock=new comparingZeroProducts();
         try
         {
             baselib.loadURL(properties.get('BTURL'));
             expect(browser.getUrl()).to.equal(properties.get('BTURL'));
             log.info('Reading URL From Properties File Done');
             log.info('url loading done');
             log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
             loginBT.brownTapeLogin(bt[1],bt[2]);
             log.info('Logged into BrownTape Done');
             var pt=generic.excelReadData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID3'));
             log.info('Reading Paytm USERNAME and PASSWORD From Excel Done');
             var zeroProducts=outOfStock.stockPaytm(properties.get('PTURL'),pt[1],pt[2]);
             expect(zeroProducts[0]).to.equal(zeroProducts[1]);
             log.info('Reading URL From Properties File Done');
             log.info("Stock of choosen zero quantity getEleProductLnk is same in Paytm seller and BT");
             log.info('********* End of CompareStockPO out of getEleStockTxt Products  *************');
             IN_TC_ZERO_PRODUCT= "INVENTORY_TC_04";
             IN_DESC_ZERO_PRODUCT = generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_ZERO_PRODUCT)[1];
             IN_STATUS_ZERO_PRODUCT = "Pass";
             passedcount++;
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e);
            log.info('********* End of compare out of stock Products  *************');
            IN_TC_ZERO_PRODUCT= "INVENTORY_TC_04";
            IN_DESC_ZERO_PRODUCT = generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_ZERO_PRODUCT)[1];
            IN_STATUS_ZERO_PRODUCT = "Fail";
            failedcount++;
            throw  e;
        }
     })

    it(generic.excelReadData('Test Scenario.xlsx','Inventory','INVENTORY_TC_05')[1], function ()
    {
        log.info('********* Start of compare Non-Zero Products and stocks ***************');
        inStock=new comparingNonZeroProducts();
        try
        {
            baselib.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');
            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');
            var pt=generic.excelReadData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID3'));
            log.info('Reading Paytm USERNAME and PASSWORD From Excel Done');
            var nonZero=inStock.stockPaytm(properties.get('PTURL'),pt[1],pt[2]);
            expect(nonZero[0]).to.equal(nonZero[1]);
            log.info('Reading URL From Properties File Done');
            log.info("Stock of choosen non-zero quantity getEleProductLnk is same in Paytm seller and BT");
            log.info('********* End of Compare Non-Zero Products and stocks  *************');
            IN_TC_NONZERO_PRODUCT = "INVENTORY_TC_05";
            IN_DESC_NONZERO_PRODUCT = generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_NONZERO_PRODUCT)[1];
            IN_STATUS_NONZERO_PRODUCT = "Pass";
            var myOptions = {
                IN_TC_LISTING_WATCH:IN_TC_LISTING_WATCH,
                IN_DESC_LISTING_WATCH:IN_DESC_LISTING_WATCH,
                IN_STATUS_LISTING_WATCH:IN_STATUS_LISTING_WATCH,

                IN_TC_CHANNEL_LISTING:IN_TC_CHANNEL_LISTING,
                IN_DESC_CHANNEL_LISTING : IN_DESC_CHANNEL_LISTING,
                IN_STATUS_CHANNEL_LISTING : IN_STATUS_CHANNEL_LISTING,

                IN_TC_COMPARING_STOCK :IN_TC_COMPARING_STOCK,
                IN_DESC_COMPARING_STOCK :IN_DESC_COMPARING_STOCK,
                IN_STATUS_COMPARING_STOCK : IN_STATUS_COMPARING_STOCK,

                IN_TC_ZERO_PRODUCT: IN_TC_ZERO_PRODUCT,
                IN_DESC_ZERO_PRODUCT: IN_DESC_ZERO_PRODUCT,
                IN_STATUS_ZERO_PRODUCT: IN_STATUS_ZERO_PRODUCT,

                IN_TC_NONZERO_PRODUCT: IN_TC_NONZERO_PRODUCT,
                IN_DESC_NONZERO_PRODUCT: IN_DESC_NONZERO_PRODUCT,
                IN_STATUS_NONZERO_PRODUCT: IN_STATUS_NONZERO_PRODUCT
            }
            var data = JSON.stringify(myOptions);
            fs.writeFile('json/Inventory_Report.json', data, function (err)
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
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e);
            log.info('********* End of Compare Non-Zero Products and stocks  *************');
            IN_TC_NONZERO_PRODUCT = "INVENTORY_TC_05";
            IN_DESC_NONZERO_PRODUCT = generic.excelReadData('Test Scenario.xlsx', 'Inventory', IN_TC_NONZERO_PRODUCT)[1];
            IN_STATUS_NONZERO_PRODUCT = "Fail";
            var myOptions = {
                IN_TC_LISTING_WATCH:IN_TC_LISTING_WATCH,
                IN_DESC_LISTING_WATCH:IN_DESC_LISTING_WATCH,
                IN_STATUS_LISTING_WATCH:IN_STATUS_LISTING_WATCH,

                IN_TC_CHANNEL_LISTING:IN_TC_CHANNEL_LISTING,
                IN_DESC_CHANNEL_LISTING : IN_DESC_CHANNEL_LISTING,
                IN_STATUS_CHANNEL_LISTING : IN_STATUS_CHANNEL_LISTING,

                IN_TC_COMPARING_STOCK :IN_TC_COMPARING_STOCK,
                IN_DESC_COMPARING_STOCK :IN_DESC_COMPARING_STOCK,
                IN_STATUS_COMPARING_STOCK : IN_STATUS_COMPARING_STOCK,

                IN_TC_ZERO_PRODUCT: IN_TC_ZERO_PRODUCT,
                IN_DESC_ZERO_PRODUCT: IN_DESC_ZERO_PRODUCT,
                IN_STATUS_ZERO_PRODUCT: IN_STATUS_ZERO_PRODUCT,

                IN_TC_NONZERO_PRODUCT: IN_TC_NONZERO_PRODUCT,
                IN_DESC_NONZERO_PRODUCT: IN_DESC_NONZERO_PRODUCT,
                IN_STATUS_NONZERO_PRODUCT: IN_STATUS_NONZERO_PRODUCT
            }
            var data = JSON.stringify(myOptions);
            fs.writeFile('json/Inventory_Report.json', data, function (err)
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

