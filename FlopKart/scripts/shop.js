/**
 * Created by shashaankkrishnatray on 01-04-2015.
 */
define(['user','items','knockout-3.3.0'],function(User,Items,ko){

    var Inventory = [{'name':'Shashaank','image':'assets/shashaank.jpg','gender':'Male','cost':'42','Agility':'20','Strength':'10','Intelligence':'12'},
        {'name':'Ranjan','image':'assets/ranjan.jpg','gender':'Male','cost':'40','Agility':'12','Strength':'20','Intelligence':'18'},
        {'name':'Ashish','image':'assets/ashish.jpg','gender':'Male','cost':'35','Agility':'8','Strength':'7','Intelligence':'20'},
        {'name':'Rishabh','image':'assets/rishabh.jpg','gender':'Male','cost':'22','Agility':'10','Strength':'8','Intelligence':'4'},
        {'name':'Rajesh','image':'assets/rajesh.jpg','gender':'Male','cost':'5','Agility':'1','Strength':'2','Intelligence':'2'},
        {'name':'Axe','image':'assets/axe.jpg','gender':'??','cost':'45','Agility':'15','Strength':'23','Intelligence':'7'},
        {'name':'CM','image':'assets/crystalMaiden.jpg','gender':'Female','cost':'38','Agility':'15','Strength':'8','Intelligence':'15'}
    ];


    return function () {
        var self = this;
        self.counter = 1;
        self.sold = ko.observable(0);
        self.inventory = new Items(Inventory);
        self.serial = ko.observableArray([new User("sKy")]);
        self.buy = function(){
            self.inventory.buy();
            self.sold(self.sold()+1);
            Total_time=11;
        }
        self.sell = function(){
            if(sentBack!=false){
                self.inventory.returned(sentBack);
                self.sold(self.sold()-1);
                sentBack=false;
                Total_time=11;
            }
        }
        self.addUser = function () {
            self.counter++;
            self.serial.push(new User("user" + self.counter));
        }

        self.send = function(){
            alert("tumse na ho payega!!");
        }

    }

});