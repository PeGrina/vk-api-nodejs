// index.js
'use strict';
class VkCLientApi{
    constructor(version){
        this.version = version;
        this.uri = 'https://api.vk.com/method/';
        this.response = "";
    }
    http_build_query( formdata, numeric_prefix, arg_separator ) {	// Generate URL-encoded query string
        var key, use_val, use_key, i = 0, tmp_arr = [];
    
        if(!arg_separator){
            arg_separator = '&';
        }
    
        for(key in formdata){
            use_key = escape(key);
            use_val = escape((formdata[key].toString()));
            use_val = use_val.replace(/%20/g, '+');
    
            if(numeric_prefix && !isNaN(key)){
                use_key = numeric_prefix + i;
            }
            tmp_arr[i] = use_key + '=' + use_val;
            i++;
        }
    
        return tmp_arr.join(arg_separator);
    }   
    async request(method_name, access_token, parameters){
        const axios = require('axios');
        parameters = this.http_build_query(parameters, '', '&');
        let url = this.uri + `${method_name}?${parameters}&access_token=${access_token}&v=${this.version}`;
        var res = "";
        await axios.post(url)
        .then((response)=>{
            res = response.data;
        });
        return new Promise((resolve, reject) => {
            resolve(res);
        });  
    }
} 
module.exports = VkCLientApi;
