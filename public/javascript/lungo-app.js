// CONSTANTS
var GET_LIBRARY = "/libraries/1";

// Init Lungo Application
Lungo.init({
}); 

// Show Disclaimer Notification
Lungo.Notification.success(
    "Estem de Proves!",
    "L'aplicació funcionarà els dies 18 i 19 de Gener en fase de proves a la Biblioteca de Ciències Socials de la UAB. Si vols, deixa'ns els teus comentaris a l'apartat d'opinions. Gràcies!",
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
    Lungo.dom('#lastUpdate').text(library.lastUpdate);

    var ctx = document.getElementById("occupancyChart").getContext("2d");
    ctx.canvas.width  = window.innerWidth - 20;
    ctx.canvas.height = 150;

    var myLine = new Chart(document.getElementById("occupancyChart").getContext("2d")).Line(getChartData(library.chartLabels, library.chartData), getChartOptions());

}


// Chart Creation
getChartData = function(labels, data){
    var lineChartData = {
        labels : labels,
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : data
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

