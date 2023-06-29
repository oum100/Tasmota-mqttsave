import { connect } from "mqtt";
import { PrismaClient } from "@prisma/client";
import { Console } from "console";


const prisma = new PrismaClient();

const enableFlag = useRuntimeConfig().enableFlag

console.log('This is the index.js file in the api folder')
console.log('Connecting to FLIPUP mqtt broker')


let client = connect({
    host: process.env.MQTT_HOST,
    port: parseInt(process.env.MQTT_PORT as string),
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    protocol: 'mqtt',
})




client.on('connect', () => {
    console.log('Flipup mqtt broker connected');

    client.subscribe('#', (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', async(topic, message) => { 
    // if(!topic.endsWith('LWT')){
    //     message = JSON.parse(message.toString())
    //     console.log("This is topic: ",topic)
    //     console.log("This is message: ",message)
    // }

    if(enableFlag == 'true'){
        if (topic === 'rgh18/tele/rgh18_24D7EB116898/SENSOR') {
            let device = topic.split('/')[2]
            let type = topic.split('/')[3]
            device = device.split('_')[1]
            console.log("This is device: ",device)
            message = JSON.parse(message.toString())
            console.log('Received topic ', topic);
            // console.log('Message: ', message);
    
            // console.log("DateTime: ",message.StatusSNS.Time );
            // console.log("Volatage: ",message.StatusSNS.ENERGY.Voltage);
            // console.log("Current: ",message.StatusSNS.ENERGY.Current);
    
            const devInfo = {
                Type: type,
                Device: device,
                DateTime: message.Time,
                Voltage: message.ENERGY.Voltage,
                Current: message.ENERGY.Current
            }
            // console.log("devInfo: ",devInfo)
    
            const data = await prisma.energy
            .create({
                data:devInfo
            })
            .catch(async(err) => {
                throw(err)
            })
    
            console.log("Save this: ",data)
        }
    
            
        if (topic === 'rgh18/stat/rgh18_24D7EB116898/STATUS8') {
            let device = topic.split('/')[2]
            let type = topic.split('/')[3]
            device = device.split('_')[1]
            console.log("This is device: ",device)
            message = JSON.parse(message.toString())
            console.log('Received topic ', topic);
            // console.log('Message: ', message);
    
            // console.log("DateTime: ",message.StatusSNS.Time );
            // console.log("Volatage: ",message.StatusSNS.ENERGY.Voltage);
            // console.log("Current: ",message.StatusSNS.ENERGY.Current);
    
            const devInfo = {
                Type: type,
                Device: device,
                DateTime: message.StatusSNS.Time,
                Voltage: message.StatusSNS.ENERGY.Voltage,
                Current: message.StatusSNS.ENERGY.Current
            }
            // console.log("devInfo: ",devInfo)
    
            const data = await prisma.energy
            .create({
                data:devInfo
            })
            .catch(async(err) => {
                throw(err)
            })
    
            console.log("Save this: ",data)
        }  
    }
  
})



