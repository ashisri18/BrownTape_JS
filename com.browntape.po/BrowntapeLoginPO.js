class BrowntapeLoginPO
{
    get getEleUserNameTxt()
    {
        return browser.element("#UserEmail");
    }
    get getElePasswordTxt()
    {
        return browser.element("#UserPassword");
    }
    get getEleSignInBtn()
    {
        return browser.element("#submit-btn");
    }

    brownTapeLogin(un, pwd)
    {
        this.getEleUserNameTxt.setValue(un);
        this.getElePasswordTxt.setValue(pwd);
        this.getEleSignInBtn.click();
    }
}
module.exports = BrowntapeLoginPO;
