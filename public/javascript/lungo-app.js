// CONSTANTS
var GET_LIBRARY = "http://localhost:3000/libraries/1";

// Init Lungo Application
Lungo.init({
}); 

// Init Lungo Services for Ajax Requests
Lungo.Service.Settings.async = false;
Lungo.Service.Settings.error = function(type, xhr){
    Lungo.Notification.error(
        "Error",                      
        "Error Connecting to the server - " + type + " :: " + xhr,    
        "cancel",                    
        7                             
    );
};
Lungo.Service.Settings.headers["Content-Type"] = "application/json";
Lungo.Service.Settings.crossDomain = false;
Lungo.Service.Settings.timeout = 20000;

// Lungo Events
Lungo.Events.init({
    'load article#view': function(){
        var library = JSON.parse(Lungo.Service.json(GET_LIBRARY, ''));

        Lungo.dom('#percentage').text(getPercentage(library.occupancy));
        var ctx = document.getElementById("occupancyChart").getContext("2d");
        ctx.canvas.width  = window.innerWidth - 20;

        var myLine = new Chart(document.getElementById("occupancyChart").getContext("2d")).Line(getChartData(), getChartOptions());
    }
});

// Chart Creation
getChartData = function(){
    var lineChartData = {
        labels : ["9:00","10:00","11:00","12:00","13:00","14:00","15:00"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]
    }
  return lineChartData;
};

getChartOptions = function(){
    var options = {
        scaleOverride : true,
        scaleSteps : 5,
        scaleStepWidth : 20,
        scaleStartValue : 0
    } 
    return options;
};

// Helpers
getPercentage = function(number) {
  return Math.round(number * 100) + '%';
}

