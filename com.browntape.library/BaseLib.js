class BaseLib
{
    loadURL(url)
    {
        browser.timeouts('implicit', 10000);
        browser.url(url);
    }
}
module.exports=BaseLib;