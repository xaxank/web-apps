/**
 * Created by shashaankkrishnatray on 01-04-2015.
 */

require(['jquery-2.1.3.min','knockout-3.3.0','shop','bootstrap.min'],function($,ko,Shop,boot){

    var self = this;
    self.vm = new Shop();                       // model declaration

    self.Total_time=11;
// timer to check the auction time period
    self.timer = function(){
        if(self.vm.inventory.items().length > 0){
            self.Total_time=self.Total_time-1;
            if(self.Total_time<0){              //sending item bottom of the list
                self.vm.inventory.buy();
                self.Total_time=10;             // resetting the timer
                self.vm.inventory.items.push(bought);
            }
            else{
                count = '0'+parseInt((self.Total_time/60)%60)+' : '+parseInt(self.Total_time%60)+' seconds';
                document.title =count;
            }
            setTimeout(function(){self.timer();},1000);
        }else{
            alert("auction has ended"); }
    }
    self.timer();
    self.sentBack=false;                        // setting false for failsafe
    ko.applyBindings(self.vm);                  // binding to the document

});