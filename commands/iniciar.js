const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
var toWav = require('audiobuffer-to-wav')
var xhr = require('xhr')
var path = require('path')
var wavConverter = require('wav-converter')

module.exports.run = async (client, message, args) => {

    client.on("voiceStateUpdate", async function (oldMember, newMember) {
        if (oldMember !== null && newMember === null && recordstate === true) {
            writer.end();
        }
    })
    
    
    const voicechannel = message.member.voice.channel
    if (!voicechannel) return message.channel.send('Por favor, entre em um canal de voz antes de iniciarmos!');
    var recordstate = true;
    const connection = await message.member.voice.channel.join();
    const receiver1 = connection.receiver.createStream(message.member, {
        mode: 'pcm',
        end: "manual"
    })


    const idplus = `${message.author.id}-${Date.now()}`
    const writer = await receiver1.pipe(fs.createWriteStream(`./recordings/recorded-${idplus}.pcm`))
    writer.on('finish', async () => {
        await message.channel.send('Eu finalizei a gravação, pois você deixou o canal.');
        var pcmData = fs.readFileSync(path.resolve(`./recordings/recorded-${idplus}.pcm`))
        var wavData = wavConverter.encodeWav(pcmData, {
            numChannels: 1,
            sampleRate: 92000,
            byteRate: 48
        })
        fs.writeFileSync(path.resolve(`./recordings/recorded-${idplus}.wav`), wavData)
        message.channel.send('Aqui está seu arquivo de áudio!')
        await message.channel.send({
            files: [`./recordings/recorded-${idplus}.wav`]
        })
        message.guild.me.voice.channel.leave();
    })

}

module.exports.help = {
    name: "iniciar"
};