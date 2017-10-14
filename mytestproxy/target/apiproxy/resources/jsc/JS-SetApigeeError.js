var apiNo = context.getVariable("apiNo");
var faultName = context.getVariable ("fault.name");
var errorResponse = JSON.parse(context.getVariable ("error.content"));
var faultString = errorResponse.fault.faultstring;

context.setVariable("isoTimestamp", ISODateString()); // Prints something like 2009-09-28T19:03:12+08:00

if(faultString !== null && faultString.toUpperCase().includes("SC-VALIDATETOKENCONNECTID FAILED"))
    faultName = "TokenValidationFailed";

switch (faultName) {

case "TokenValidationFailed":
    context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "401."+apiNo+".101");
	context.setVariable("errorDesc", "Unauthorized");
	context.setVariable("errorMessage", "Token Validation Failed");
	context.setVariable("httpError", "401");
	break;
	
case "SpikeArrestViolation":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "429."+apiNo+".101");
	context.setVariable("errorDesc", "Too Many Requests");
	context.setVariable("errorMessage", "Spike arrest violation");
	context.setVariable("httpError", "429");
	break;

case "QuotaViolation":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "429."+apiNo+".102");
	context.setVariable("errorDesc", "Too Many Requests");
	context.setVariable("errorMessage", "Rate limit quota violation. Quota limit exceeded");
	context.setVariable("httpError", "429");
	break;

case "ConcurrentRatelimtViolation":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "429."+apiNo+".103");
	context.setVariable("errorDesc", "Too Many Requests");
	context.setVariable("errorMessage", "Concurrent rate limit connection exceeded");
	context.setVariable("httpError", "429");
	break;

case "ScriptExecutionFailed":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "500."+apiNo+".101");
	context.setVariable("errorDesc", "Internal Server Error");
	context.setVariable("errorMessage", "JavaScript runtime error");
	context.setVariable("httpError", "500");
	break;

case "InvalidApiKeyForGivenResource":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "500."+apiNo+".102");
	context.setVariable("errorDesc", "Internal Server Error");
	context.setVariable("errorMessage", "Invalid ApiKey for given resource");
	context.setVariable("httpError", "500");
	break;

case "ExecutionFailed":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "500."+apiNo+".103");
	context.setVariable("errorDesc", "Internal Server Error");
	context.setVariable("errorMessage", "Request input is malformed or invalid");
	context.setVariable("httpError", "500");
	break;

case "InvalidJSONPath":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "500."+apiNo+".104");
	context.setVariable("errorDesc", "Internal Server Error");
	context.setVariable("errorMessage", "Invalid JSON path");
	context.setVariable("httpError", "500");
	break;

case "RaiseFault":
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "404."+apiNo+".101");
	context.setVariable("errorDesc", "Resource not found");
	context.setVariable("errorMessage", "Resource not found/Invalid resource");
	context.setVariable("httpError", "404");
	break;

default:
	context.setVariable("exceptionName", "exceptionName");
	context.setVariable("errorCode", "500."+apiNo+".100");
	context.setVariable("errorDesc", "Internal Server Error");
	context.setVariable("errorMessage", faultName);
	context.setVariable("httpError", "500");
	break;
    
}

function padWithZero(number, strLength) {

    var newString = '' + number;
    while (newString.length < strLength) {
        newString = '0' + newString;
    }

    return newString;
}

/* Use a function for the exact format desired... */
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