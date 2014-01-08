Lungo.init({
}); 

Lungo.Events.init({
    'load article#view': function(){
        Lungo.dom('#percentage').text('80%');
        //Lungo.dom('#canvas').style('width', '600px');//window.innerWidth - 20;

        var ctx = document.getElementById("occupancyChart").getContext("2d");
        ctx.canvas.width  = window.innerWidth - 20;

        var myLine = new Chart(document.getElementById("occupancyChart").getContext("2d")).Line(getChartData(), getChartOptions());
    }
});

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
};

