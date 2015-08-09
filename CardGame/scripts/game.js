/**
 * Created by shashaankkrishnatray on 25-03-2015.
 */
define(['cards'], function (cards) {
    var count = 0;
    var color = ["red","yellow","green","blue"];
    var compHand =[];
    var userHand = [];



    $('#deal').click(function(){
        count++;
         var current = cards(count);
        compHand.push((current[0][0][0]),current[1][0]);
        userHand.push(current[0][1][0],current[1][1]);

        if(count==6)
        evaluate();
    });


    $("#reset").click(function (){
        var a = confirm("All progress will be lost!!!");
        if(a===true){
            localStorage.clear();
            location.reload();
        }
    });


    $('#show').click(function(){
        evaluate();
    });


    function evaluate(){
        var userScore= 0,compScore=0;
        for(var i=0;i<compHand.length;i+=2){
            compScore+=(compHand[i]+compHand[i+1]);
            userScore+=(userHand[i]+userHand[i+1]);
            var card =  $("#compCard"+((i/2)+1));
            card.css("-webkit-animation","vendOut 2s");
            card.css("animation","vendOut 2s");
            card.attr('src',"assets/"+color[compHand[i]]+compHand[i+1]+'.png');
            card.css("-webkit-animation","vendIn 2s");
            card.css("animation","vendIn 2s");
        }

        if(userScore>compScore){
            $('#winner').text("You won the round");
            $('#deal').off();
            window.setTimeout(function(){location.reload();},5000);

        }else if(userScore<compScore){
            $('#winner').text("Machine won the round");
            $('#deal').off();
            window.setTimeout(function(){location.reload();},5000);
        }else{
            alert('Game has not started');
        }

        var compTotal = Number(localStorage.getItem('comp'));
        var userTotal = Number(localStorage.getItem('user'));
        localStorage.setItem('comp',compTotal+compScore);
        localStorage.setItem('user',userTotal+userScore);

    }
})