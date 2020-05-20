'use strict';
let token = "0493e38904d32274867fb68957e5e3bc8a90914a9fc563ae8303ba7a7c740e19a3f5a5cc92db6809b8c02";
let VK = require("./index.js");
let lp = require("./Methods/Longpoll")
const vk = new VK(token);
const longpoll = new lp(token); 
longpoll.tune(184087023);
longpoll.listen();
