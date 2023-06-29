import { connect } from "mqtt"
import consola from "consola"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
consola.withTag


let client = connect({
  host: process.env.MQTT_HOST,
  port: parseInt(process.env.MQTT_PORT as string),
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  protocol: 'mqtt',
})

client.on('connect', () => {
  console.log('Connected');
  client.subscribe('#', (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on('message', (topic, message) => { 
  message = message.toString()
  // console.log("This is topic: ",topic)
  // console.log("This is message: ",message)


  //Tasmota discovery is 
  if ( (topic.startsWith('tasmota/discovery')) && (topic.endsWith('config')) ) {
    const data = JSON.parse(message)

    // console.log('Raw data: ',data)

    if(data.dn === 'WASHPOINT'){
      console.log("Device Name: ",data.dn)
      console.log("Family Name: ",data.fn[0])
      console.log("Hardware: ",data.hn)
      console.log("Model: ",data.md)
      console.log("Firmware: ",data.sw)
      console.log("Mac: ", data.mac)
      console.log("IP Address: ",data.ip)
      console.log("Topic: ",data.t)
      console.log("\n")
    }
  }  


  if ( (topic.startsWith('rgh18/stat/')) && (topic.endsWith('STATUS8')) ) {
    const data = JSON.parse(message)
    console.log("This is stat: ",data)    
  }

  if( (topic.startsWith('rgh18/tele/')) && (topic.endsWith('SENSOR')) ) {
      // if(!topic.endsWith('LWT')){
      //   const data = JSON.parse(message);
      //   console.log("This is tele: ",data)
      // }
      const data = JSON.parse(message);
      console.log("This is tele: ",data)

      const mac = topic.split('/')[2]
      const ttime = data.Time
      const voltage = data.ENERGY.Voltage
      const current = data.ENERGY.Current

      console.log(ttime, mac, voltage, current)
  }
});

export function useMqtt() {
  return { client, connect }
}
