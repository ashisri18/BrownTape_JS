var http = require("http");
var fs = require('fs');
var sino =1;
var slno =1;

var server = http.createServer(function(request, response)
{
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<html xmlns='http://www.w3.org/1999/xhtml'>");
    response.write("<head>");
    response.write("<title>AUTOMATION TEST REPORT</title>");
    response.write("<style>.browntape{float : right} </style>");
    response.write("<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script>");
    response.write("<script type='text/javascript'>$('#btnPrint').live('click', function () {var divContents = $('#form1').html();var printWindow = window.open('', '', 'height=400,width=800');printWindow.document.write('<html><head><title></title>');printWindow.document.write('</head><body >');printWindow.document.write(divContents);printWindow.document.write('</body></html>');printWindow.document.close();printWindow.print();}); </script>");
    response.write("</head>");
    response.write("<body>");
    response.write("<form id='form1'>");
    response.write("<br>");
    response.write("<div style='float: right;'><img class='browntape' src='data:image/jpeg;base64,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' height='100' width='100'></div>");
    response.write("<img src='http://www.crowdbetatesters.com/images/logo.png' height='50' width='100' align='right-top'>");
    response.write("<p><h2><font-family='ariel'><center>AUTOMATION TEST REPORT</center></font></h2></p>");
    response.write("</br>");

    var currentDateAndTime = fs.readFileSync('../json/config.json');
    var jsonContentDateAndTime = JSON.parse(currentDateAndTime);
    var currentDateAndTime = jsonContentDateAndTime.currentDateAndTime;
    var contentsAcivityModule = fs.readFileSync("../json/ACTIVITY MODULE.json");
    var jsonContentActivityModule = JSON.parse(contentsAcivityModule);
    var contentsInventoryModule = fs.readFileSync("../json/INVENTORY MODULE.json");
    var jsonContentInverntoryModule = JSON.parse(contentsInventoryModule);

    response.write("<p><h4>Report generated by: Automation Team,"+"   "+  currentDateAndTime  +""+"   "+"</h4></p>");
    response.write("<p><h4>This report demonstrates the status of automation execution results in number, percentage of Passed, and  Failed Test Cases.</h4></p>");

    response.write("<p><h4>Test Automation Summary : </h4></p>");
    response.write("</br>");
    response.write("<center><table border='1' cellpadding='10' cellspacing='2'>");
    response.write("<tr>");
    response.write("<th>SI NO</th><th>MODULE</th><th>PASSED</th><th>FAILED</th>");
    response.write("</tr>");
    response.write("<tr>");
    response.write("<td align='center'>"+sino+"</td><td align='center'>"+jsonContentActivityModule.modulename+"</td><td align='center'>"+jsonContentActivityModule.passedcount+"</td><td align='center'>"+jsonContentActivityModule.failedcount+"</td>");
    sino++;
    response.write("</tr>");
    response.write("<tr>");
    response.write("<td align='center'>"+sino+"</td><td align='center'>"+jsonContentInverntoryModule.modulename+"</td><td align='center'>"+jsonContentInverntoryModule.passedcount+"</td><td align='center'>"+jsonContentInverntoryModule.failedcount+"</td>");
    sino++;
    response.write("</tr>");
    response.write("</table></center>");
    response.write("</br>");
    response.write("</br>");
    response.write("</br>");

    response.write("<p><h4>MODULE DISCRIPTION : </h4></p>");
    response.write("<p><h4>MODULE NAME : "+jsonContentActivityModule.modulename+"</h4></p>");
    response.write("</br>");
    response.write("</br>");

    var contentsActModule = fs.readFileSync("../json/Activity_Report.json");
    var jsonContentActModule = JSON.parse(contentsActModule);
    var contentsInvModule = fs.readFileSync("../json/Inventory_Report.json");
    var jsonContentsInvModule = JSON.parse(contentsInvModule);

    response.write("<center><table border-collapse='collapse' border='1' cellpadding='10' cellspacing='2'>");
    response.write("<tr>");
    response.write("<th>SI NO</th><th>TEST CASE ID</th><th>DESCRIPTION</th><th>STATUS</th>");
    response.write("</tr>");
    response.write("<tr>");
    response.write("<td align='center'>"+slno+"</td><td align='center'>"+jsonContentActModule.AC_TC_ERROR_ACTIVITY+"</td><td align='center'>"+jsonContentActModule.AC_DESC_ERROR_ACTIVITY+"</td><td align='center'>"+jsonContentActModule.AC_STATUS_ERROR_ACTIVITY+"</td>");
    slno++;
    response.write("</tr>");
    response.write("</table></center>");
    response.write("</br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>");
    response.write("<p><h4>MODULE NAME : "+jsonContentInverntoryModule.modulename+"</h4></p>");

    response.write("</br>");
    response.write("</br>");
    response.write("<center><table border-collapse='collapse' border='1' cellpadding='10' cellspacing='2'>");
    response.write("<tr>");
    response.write("<th>SI NO</th><th>TEST CASE ID</th><th>DESCRIPTION</th><th>STATUS</th>");
    response.write("</tr>");
    response.write("<tr>");
    response.write("<td align='center'>"+slno+"</td><td align='center'>"+jsonContentsInvModule.IN_TC_LISTING_WATCH+"</td><td align='center'>"+jsonContentsInvModule.IN_DESC_LISTING_WATCH+"</td><td align='center'>"+jsonContentsInvModule.IN_STATUS_LISTING_WATCH+"</td>");
    slno++;
    response.write("</tr>");

    response.write("<tr>");
    response.write("<td align='center'>"+slno+"</td><td align='center'>"+jsonContentsInvModule.IN_TC_CHANNEL_LISTING+"</td><td align='center'>"+jsonContentsInvModule.IN_DESC_CHANNEL_LISTING+"</td><td align='center'>"+jsonContentsInvModule.IN_STATUS_CHANNEL_LISTING+"</td>");
    slno++;
    response.write("</tr>");

    response.write("<tr>");
    response.write("<td align='center'>"+slno+"</td><td align='center'>"+jsonContentsInvModule.IN_TC_COMPARING_STOCK+"</td><td align='center'>"+jsonContentsInvModule.IN_DESC_COMPARING_STOCK+"</td><td align='center'>"+jsonContentsInvModule.IN_STATUS_COMPARING_STOCK +"</td>");
    slno++;
    response.write("</tr>");

    response.write("<tr>");
    response.write("<td align='center'>"+slno+"</td><td align='center'>"+jsonContentsInvModule.IN_TC_ZERO_PRODUCT+"</td><td align='center'>"+jsonContentsInvModule.IN_DESC_ZERO_PRODUCT+"</td><td align='center'>"+jsonContentsInvModule.IN_STATUS_ZERO_PRODUCT+"</td>");
    slno++;
    response.write("</tr>");

    response.write("<tr>");
    response.write("<td align='center'>"+slno+"</td><td align='center'>"+jsonContentsInvModule.IN_TC_NONZERO_PRODUCT+"</td><td align='center'>"+jsonContentsInvModule.IN_DESC_NONZERO_PRODUCT+"</td><td align='center'>"+jsonContentsInvModule.IN_STATUS_NONZERO_PRODUCT+"</td>");
    slno++;
    response.write("</tr>");
    response.write("</table></center>");

    response.write("</form>");
    response.write("</br>");
    response.write("</br>");
    response.write("</br>");
    response.write("<input type='button' value='Click here to download the PDF' id='btnPrint' />");
    response.write("</body>");
    response.write("</html>");
    response.end();
});
server.listen(4000);
console.log("Server is listening");