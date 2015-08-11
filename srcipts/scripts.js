/**
 * Created by shashaankkrishnatray on 07-04-2015.
 */

var dropArea = $('#app').get(0);
var item = $('img').get(0);
var appName = '';
var appSrc = '';

var description = {
                    'CardGame':' Simple card game to tryout lazy loading of resources using requirejs',
                    'GeoTag':' web app to interact with googleMaps API and find locations',
                    'Flopkart':' simple app to try out two-way binding using knockoutjs',
                    'VehicleReg':' app developed on angularjs to understand the working of the framework',
                    'EmployeeSystem':' simple app on angular js to understand the flow of control in angularjs',
                    'MP3Player': 'app to play music by overriding and using the functionality of web browser '
                    };


function beginDemo(){


    var nav = $('#appNav');

    nav.removeClass('col-xs-6');
    nav.addClass('col-xs-1');

    $('#intro').hide();

    var showCase = $('#app');

    showCase.removeClass('col-xs-6');
    showCase.addClass('col-xs-11');

    var demoBtn = $('#activeDemo');
    demoBtn.attr('src',appSrc);
    demoBtn.show();

    $('.controls').show();

    $('#desc').get(0).innerHTML = description[appName];

    $('.demoWindow').show();
    var demoWindow = $('#runIt');



    demoWindow.attr('src','http://xaxank.github.io/'+appName);

}

$('#activeDemo').hover(function () {

    var toolTip = $('#toolTip');
    toolTip.get(0).innerText = "Click on the active app's icon to navigate back to app selection menu";
    toolTip.show();},
    function (){
    $('#toolTip').hide();}
);


$('#activeDemo').click( function(){
    var nav = $('#appNav');

    nav.removeClass('col-xs-1');
    nav.addClass('col-xs-6');

    var showCase = $('#app');

    showCase.removeClass('col-xs-11');
    showCase.addClass('col-xs-6');

    $('#activeDemo').hide();
    $('.controls').hide();
    var demoWindow = $('.demoWindow');

    demoWindow.attr('src','');
    demoWindow.hide();

    $('#intro').show();
    $('#intro *').delay(1000).show('slow');
});

$('#openAppSite').click(function () {
    window.open('http://xaxank.github.io/'+appName);
});

$('#openCodeSite').click(function () {
    window.open('https://github.com/xaxank/xaxank.github.io/tree/master/'+appName);
});


function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}

function handleDrop(event){
    event.stopPropagation();
    event.preventDefault();
    beginDemo();

}

function drag(event) {
    event.stopPropagation();
    event.preventDefault();
    appName = event.target.name;
    appSrc  = event.target.src;
}


dropArea.addEventListener('drop',handleDrop,false);
dropArea.addEventListener('dragover',handleDragOver,false);
item.addEventListener('drag',drag,false);
