import axios from "axios";

// const BASE_URL = "https://www.preguntapi.dev/api/";

export default {
 
    async getCategories(){
        return await axios.get("https://www.preguntapi.dev/api/categories")
        .then(response =>{
            return response.data.categories
        })
        
        .catch(error =>{
            console.log (error)
        })
    }, 
    async getQuestions(category:any,level:any){
        return await axios.get('https://www.preguntapi.dev/api/categories/'+category+'?level='+level+'&limit=5')
        .then(response =>{
            return response.data
        })
        
        .catch(error =>{
            console.log (error)
        })
    }
};
   