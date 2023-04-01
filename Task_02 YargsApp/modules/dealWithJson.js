const fs = require("fs");


class DealWithJSON{
static writeJsonData = (filename,data)=>{

    fs.writeFileSync(filename,JSON.stringify(data,null,"\t"));
}
static readJsonData = (filename)=>{
    let result;
  
    try{
        result =JSON.parse(fs.readFileSync(filename));
        if (!Array.isArray(result)){
          throw new Error("not an array");
          
        }
    }
    catch(e){
        result = [];
    }
    return result;
}

}

module.exports = DealWithJSON;