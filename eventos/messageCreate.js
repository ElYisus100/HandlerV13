// copia la Estructura de Eventos cada vez que quieras poner un nuevo evento en tu codigo

const prefix = "/";
module.exports = async (client, message) => {
  
if(message.author.bot)return;
if(message.channel.type == "DM")return;

  
if(!message.content.startsWith(prefix))return;
const args = message.content.slice(prefix.length).trim().split(/ +/g); 
const command = args.shift().toLowerCase()

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command))
if(cmd)cmd.run(client, message, args)
  
}
