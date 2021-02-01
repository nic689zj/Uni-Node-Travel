const { connection } = require("mongoose");

var myMap = new Map();

myMap.set(1, "和键'a string'关联的值1");
myMap.set(2, "和键'a string'关联的值2");
for(var [key,value] of myMap){
    console.log(key+"="+value)
}
myMap.forEach((key,value)=>{
    console.log(key+value)
})