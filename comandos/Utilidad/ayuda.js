// copia la Estructura de comandos cada vez que quieras hacer un nuevo comando

const Discord = require("discord.js")
module.exports = {  
name: "ayuda", // importante ponerle nombre al comando
alias: ["help", "comandos", "commands"], // se le puede añadir más nombres

run: async (client, message, args) => {

    const prefix = "jc!"
    const texto = "Si falla algún comando no dudes en reportarlo con /reportar-bug"
    const emoji_ban = client.emojis.cache.get("732771558371885138")
    const imagen_user = message.author.displayAvatarURL({format: "png", dynamic: true})
    const imagen_bot = client.user.displayAvatarURL({format: "png", dynamic: true})
    const opciones = 1;

    //////////////////////////////////// BOTONES //////////////////////////////////////////

    const botones = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setLabel("Servidor de Soporte")
        .setStyle("LINK")
        .setURL("https://discord.gg/G2Px8pM2AJ"),
        new Discord.MessageButton()
        .setLabel("Bot invitación")
        .setStyle("LINK")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=745542815769165925&permissions=8&scope=bot%20applications.commands")
    )


     ///////////////////////////////////// EMBEDS ////////////////////////////////////////////

    const embed_principal = new Discord.MessageEmbed()
    .setAuthor("Menú de ayuda", imagen_user)
    .setDescription(`Selecciona una opción del menú para ver mis comandos:\n\n :joy: **-Diversion**\n\n${emoji_ban} **-Administración**\n\n :underage: **-NSFW**\n\n :robot: **-Comandos de Barra**`)
    .setColor("LUMINOUS_VIVID_PINK")
    .setFooter(texto)


    const apartado_admin = new Discord.MessageEmbed()
    .setAuthor("Apartado de Administración", imagen_user)
    .setDescription(`A continuación te muestro mis comandos para administradores:\n\n**__${prefix}apodo__**\nCambia el apodo de algún usuario\n\n**__${prefix}encuesta__**\nCrea una encuesta o votación\n\n**__${prefix}prefix__**\nCambia mi prefix en este servidor`)
    .setColor("LUMINOUS_VIVID_PINK")
    .setThumbnail(imagen_bot)
    .setFooter(texto)


    const apartado_diversion = new Discord.MessageEmbed()
    .setAuthor("Apartado de Diversión", imagen_user)
    .setDescription(`A continuación te muestro mis comandos divertidos:\n\n**__${prefix}ppt__**\nJuega piedra, papel o tijera con otro usuario`)
    .setColor("LUMINOUS_VIVID_PINK")
    .setThumbnail(imagen_bot)
    .setFooter(texto)


    const apartado_nsfw = new Discord.MessageEmbed()
    .setAuthor("Apartado NSFW", imagen_user)
    .setDescription("A continuación te muestro mis comandos NSFW:\n\n`"+prefix+"anal` `"+prefix+"ass` `"+prefix+"boobs` `"+prefix+"erokemo` `"+prefix+"hentai` `"+prefix+"hentaiass` `"+prefix+"kitsune` `"+prefix+"lewd` `"+prefix+"nekofeet` `"+prefix+"nekopussy` `"+prefix+"nekotits` `"+prefix+"pgif` `"+prefix+"pussy`")
    .setColor("LUMINOUS_VIVID_PINK")
    .setThumbnail(imagen_bot)
    .setFooter(texto)


    const apartado_slash = new Discord.MessageEmbed()
    .setAuthor("Apartado Comandos de Barra", imagen_user)
    .setDescription("A continuación te muestro mis comandos de barra:\n\n**__/anuncio__**\nEnvío un mensaje/anuncio a cualquier canal del servidor\n\n**__/avatar__**\nMuestra tu avatar o la de otro usuario\n\n**__/decir__**\nMando un mensaje tuyo en el canal donde uses el comando\n\n**__/dm__**\nLe envío un DM a un usuario en especifico")
    .setColor("LUMINOUS_VIVID_PINK")
    .setThumbnail(imagen_bot)
    .setFooter(texto)


    const No_NSFW = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, imagen_user)
    .setDescription("No puedo mostrar estos comandos en un canal que no es NSFW")
    .setColor("RED")


    ///////////////////////////////////// OPCIONES DEL MENU ////////////////////////////////////////////

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
        .setCustomId("1h31djasf91r1419hf")
        .setMaxValues(opciones)
        .addOptions([
            {
                label: "Diversión",
                description: "Presiona aquí para ver mis comandos divertidos",
                value: "Diversión",
                emoji: "😂"
            },
            {
                label: "Administración",
                description: "Presiona aquí para ver mis comandos de administración",
                value: "Administración",
                emoji: "<:banbanban:732771558371885138>"
            },
            {
                label: "NSFW",
                description: "Presiona aquí para ver mis comandos NSFW",
                value: "NSFW",
                emoji: "🔞"
            },
            {
                label: "Comandos de Barra",
                description: "Presiona aquí para ver mis comandos de barra",
                value: "Comandos de Barra",
                emoji: "🤖"
            }
        ])
    )

    const msg = await message.channel.send({embeds: [embed_principal], components: [row, botones]})
    
    const filtro = i => i.user.id === message.author.id

    const colector = msg.createMessageComponentCollector({filter: filtro, time: 180000})

    colector.on("collect", async i => {
        if(i.values[0] === "Diversión"){
            await i.deferUpdate()
            i.editReply({embeds: [apartado_diversion]})
        }
        else if(i.values[0] === "Administración"){
            await i.deferUpdate()
            i.editReply({embeds: [apartado_admin]})
        }
        else if(i.values[0] === "NSFW"){
            if(!message.channel.nsfw){
                await i.deferUpdate()
                i.editReply({embeds: [No_NSFW]})
            }else{
                await i.deferUpdate()
                i.editReply({embeds: [apartado_nsfw]})
            }
        }
        else if(i.values[0] === "Comandos de Barra"){
                await i.deferUpdate()
                i.editReply({embeds: [apartado_slash]})
        }
    });  
  
}


}
