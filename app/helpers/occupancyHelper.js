

exports.getOccupancy = (function(activities) {
  var occupancy = 0;
  for (var i = 0; i < activities.length; i++) {
    occupancy += activities[i].inbound;
    occupancy -= activities[i].outbound;
  }
  return occupancy >= 0 ? occupancy : 0;
});

exports.getPercentage = (function(occupancy, places) {
  return occupancy >= places ? 1 : occupancy / places;
});

exports.getLastUpdate = (function(lastActivity) {
  if (!lastActivity) {
    return "Ocupació d'avui no disponible"
  } else {
    var now = new Date()
    var difference = now.getTime() - lastActivity.date.getTime();

    if (difference < 1000 * 60) {
      return "Ocupació actualitzada fa menys d'un minut";
    } else if (difference < 1000 * 60 * 60) {
      var minutes = Math.floor(difference / 1000 / 60);
      return  minutes == 1 ? "Ocupació actualitzada fa 1 minut" : "Ocupació actualitzada " + minutes + " minuts";
    } else if (difference < 1000 * 60 * 60 * 24) {
      var hours = Math.floor(difference / 1000 / 60 / 60);
      return hours == 1 ? "Ocupació actualitzada fa 1 hora" : "Ocupació actualitzada fa " + hours + " hores";
    } 
  }
});

exports.getChartInfo = (function(activities, places) {
  var labels = [];
  var data = [];
  var occupancy = 0;
  var previousHour = -1;
  for (var i = 0; i < activities.length; i++) {
    var hour = activities[i].date.getHours();
    if (previousHour != hour) {
      labels.push(hour + ":00");
      data.push(this.getPercentage(occupancy, places) * 100);
      previousHour = hour;
    }
    occupancy += activities[i].inbound;
    occupancy -= activities[i].outbound;
  }
  if (previousHour != -1) {
    labels.push("Ara");
    data.push(this.getPercentage(occupancy, places) * 100);  
  }
  return {labels : labels, data : data};
});