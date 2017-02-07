var num=null;
var num1=null;
var number=[];
var activitiesLog =require('../com.browntape.po/ActivitiesLogPO');

class ListingWatchPO
{

    get getEleListingWatchLnk()
    {
        return browser.element("//a[contains(text(),'Listing Watch')]");
    }
    get getEleTotalListingLnk()
    {
        return browser.element("//span[text()='Total Listing']/../../td[2]//a");
    }
    get getEleUserNameTxt()
    {
        return browser.element("//input[@id='j_id0:navbar:txtUserName']");
    }
    get getElePasswordTxt()
    {
        return browser.element("//input[@id='j_id0:navbar:txtPassword']");
    }
    get getEleLogInBtn()
    {
        return browser.element("//input[@class='sf-button-secondary login-btn text-uppercase']");
    }
    get getEleSnapdealPopupBtn()
    {
        return browser.element("//button[text()='Ok']");
    }
    /* get getElePopUpBtn()
     {
         return browser.element("//div[text()='Skip']");
     }*/
    get getEleCatalogLnk()
    {
        return browser.element("//a[text()='Catalog']");
    }
    get getEleSnapdealListTxt()
    {
        return browser.element("//span[@ng-show='cat.liveCount>= 0 || cat.liveCountGlobal >= 0']");
    }

    listBT()
    {
        var activities=new activitiesLog();
        activities.getEleInventoryLnk.click();
        this.getEleListingWatchLnk.click();
        num=parseInt(this.getEleTotalListingLnk.getText());
    }
    listSnapdeal(SDURL,UN,PWD)
    {
        this.listBT();
        browser.url(SDURL);
        this.getEleUserNameTxt.addValue(UN);
        this.getElePasswordTxt.addValue(PWD);
        this.getEleLogInBtn.click();
       // browser.refresh();
        if(browser.isVisible("//button[text()='Ok']"))
        {
            this.getEleSnapdealPopupBtn.click();
        }
        browser.element("//i[@class='icon-catalog']").moveToObject();
        this.getEleCatalogLnk.click();
        browser.waitForVisible("//span[text()='Inventory']",15000);
        var a=this.getEleSnapdealListTxt.getText();
        var  num1=parseInt(a.substring(a.indexOf("(")+1,a.indexOf(")")));
        number[0]=num;
        number[1]=num1;
        return number;
     }
};
module.exports=ListingWatchPO;