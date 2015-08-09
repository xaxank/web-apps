/**
 * Created by shashaankkrishnatray on 25-03-2015.
 */
define(function () {

    var color = ['red','yellow','green','blue'];

    return function (num){
        var cardColor  = [];
        var cardValue = [];

        //computer's card
        cardColor.push([Math.ceil((Math.random()*10)%4)-1]);
        cardValue.push(Math.ceil((Math.random()*10)%9));

        //player's card
        cardColor.push([Math.ceil((Math.random()*10)%4)-1]);
        cardValue.push(Math.ceil((Math.random()*10)%9));

        $("#compCard"+num).attr('src',"assets/hide.png");
        $("#compCard"+num).parent().css('background-color',color[cardColor[0]]);
        $("#userCard"+num).attr('src',"assets/"+color[cardColor[1]]+cardValue[1]+'.png');
        return [cardColor,cardValue];
    }
})