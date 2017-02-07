var log4js = require('log4js');
log4js.loadAppender('file');
var fs = require('fs');
var dir = null;
class LogReport
{
    logger(logFileName)
    {
        var contents = fs.readFileSync("Json/config.json");
        var jsonContent = JSON.parse(contents);
        log4js.addAppender(log4js.appenders.file('logs'+'/'+logFileName+'_'+jsonContent.currentDateAndTime+'.log'),'log');
        var logger = log4js.getLogger('log');
        logger.setLevel('INFO');
        logger.setLevel('DEBUG');
        return logger;
    }
}
module.exports=new LogReport();