
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./final-service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }


$(document).ready(function(){
    $("#chooseLine").show();
});
  
function showScreen(screenId){
        $(".screen").hide();
        screenId = $(this).attr("href");
        $(screenId).show();
}

function getRed() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
            //console.log(v.station_name + " (Terminal Arrival)");   
            if(i<1 && v.red!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.red==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && v.red==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.red==true)){
                console.log(v.station_name + i);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"red", "border-style":"solid", "border-color":"red", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                clone.addClass(".station-button");
                $("#station-list").append(clone);
                
                //var mapID = v.map_id;
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"red", "background-color":"red"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
                
            }
            
        });
       
    });
    
}

function getBlue() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.blue!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.blue==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && v.blue==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.blue==true)){
                console.log(v.station_name + i);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"blue", "border-style":"solid", "border-color":"blue", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"blue", "background-color":"blue"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function getBrown() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.brn!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.brn==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && v.brn==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) 
                && (response[i-1].station_descriptive_name != v.station_descriptive_name) && v.brn==true)){
                console.log(v.station_name+i);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"brown", "border-style":"solid", "border-color":"brown", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"brown", "background-color":"brown"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function getGreen() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.g!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.g==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && v.g==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.g==true)){
                console.log(v.station_name);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"green", "border-style":"solid", "border-color":"green", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"green", "background-color":"green"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function getOrange() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.o!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.o==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && v.o==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.o==true)){
                console.log(v.station_name);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"orange", "border-style":"solid", "border-color":"orange", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"orange", "background-color":"orange"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function getPurple() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.p!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.p==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && (v.p==true||v.pexp==true) && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.p==true)){
                console.log(v.station_name);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"purple", "border-style":"solid", "border-color":"purple", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"purple", "background-color":"purple"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function getPink() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.pnk!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.pnk==true){
                console.log(v.station_name);
                $("#stop").hide();
                
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"#ff1493", "border-style":"solid", "border-color":"pink", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                clone.addClass(".station-button");
                $("#station-list").append(clone);
            }
            //$("#stop").hide();
            if((i>0 && v.pnk==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.pnk==true)){
                    
                console.log(v.station_name);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"#ff1493", "border-style":"solid", "border-color":"pink", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                clone.addClass(".station-button");
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"#ff1493", "background-color":"#ff1493"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function getYellow() {
    $.get("https://data.cityofchicago.org/resource/8mj8-j3c4.json", function(response){
        console.log(response); 
        $.each(response, function(i,v){
                
            if(i<1 && v.y!=true){
                $("#stop").hide();
            }    
            else if(i<1 && v.y==true){
                console.log(v.station_name);
                $(".station-button").show();
                $("#stop-name").text(v.station_name);
            }
            if((i>0 && v.y==true && (response[i-1].station_descriptive_name != v.station_descriptive_name) ) 
                || ((v.stop_name == (v.station_name + " (Terminal arrival)")) && v.y==true)){
                console.log(v.station_name);
                var clone = $("#stop").clone();
                clone.show();
                var buttonName = v.station_name;
                clone.css({"color":"gold", "border-style":"solid", "border-color":"yellow", "background-color":"white"});
                          
                clone.find("#stop-name").text(buttonName);
                $("#station-list").append(clone);
                
                $(clone).on("click", function(){
                    $(".screen").hide();
                    //$(".station-button").hide();
                    $("#stopDistanceName").text("");
                    $("#stopDistance").hide()
                    var mapID = v.map_id;
                    console.log(mapID);
                    
                    
                    $.getJSON("https://polar-garden-75406.herokuapp.com/apiPassThru.php?apiEndpoint=http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx&key=b66475bb7c774bfd9257ad79755a6b17&mapid="+mapID+"&outputType=JSON", function(response){
                        //var currentStation ={};
                        currentStation = response.ctatt.eta[0];
                        console.log(response); 
                        //console.log(obj.ctatt.eta[0].lat);
                        //console.log(ctatt.eta[16]);
                        $.each(response, function(){
                            var now = new Date();
                            console.log(now);
                            for (var i=0; i<response.ctatt.eta.length; i++) {
                                var stopDistanceClone = $("#stopDistance").clone();
                                var arrivalTime = new Date(response.ctatt.eta[i].arrT);
                                //var arrivalTime = date.getMilliseconds();
                                console.log(arrivalTime);
                                var timeDiff = arrivalTime - now;
                                
                                var roundedHrs = Math.round((timeDiff % 86400000) / 3600000);
                                //var diffHrs = Math.floor((timeDiff % 86400000) / 3600000);
                                
                                var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
                                diffMins = diffMins + (roundedHrs * 60);
                                //console.log(roundedHrs);
                                //console.log(diffHrs);
                                console.log(diffMins);
                                var stationName = response.ctatt.eta[i].staNm;
                                var serviceName=stationName+" "+response.ctatt.eta[i].stpDe;
                                stopDistanceClone.css({"color":"white", "border-style":"solid", "border-color":"gold", "background-color":"yellow"});
                                //stopDistanceClone.find("#stopDistanceName").text(serviceName);
                                stopDistanceClone.find("#stopDistanceName").text(serviceName+":"+diffMins+" Min");
                                console.log(serviceName);
                                $("#stationDistance-list").append(stopDistanceClone);
                                stopDistanceClone.show();
                                //console.log(response.ctatt.eta[i].stpDe);
                                $(stopDistanceClone).on("click", function(station){
                                    $(".screen").hide();
                                    $("#map-tab").show();
                                    $("#map-tab").ready(function(){
                                        $("#map-tab").css("display", "initial");
                                        station = $(clone).find("#stop-name").text();
                                        showMap(station);
                                    });
                                });
                            }
                            
                        });
                    });
                    
                    $("#stationDistance").show();
                });
            }
        });
    });
}

function buttonClick() {
    $(".screen").hide();
    $(".station-button").hide();
    $("#stop-name").text("");
    
    var color = $(this).attr("id");
    console.log(color);
    if (color == "red") {
        getRed();
    }
    if (color == "blue") {
        getBlue();
    }
    if (color == "brn") {
        getBrown();
    }
    if (color == "g") {
        getGreen();
    }
    if (color == "o") {
        getOrange();
    }
    if (color == "p") {
        getPurple();
    }
    if (color == "pnk") {
        getPink();
    }
    if (color == "y") {
        getYellow();
    }
    $("#chooseStation").show();
}  

function showMap(stationName) {
    
    stationName = "station_name="+stationName;
    
    var endpoint = "https://data.cityofchicago.org/resource/8mj8-j3c4.json?"+stationName;
        
         $.get(endpoint, function(response){
          
            var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 14,
            center: {lat: parseFloat(response[0].location.coordinates[1]), lng: parseFloat(response[0].location.coordinates[0])},
            });
           
           
           var marker = new google.maps.Marker({
                  position: {lat: parseFloat(response[0].location.coordinates[1]), lng: parseFloat(response[0].location.coordinates[0])},
                  map: map,
                  title: response[0].station_name
                });
                
            infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            //map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
});

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
     
     // Your key is: b66475bb7c774bfd9257ad79755a6b17
 
   
$(".line-button").on("click", buttonClick);


$(".nav-link").on("click", showScreen);


var currentStation ={};
var db = new Dexie('Train Stations');

	// Define a schema
	db.version(1).stores({
		stations: 'id, name'
	});


	// Open the database
	db.open().catch(function(error) {
		alert('Uh oh : ' + error);
	});




$("#saveBtn").on("click", function() {
  console.log(currentStation.staNm);
  db.stations.add({
		id: currentStation.staId, 
		name: currentStation.staNm
	});

});



$("#saved").on("click", listSavedQuotes);


function listSavedQuotes () {
  //console.log($("#quoteTemplate"));
  $("#savedList").show();
  $("#savedStation").hide();
  db.stations
		.each (function (response) {
		  console.log(response);
		  var clone = $("#savedStation").clone();
		  clone.show();
		  console.log(clone);
		  clone.find("#savedName").text(response.name);
		  //clone.attr("id", quote.id);
		  $("#savedStationGrid").append(clone);
		  
		});

  
}