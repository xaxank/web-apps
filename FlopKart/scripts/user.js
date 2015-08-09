/**
 * Created by shashaankkrishnatray on 01-04-2015.
 *
 * class to maintain the data for a coach
 *
 */
define(['knockout-3.3.0'],function(ko){
    return function (user) {
        var self = this;
        self.name = user;
        self.bill = ko.observable(0);
        self.stuff = ko.observableArray();

        self.buy = function () {                            // add player to list
            if(bought!=false){
                self.bill(self.bill()+ Number(bought.cost.valueOf()));
                self.stuff.push(bought);
                bought=false;                               // globally hoisted variable
            }
        }

        self.sell = function(){                             // remove player from list
            if(self.stuff().length>0){
                sentBack = self.stuff.pop();                // globally hoisted variable
                self.bill(self.bill()- Number(sentBack.cost.valueOf()));
                }
        }
    }
});