// Archivo principal

const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const fs = require("fs")

//////////////////////////////// Handler Comandos /////////////////////////////
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./comandos").filter(file => file.endsWith(".js"))
const utilidad = fs.readdirSync("./comandos/Utilidad").filter(file => file.endsWith(".js")) // Añadir esto si añadimos más secciones en la carpeta comandos


for (const file of commandFiles){
const command = require(`./comandos/${file}`)
client.commands.set(command.name, command)
}

for(const file of utilidad){ // Añadir esto cada vez que hagamos más secciones en nuestra carpeta comandos (Ejemplo: nsfw, diversion, etc)
const command = require(`./comandos/Utilidad/${file}`)
client.commands.set(command.name, command)
}




//////////////////////////////// Handler Eventos /////////////////////////////
for(const file of fs.readdirSync("./eventos")){
if(file.endsWith(".js")){
let fileName = file.substring(0, file.length -3)
let fileContents = require(`./eventos/${file}`)
client.on(fileName, fileContents.bind(null, client))
}
}


client.login("TOKEN")
