var activitiesLog =require('../com.browntape.po/ActivitiesLogPO');

class CompareStockPO
{
    get getEleProductLnk()
    {
        return browser.element("//a[contains(text(),'Dreambolic sync and charge cable for iphone(black)')]");
    }
    get getEleQtyOnChannelTxt()
    {
        return browser.element("//td[contains(text(),'Flipkart')]/../td[4]");
    }
    get getEleDedicatedStockTxt()
    {
        return browser.element("//td[contains(text(),'Flipkart')]/../td[7]");
    }

    compareQuantity()
    {
        var activities=new activitiesLog();
        activities.getEleInventoryLnk.click();
        this.getEleProductLnk.click();
        var qtyOnChannel=parseInt(this.getEleQtyOnChannelTxt.getText());
        var dedicatedStock=parseInt(this.getEleDedicatedStockTxt.getText());
        var compstock;
        if(qtyOnChannel<=dedicatedStock)
        {
            compstock="Pass";
        }
        else
        {
            compstock="Fail";
        }
        return compstock;
    }
};
module.exports=CompareStockPO;