/**
 * Created by shashaankkrishnatray on 20-03-2015.
 */

var files;
(function () {

    var audioFiles =[];
    var song;
    var file_drop = $('#files').get(0);
    var player = $('#player').get(0);
    var currentFile =0;
    var total;

    function supportsFileAPI() {
        return window.File && window.FileReader && window.FileList && window.Blob;
    }

    if(navigator.onLine){

    }else{

    }

    if(!supportsFileAPI()){
        alert("browser issues");
    }else{
        localStorage.clear();
    }

    playFile = function (idx) {
        try{
            song = URL.createObjectURL(audioFiles[idx]);
            player.src = song ;
            player.play();
            clearCanvas();
            window.setTimeout(function() { return handleProgress({target: player}); }, 500);
            currentFile = idx;
            populate();
        }
        catch(error) {
            alert(error.message);
        }
    }

    var handleDrop= function(event) {
        event.stopPropagation();
        event.preventDefault();

        files = event.dataTransfer.files;// file list object
          var  output =[], i, f;
        var len = audioFiles.length;
        for(i=0; f = files[i]; i++) {
            output.push('<li onclick="playFile('+(len+i)+')" value="'+(len+i+1)+'">'+f.name+'</li>');
            if(f.type === 'audio/mp3'||f.type === 'audio/mpeg' || f.type === 'audio/ogg' || f.type === 'audio/x-m4a' || f.type ==='audio/mp4' || f.type==='video/webm'){
                audioFiles.push(f);
                localStorage.setItem(audioFiles.length, f.name);
            }
        }
        if(len==0){
            playFile(0);
        }
        else{
            populate();
        }
    };

    function populate(){

        var output = [];
        $('#playlist').empty();
        for(var i=0;i<localStorage.length;++i){
            if(i==currentFile)
                output.push('<li onclick="playFile('+(i)+')" value="'+(i+1)+'"><b>'+localStorage.getItem(i+1)+'</b></li>');
            else
                output.push('<li onclick="playFile('+(i)+')" value="'+(i+1)+'">'+localStorage.getItem(i+1)+'</li>');
        }
        $('#playlist').append(output.join(''));
    }

    function handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function handleProgress(event) {
        if(total === event.target.duration && total!=false){
            var current = event.target.currentTime;
            if(total==current){
                URL.revokeObjectURL(song);
                playNext(event);
            }
            $('#bar').val(current/total *100);
            animate(current);
            $("#nameOfSong").text(localStorage.getItem(currentFile+1));

        }else{
            total = event.target.duration;}

        if(!event.target.paused && !event.target.ended)
            window.setTimeout(function() { return handleProgress({target: player}); },500);
    }

    var canV= $('#myCanvas').get(0);
    var drw = canV.getContext("2d");

    function animate(current){
        $('#files').css("background-color","#2"+Math.ceil(Math.random()*10)+"8"+
        Math.ceil(Math.random()*10)+Math.ceil(Math.random()*10).toString()+
        Math.ceil(Math.random()*10));

        drw.beginPath();
        drw.arc(canV.width/2,canV.height/2,5+Math.ceil(Math.random()*(canV.height-20)/2),0,2*Math.PI);

        drw.strokeStyle="#"+Math.ceil(Math.random()*10).toString()+Math.ceil(Math.random()*10)+
        "4"+Math.ceil(Math.random()*10)+Math.ceil(Math.random()*10).toString()+Math.ceil(Math.random()*10);
        drw.stroke();
    }
    var play = false;
    function handlePlay() {
        if(play == false){
            play=true;
            player.play();
            window.setTimeout(function() { return handleProgress({target: player}); }, 500);}
        else{
            player.pause();
            play=false;
        }
    }

    function clearCanvas(){
        var canvas = $('#myCanvas').get(0);
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    function playPrev(){
        currentFile--;
        if(currentFile<0){
            URL.revokeObjectURL(song);
            playFile(audioFiles.length-1);
        }
        else
        {
            playFile(currentFile);
        }
        clearCanvas();
        window.setTimeout(function() { return handleProgress({target: player}); }, 500);
    }

    function playNext(){
        currentFile++;
        if(currentFile>=audioFiles.length){
            playFile(0);
        }
        else
        {
            playFile(currentFile);
        }
        clearCanvas();
        window.setTimeout(function() { return handleProgress({target: player}); }, 500);
    }

    file_drop.addEventListener('dragover', handleDragOver, false);
    file_drop.addEventListener('drop', handleDrop, false);
    document.getElementById('play').addEventListener('click', handlePlay, false);
    document.getElementById('Prev').addEventListener('click', playPrev, false);
    document.getElementById('Next').addEventListener('click', playNext, false);

    getLocation();
})();



function getLocation (){
    if(navigator.geolocation && navigator.onLine){
        navigator.geolocation.getCurrentPosition(success);
    }else{
        error('geolocation not available');
    }
}

function success(position){

    var mapOptions = {
        zoom: 15
    }
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    $.ajax({
        url:'http://maps.googleapis.com/maps/api/geocode/json',
        dataType : 'json',
        type:'GET',
        data:{
            'latlng': lat+","+lng
        },
        success : function(results,status){
            var  map = new google.maps.Map( $('#map-canvas').get(0) , mapOptions);
            map.setCenter(results['results'][0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.BOUNCE,
                position: results['results'][0].geometry.location
            });
        },
        error : function(error){
            alert("but nothing happened"+error.status);
        }
    });
}



