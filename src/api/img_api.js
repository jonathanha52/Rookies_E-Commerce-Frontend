import axios from "axios";
import FormData from "form-data";
const client_id = "6ef363aeab0e8ed";
const client_secret = "e67ab274c625c91b904b37e04cf00bc3067a9c1a";
const HOST = "https://api.imgur.com/3/upload";

export default class ImgurHelper{
    
    static post(path){
        var data = new FormData();
        data.append("image", path);
        return axios({
            method: "post",
            url: HOST,
            headers: {
                'Authorization': 'Client-ID 6ef363aeab0e8ed',
                'Content-Type': 'multipart/form-data'
            },
            data: data
        });
    }
}