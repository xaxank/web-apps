/**
 * Created by shashaankkrishnatray on 01-04-2015.
 *
 *
 * class to maintain the item stock
 * providing
 * retrieving
 */


define(['knockout-3.3.0'],function(ko){
    return function (inventory) {                      // item list sent from the shop when it is declared
        var self = this;
        self.items = ko.observableArray(inventory)

        self.buy = function () {                       // popping the item if sold
            if(inventory.length>0){
                self.items.reverse();
                bought = self.items.pop();
                self.items.reverse();
            }
        }

        self.returned = function(item){                // pushing the item if returned
            self.items.push(item);
        }

    }
});