var id=null;
var btStock=null;
var paytmStock=null;
var quantity=[];
var flag=false;
var activitiesLog =require('../com.browntape.po/ActivitiesLogPO');
var zero =require('../com.browntape.po/ZeroProductPO');
var zeroProduct=new zero();

class NonZeroProductPO
{

    get getEleSelectProductLnk()
    {
        return browser.element("//a[text()='Dreambolic Freedom Mobile Back Cover']");
    }

    get getEleSkuIDTxt()
    {
        return browser.element("//span[@class='label label-inverse']");
    }

    stockBrownTape()
    {
        var activities=new activitiesLog();
        activities.getEleInventoryLnk.click();
        zeroProduct.getEleSellableQtyBtn.click();
        zeroProduct.getEleMinQtyBtn.addValue(0);
        zeroProduct.getEleMaxQtyBtn.addValue(200);
        zeroProduct.getEleFilterBtn.click();
        this.getEleSelectProductLnk.click();
        btStock = parseInt(zeroProduct.getEleStockTxt.getText());
        id = this.getEleSkuIDTxt.getText();
    }
    stockPaytm(url, un, pwd)
    {
            this.stockBrownTape();
            browser.windowHandleMaximize();
            browser.url(url);
            zeroProduct.getElePaytmLoginLnk.click();
            browser.switchTab(browser.windowHandles().value[1]);
            if( !(browser.isVisible('#authentication_email')))
            {
                zeroProduct.getEleNotMeBtn.click();
                browser.pause(3000);
                flag=true;
            }
            zeroProduct.getElePaytmUserNameTxt.setValue(un);
            zeroProduct.getElePaytmSignInBtn.click();
            browser.pause(1000);
            zeroProduct.getElePaytmPasswordTxt.setValue(pwd);
            zeroProduct.getElePaytmSignInBtn.click();
           /*if(flag)
           {
                browser.pause(3000);
                this.getEleSessionBtn.click();

            }*/
            browser.switchTab(browser.windowHandles().value[0]);

            //browser.waitForVisible("//iframe[@class='bOutpopanimateDF']",15000);
            /*if (browser.isExisting("//iframe[@class='bOutpopanimateDF']"))
            {
                var my_frame = $('iframe[class="bOutpopanimateDF"]').value;
                browser.frame(my_frame);
                browser.pause(1000);
                this.getElePopupBtn.click();
                browser.pause(1000);
            }*/
          /*  browser.pause(10000);
            browser.refresh();*/
       // browser.waitForVisible("//iframe[@class='bOutpopanimateDF']",15000);
        if (browser.isExisting("//iframe[@class='bOutpopanimateDF']"))
        {
            browser.refresh();
        }
            zeroProduct.getEleCatalogueTxt.click();
            browser.pause(2000);
            zeroProduct.getEleSelectFilterLst.click();
            zeroProduct.getEleSellerSkuIDLst.click();
            zeroProduct.getEleMerchantSKUIDTxt.addValue(id);
            zeroProduct.getEleSubmitBtn.click();
            paytmStock = parseInt(zeroProduct.getEleStockLeftTxt.getText());
            zeroProduct.logoutFromPaytm();
            quantity[0] = btStock;
            quantity[1] = paytmStock;
            return quantity;
        }
}
module.exports = NonZeroProductPO;