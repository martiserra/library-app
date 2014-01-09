// CONSTANTS
var GET_LIBRARY = "/libraries/1";

// Init Lungo Application
Lungo.init({
}); 

// Show Disclaimer Notification
Lungo.Notification.success(
    "Estem de Proves!",
    "L'aplicació funcionarà els dies 11 i 12 de Gener en fase de proves a la Biblioteca de Ciències Socials de la UAB. Si vols, deixa'ns els teus comentaris a l'apartat d'opinions. Gràcies!",
    7,
    function(){}
);

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
        refreshLibraryData();    
    }, 
    'tap article#view li#refresh' : function(){
        refreshLibraryData();    
    }
});

// AJAX Calls
refreshLibraryData = function(){
    var library = JSON.parse(Lungo.Service.json(GET_LIBRARY, ''));

    Lungo.dom('#percentage').text(getPercentage(library.occupancy));
    Lungo.dom('#places').text(library.places);
    Lungo.dom('#library-name').text(library.name);
    var ctx = document.getElementById("occupancyChart").getContext("2d");
    ctx.canvas.width  = window.innerWidth - 20;

    var myLine = new Chart(document.getElementById("occupancyChart").getContext("2d")).Line(getChartData(), getChartOptions());

}


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

