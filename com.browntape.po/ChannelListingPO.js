var arr=[];
var activitiesLog =require('../com.browntape.po/ActivitiesLogPO');

class ChannelListingPO
{
    get getEleProductLnk()
    {
        return browser.element("//a[contains(text(),'Dreambolic sync and charge cable for Android(black)')]");
    }
    get getEleRedifshopTxt()
    {
        return browser.element("//table[@class='table table-hover']/tbody/tr[2]/td[1]");
    }
    get getEleAmazonindiaTxt()
    {
        return browser.element("//table[@class='table table-hover']/tbody/tr[3]/td[1]");
    }
    get getEleFlipkartTxt()
    {
        return browser.element("//table[@class='table table-hover']/tbody/tr[4]/td[1]");
    }
    get getEleSkuIDTxt()
    {
        return browser.element("//span[text()='SKU Code:']/../span[4]");
    }
    get getEleListingWatchLnk()
    {
        return browser.element("//a[contains(text(),'Listing Watch')]");
    }
    get getEleEnterCodeTxt()
    {
        return browser.element("//input[@class='input-xsmall search' and @data-type='custom_code']");
    }
    get getEleRediffshopListTxt()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[3]/td[1]");
    }
    get getEleAmazonIndiaListTxt()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[2]/td[1]");
    }
    get getEleFlipkartListTxt()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[1]/td[1]");
    }

    channellist()
    {
        var activities=new activitiesLog();
        var count=0;
        activities.getEleInventoryLnk.click();
        this.getEleProductLnk.click();
        var channelsOnInventory=[this.getEleRedifshopTxt.getText(),this.getEleAmazonindiaTxt.getText(),this.getEleFlipkartTxt.getText()];
        var id = this.getEleSkuIDTxt.getText();
        this.getEleListingWatchLnk.click();
        this.getEleEnterCodeTxt.addValue(id);
        browser.keys("Enter");
        var channelsOnProductDetails=[this.getEleAmazonIndiaListTxt.getText(),this.getEleRediffshopListTxt.getText(),this.getEleFlipkartListTxt.getText()];
        for(var i=0;i<channelsOnInventory.length;i++)
        {
            for(var j=0;j<channelsOnProductDetails.length;j++)
            {
                if (channelsOnInventory[i] == channelsOnProductDetails[j])
                {
                    count++;
                }
            }
        }
         arr[0]=count;
         arr[1]=channelsOnInventory.length;
        return arr;
    }
}
module.exports = ChannelListingPO;