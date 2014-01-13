

exports.getOccupancy = (function(activities) {
  var occupancy = 0;
  for (var i = 0; i < activities.length; i++) {
    occupancy += activities[i].inbound;
    occupancy -= activities[i].outbound;
  }
  return occupancy >= 0 ? occupancy : 0;
});

exports.getLastUpdate = (function(lastActivity) {
  var now = new Date()
  var difference = now.getTime() - lastActivity.date.getTime();

  if (difference < 1000 * 60) {
    return "menys d'un minut";
  } else if (difference < 1000 * 60 * 60) {
    var minutes = Math.floor(difference / 1000 / 60);
    return  minutes == 1 ? "1 minut" : minutes + " minuts";
  } else if (difference < 1000 * 60 * 60 * 24) {
    var hours = Math.floor(difference / 1000 / 60 / 60);
    return hours == 1 ? "1 hora" : hours + " hores";
  } else if (difference < 1000 * 60 * 60 * 24) {
    var days = Math.floor(difference / 1000 / 60 / 60 / 24)
    return  days == 1 ? "1 dia" : days + " dies";
  }
  
});