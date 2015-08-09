/**
 * Created by shashaankkrishnatray on 25-03-2015.
 */
require(["game"],function(game){

    if(localStorage.length==0){
        localStorage.setItem('comp',0);
        localStorage.setItem('user',0);
    }

        $('#compScore').text(localStorage.getItem('comp'));
        $('#userScore').text(localStorage.getItem('user'));

})