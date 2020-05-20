'use strict';
let token = proccess.env.TOKEN;
let VK = require("./index.js");
let lp = require("./Methods/Longpoll")
const vk = new VK(token);
const longpoll = new lp(token); 
longpoll.tune(184087023);
longpoll.listen();
