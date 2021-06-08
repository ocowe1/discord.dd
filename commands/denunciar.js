const fs = require("fs");
const { Client } = require('discord.js')
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })


module.exports = (client, message, user, args) => {

    const getEmoji = (emojiName) =>
        client.emoji.cache.find((emoji) => emoji.name === emojiName)

    const emojis = {
        Positivo: 'white_check_mark',
        Negativo: 'negative_squared_cross_mark'
    }    

    const reactions = []

    let emojiText = `Olá, ${message.author.username} sinto muito que precise utilizar o sistema de denuncia.\n\n- Para realizar sua denuncia, você precisará entrar no canal de voz de [denuncia] que será habilitado a você após reagir a esta mensagem.\n- Ao entrar no canal envie o comando [iniciar] no chat para que o bot entre, após ele entrar, ele irá iniciar a gravação e só irá parar após você se desconectar.\n- Após finalizar a gravação, todas as mensagens deste canal serão deletadas e sua denuncia será enviada para a equipe que irá analizar o caso.\n\nAgradecemos o contato e esperamos ajudar.`
    for (const key in emojis){
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelId, emojiText, reactions) 

    const handleReaction = (reaction, user, add) => {
        if(user.id === '850397048812994570') return
        const emoji = reaction._emoji.name
        const { guild } = reaction.message
        const roleName = '838096434057838602'
        if(!roleName)return
        const role = guild.roles.cache.find()
        const member = guild.members.cache.find(member => member.id === user.id)

        if(add){
            member.roles.add(role)
        }else{
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        handleReaction(reaction, user, true)
    })

    client.on('messageReactionRemove', (reaction, user) => {
        handleReaction(reaction, user, false)
    })

}

module.exports.help = {
    name: "denunciar"
};