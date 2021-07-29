import axios from "axios";

const HOST = "http://localhost:8080/api/v1/"

export default class SpringHelper{
    static get(name, auth=false){
        const token = window.localStorage.getItem("accessToken")
        if(auth)
            return axios({
                method: 'get',
                url: HOST+name,
                headers: {"Authorization": "Bearer "+ token}
            })
        else
            return axios({
                method: 'get',
                url: HOST+name
            })
    }
    static post(name, data, auth=false){
        const token = window.localStorage.getItem("accessToken")
        if(auth)
            return axios({
                method: 'post',
                url: HOST+name,
                data: data,
                headers: {
                    "Authorization": "Bearer "+ token,
                }
            })
        else
            return axios({
                method: 'post',
                url: HOST+name,
                data: data
            })
    }
    static put(name, data, auth=true){
        const token = window.localStorage.getItem("accessToken")
        if(auth){
            return axios({
                method: "put",
                url: HOST + name,
                data: data,
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
        }else{
            return axios({
                method: "put",
                url: HOST + name,
                data: data,
            })
        }
        
    }
    static delete(name){
        const token = window.localStorage.getItem("accessToken")
        return axios({
            method: "delete",
            url: HOST + name,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }
    static signout(){
        const token = window.localStorage.getItem("accessToken")
        return axios({
            method: "post",
            url: HOST + "auth/signout",
            headers: {
                "Authorization": "Bearer "+ token,
            }
        })
    }
}