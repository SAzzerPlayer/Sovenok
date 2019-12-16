class GET_API{
    constructor(){

    }
    static getParametersFromSearch(search,key){
        let temp="";
        if(search.indexOf(key)!==-1){
            temp="";
            for(let i=search.indexOf(key)+key.length;i<search.length;i++){
                if(search[i]==="&"){
                    break;
                }
                if(search[i]!=="="){temp+=search[i]}
            }
        }
        else temp="";
        console.log(temp);
        return temp;
    }
}
export default GET_API;