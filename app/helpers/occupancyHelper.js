

exports.getOccupancy = (function(activities) {
  var occupancy = 0;
  for (var i = 0; i < activities.length; i++) {
    occupancy += activities[i].inbound;
    occupancy -= activities[i].outbound;
  }
  if (occupancy > 0) {
    return occupancy;
  } else {
    return 0;
  }
});