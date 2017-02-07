var timeAndReason=[];
class ActivitiesLogPO
{
    get getEleInventoryLnk()
    {
        return browser.element("//div[text()='Inventory ']");
    }
    get getEleProductLnk()
    {
        return browser.element("//a[text()='Dreambolic Fckn Mobile Back Cover']");
    }
    get getEleTotalStockTxt()
    {
        return browser.element("//span[preceding-sibling::span[text()='Total Stock:']][1]");
    }
    get getEleQtyOnChannelTxt()
    {
        return browser.element("//td[contains(text(),'Flipkart')]//..//td[4]");
    }
    get getEleSkuCodeTxt()
    {
        return browser.element("//span[text()='SKU Code:']//..//span[4]");
    }
    get getEleActivitiesLnk()
    {
        return browser.element("//a[text()='Activities']");
    }
    get getEleSearchSkuCodeTxt()
    {
        return browser.element("#token-input-searchBySku");
    }
    get getEleTimestampTxt()
    {
        return browser.element("//table[@class='table table-condensed']//tr[2]//td[7]");
    }
    get getEleStatusMessageTxt()
    {
        return browser.element("//tr[@class='single_queue_result_302466831']//td[8]//div");
    }
    get getEleAllChannelSelectLnk()
    {
        return browser.element("//a[@class='btn btn-default dropdown-toggle channel_filter_drop']");
    }
    get getEleFlipkartChkBx()
    {
        return browser.element("//input[@data-title='Flipkart']");
    }
    get getEleFilterBtn()
    {
        return browser.element("//input[@data-title='Flipkart']//..//..//..//..//button[text()='Filter']");
    }

    reasonsAndTimeOfFailure()
    {
        this.getEleInventoryLnk.click();
        this.getEleProductLnk.click();
        var SKUID=this.getEleSkuCodeTxt.getText();
        var TotalStock=parseInt(this.getEleTotalStockTxt.getText());
        var QtyOnChannel=parseInt(this.getEleQtyOnChannelTxt.getText());
        if(TotalStock!=QtyOnChannel)
        {
            this.getEleActivitiesLnk.click();
            this.getEleSearchSkuCodeTxt.addValue(SKUID);
            browser.waitForVisible("//li[contains(text(),'Dreambolic Fckn Mobile Back Cover')]",20000);
            browser.keys("Enter");
            this.getEleAllChannelSelectLnk.click();
            this.getEleFlipkartChkBx.click();
            this.getEleFilterBtn.click();
            timeAndReason[0]= this.getEleTimestampTxt.getText();
            timeAndReason[1]= this.getEleStatusMessageTxt.getText();
        }
        return timeAndReason;
    }
}
module.exports=ActivitiesLogPO;