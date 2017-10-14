var transactionIdseq = context.getVariable("ratelimit.Q-TransactionSeq.used.count").toString();
context.setVariable("transactionIdseq", transactionIdseq);

var reqVerb = context.getVariable("request.verb");
context.setVariable("reqVerb",reqVerb);

var apiNo = "xxx";  // Set the correct API Number (as per BU API sequence) for use in Error Codes
context.setVariable("apiNo",apiNo);

context.setVariable("transactionId", apiNo + transactionDateTime() + padLeadingZeros(transactionIdseq));

context.setVariable("isoTimestamp", ISODateString());

function transactionDateTime() {
    var now = new Date(),
                pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear() 
         + pad(now.getMonth()+1)
         + pad(now.getDate())
         + pad(now.getHours())
         + pad(now.getMinutes()) 
         + pad(now.getSeconds());
}

function ISODateString() {
    var now = new Date(),
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear() 
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate())
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes()) 
        + ':' + pad(now.getSeconds()) 
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);
}

function padLeadingZeros(input) {
    var step;
    var output=input;
    for(step=input.length; step<6; step++)
        output="0"+output;
    return output;
}