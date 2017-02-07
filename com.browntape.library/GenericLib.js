var Excel = require('exceljs');
var xlsx = require('node-xlsx');
var fs = require('fs');
var workbook = null;
var temp = null;

class GenericLib
{
    excelReadData(fileName, sheetName, tcID)
    {
        var da = xlsx.parse(fileName);
        for (var i = 0; i <= da.length - 1; i++)
        {
            var getSheetName = da[i].name;
            if (getSheetName == sheetName)
            {
                for (var j = 0; j <= da[i].data.length - 1; j++)
                {
                    temp = da[i].data[j];
                    if (temp[0] == tcID)
                    {
                        break;
                    }
                }
            }
        }
        return temp;
    }

    resultCounts(moduleName, passCount, failCount)
    {
        var result = {modulename:moduleName, passedcount: passCount,failedcount: failCount}
        var sResult = JSON.stringify(result);
        fs.writeFile('Json/'+moduleName+'.json', sResult, function (err)
        {
            if (err) {
                console.log('There has been an error saving your configuration data.');
                console.log(err.message);
                return;
            }
        })
    }

    excelWriteData(fileName, sheetName, tcId, data)
    {
        workbook = new Excel.Workbook();
        workbook.xlsx.readFile(fileName)
       .then(function ()
       {
           var worksheet = workbook.getWorksheet(sheetName);
           worksheet.eachRow(function (row)
           {
               row.eachCell(function (cell)
               {
                   if (cell.value == tcId)
                   {
                       for (var i = 2, j = 0; i <= data.length + 1; i++)
                       {
                           row.getCell(i).value = data[j++];
                       }
                   }
               });
           });
           return workbook.xlsx.writeFile(fileName);
       });
    }
}
module.exports = GenericLib;