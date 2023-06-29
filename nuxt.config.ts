// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    runtimeConfig:{
        public:{
            mqttHost:   process.env.MQTT_HOST,
            mqttPort:   process.env.MQTT_PORT,
            mqttUser:   process.env.MQTT_USER,
            mqttPass:   process.env.MQTT_PASS,

            enableFlag: process.env.ENABLE_FLAG
        }
        
        
    }
})
