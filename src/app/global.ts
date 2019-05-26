import { isNumber } from "util";

export default function keypressEvent(event, type, maxlength) {
  var value = event.target.value;
  if (type == "name") {
    event.target.value = value.replace(/[^a-zA-Z]+\W/,"");
  }
 if(type=="email"){
    event.target.value = value.replace(/[^a-zA-z-0-9-@.]/,"");
 }
   
}
