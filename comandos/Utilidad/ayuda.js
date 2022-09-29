const Discord = require("discord.js")
module.exports = {  
name: "ayuda", // importante ponerle nombre al comando
alias: [], // se le puede añadir más nombres

run: async (client, message, args) => {

message.channel.send("Si necesitas ayuda habla con mi creador Ranger#1316")

}


}
