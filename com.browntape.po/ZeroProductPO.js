var id=null;
var btStock=null;
var paytmStock=null;
var quantity=[];
var flag=false;
var activitiesLog =require('../com.browntape.po/ActivitiesLogPO');

class ZeroProductPO
{
    get getEleSellableQtyBtn()
    {
        return browser.element("//button[contains(text(),'Sellable Qty')]");
    }
    get getEleMinQtyBtn()
    {
        return browser.element("#minQty");
    }
    get getEleMaxQtyBtn()
    {
        return browser.element("#maxQty");
    }
    get getEleFilterBtn()
    {
        return browser.element("//button[@class='btn btn-primary btn-sm filter-btn']");
    }
    get getEleSelectProductLnk()
    {
        return browser.element("//a[contains(text(),'Dreambolic Always-Look-On-The-Bright-Side-Prints Wall Clock')]");
    }
    get getEleStockTxt()
    {
        return browser.element("//table[@class='table table-hover']/tbody/tr[3]/td[4]");
    }
    get getEleSkuIDTxt()
    {
        return browser.element("//span[text()='DBWC413-WallClock']");
    }
    get getElePaytmLoginLnk()
    {
        return browser.element("//div[@class='col s11']/p/strong/a[text()='Log In']");
    }
    get getElePaytmUserNameTxt()
    {
        return browser.element("#authentication_email");
    }
    get getElePaytmSignInBtn()
    {
        return browser.element("//button[@class='isReturning isTransitionToSecondary']");
    }
    get getElePaytmPasswordTxt()
    {
        return browser.element("#authentication_password");
    }
    get getEleCatalogueTxt()
    {
        return browser.element("//span[text()='Catalogue']");
    }
    get getEleSelectFilterLst()
    {
        return browser.element("//select[@class='block']");
    }
    get getEleSellerSkuIDLst()
    {
        return browser.element("//option[text()='Seller SKU ID']");
    }
    get getEleMerchantSKUIDTxt()
    {
        return browser.element("//input[@type='text']");
    }
    get getEleSubmitBtn()
    {
        return browser.element("//button[@class='waves-effect waves-light btn']");
    }
    get getEleStockLeftTxt()
    {
        return browser.element("//li[@class='col s3']/b");
    }
    get getEleUserNameIcn()
    {
        return browser.element("//div[@class='inline rel user nodetail']/i");
    }
    get getElePopupBtn()
    {
        return browser.element("//img[@src='//d22vyp49cxb9py.cloudfront.net/close.png']");
    }
    get getEleSessionBtn()
    {
        return browser.element("#this_is_not_my_computer");
    }
    get getEleNotMeBtn()
    {
        return browser.element("//div[@id='selectEmail']/a");
    }

    stockBT()
    {
        var activities=new activitiesLog();
        activities.getEleInventoryLnk.click();
        this.getEleSellableQtyBtn.click();
        this.getEleMinQtyBtn.addValue(0);
        this.getEleMaxQtyBtn.addValue(0);
        this.getEleFilterBtn.click();
        this.getEleSelectProductLnk.click();
        btStock=parseInt(this.getEleStockTxt.getText());
        id = this.getEleSkuIDTxt.getText();
    }
    logoutFromPaytm()
    {
        for (var j = 0; j < 20; j++)
        {
            this.getEleUserNameIcn.moveToObject();
            if (browser.isVisible("//a[text()='Sign Out']"))
            {
                browser.element("//a[text()='Sign Out']").click();
                break;
            }
        }
    }
    stockPaytm(paytmurl,un,pwd)
    {
        this.stockBT();
        browser.windowHandleMaximize();
        browser.url(paytmurl);
        this.getElePaytmLoginLnk.click();
        browser.switchTab(browser.windowHandles().value[1]);
        if( !(browser.isVisible('#authentication_email')))
        {
            this.getEleNotMeBtn.click();
            flag=true;
        }
        this.getElePaytmUserNameTxt.setValue(un);
        this.getElePaytmSignInBtn.click();
        browser.pause(1000);
        this.getElePaytmPasswordTxt.setValue(pwd);
        this.getElePaytmSignInBtn.click();
        if(flag)
        {
            browser.pause(3000);
            this.getEleSessionBtn.click();
        }
        browser.switchTab(browser.windowHandles().value[0]);
      /*browser.waitForVisible("//iframe[@class='bOutpopanimateDF']",15000);
        if (browser.isExisting("//iframe[@class='bOutpopanimateDF']"))
        {
               var my_frame = $('iframe[class="bOutpopanimateDF"]').value;
               browser.frame(my_frame);
               browser.pause(1000);
               this.getElePopupBtn.click();
               browser.pause(1000);
        }*/
        browser.waitForValue("//iframe[@class='bOutpopanimateDF']",15000);
        if (browser.isExisting("//iframe[@class='bOutpopanimateDF']"))
        {
            browser.refresh();
        }
        this.getEleCatalogueTxt.click();
        browser.pause(2000);
        this.getEleSelectFilterLst.click();
        this.getEleSellerSkuIDLst.click();
        this.getEleMerchantSKUIDTxt.addValue(id);
        this.getEleSubmitBtn.click();
        paytmStock = parseInt(this.getEleStockLeftTxt.getText());
        this.logoutFromPaytm();
        quantity[0] = btStock;
        quantity[1] = paytmStock;
        return quantity;
    }
}
module.exports = ZeroProductPO;