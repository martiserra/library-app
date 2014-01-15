exports.getLocalizedDate = (function() {
  var now = new Date();
  var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000*1)).getTime();
});