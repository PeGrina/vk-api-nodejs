// Longpoll.js
'use strict';

const vk = require('../index.js');
class Longpoll extends vk.VkCLientApi{
    constructor(version = "5.103", access_token){
        super();
        this.version = version;
        this.access_token = access_token;
    }
    async tune(group_id){
        var server = "";
        await this.reqeust("groups.getLongPollServer", this.access_token,{group_id}).then((response)=>{
            if(typeof response == "string"){
                response = JSON.parse(response);
            }
            response = response.response;
            server = `${response.server}?act=a_check&key=${response.key}&ts=${response.ts}&wait=25`;
        });
        return new Promise((resolve, reject)=>{
            resolve(server);
        });
    }
    async listen(on){
        const axios = require('axios');
        await this.tune().then(async (url) => {
            let polling = setInterval(async ()=>{
                await axios.get().then(async (response)=>{
                    if(typeof response == "string"){
                        response = JSON.parse(response);
                    }
                    let ts = response.ts;
                    let updates = response.updates;
                    let last_mess = updates[updates.length-1];
                    console.log(updates);
                });
            },1000);
        });
    }
} 
module.exports = Longpoll;