import { PrismaClient } from "@prisma/client";
// import Debug from 'debug'
// import { validateAsset } from "~/washpoint/misc/asset";
// import { customAlphabet } from 'nanoid'

// const nanoid = customAlphabet('1234567890ABCDEF', 10)


const prisma = new PrismaClient();
// const debug = Debug('api:asset:add')

export default defineEventHandler( async(event) => {
    const body = await readBody(event)
    console.log(body)
    const track = await prisma.energy
    .create({
        data: {
            Device: body.Device,
            DateTime: body.DateTime,
            Voltage: body.Voltage,
            Current: body.Current
        }
    })
    .catch(async(err) => {
        throw(err)
    })

    return track
    // return body

})