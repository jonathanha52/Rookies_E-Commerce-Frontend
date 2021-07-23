import axios from "axios";

const HOST = "http://localhost:8080/api/v1/"

export default class SpringHelper{
    static get(name){
        return axios({
            method: 'get',
            url: HOST+name,
            auth:{
                username: 'admin',
                password: 'admin'
            }
        })
    }
    static post(name, data){
        return axios.post(HOST+name, data)
    }
}