const fs = require("fs");
const { Client } = require('discord.js')
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })


module.exports.run = (client, message, user, args) => {

    message.channel.send(`Olá, ${message.author.username} sinto muito que precise utilizar o sistema de denuncia.\n\n- Para realizar sua denuncia, você precisará entrar no canal de voz de [denuncia] que será habilitado a você após reagir a esta mensagem.\n- Ao entrar no canal envie o comando [iniciar] no chat para que o bot entre, após ele entrar, ele irá iniciar a gravação e só irá parar após você se desconectar.\n- Após finalizar a gravação, todas as mensagens deste canal serão deletadas e sua denuncia será enviada para a equipe que irá analizar o caso.\n\nAgradecemos o contato e esperamos ajudar.`);


}

module.exports.help = {
    name: "denunciar"
};