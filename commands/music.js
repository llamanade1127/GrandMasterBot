const { execute } = require("./mute");
const Discord = require('discord.js');
const {prefix} = require('../config.json');
/*
<Music>.playFunction();   // PLAY command.
<Music>.helpFunction();   // HELP command.
<Music>.queueFunction();  // QUEUE command.
<Music>.npFunction();     // NOWPLAYING command.
<Music>.loopFunction();   // LOOP command.
<Music>.skipFunction();   // SKIP command.
<Music>.pauseFunction();  // PAUSE command.
<Music>.resumeFunction(); // RESUME command.
<Music>.clearFunction();  // CLEARQUEUE command.
<Music>.leaveFunction();  // LEAVE command.
<Music>.searchFunction(); // SEARCH command.
<Music>.volumeFunction(); // VOLUME command.
<Music>.removeFunction(); // REMOVE command.
*/
module.exports = {
    name: "Music",
    description: "Is used to play music. Use !music help for more info",
    minArgs: 1,
    maxArgs: 3,
    async execute({message, client, args, text}){
        var command = args[0];
        var errEmbed = new Discord.MessageEmbed().setTitle("Error running command!").setDescription(`There was a problem running the command ${args[0]}`);
        var suffix = text.substring(prefix.length + command.length).trim();
        switch(command){
            case 'play':
                if(typeof args[1] != 'undefined') {
                    return message.reply({embed:errEmbed});
                } 
                client.music.bot.playFunction(message, suffix);
            break;
            case 'np':
                client.music.bot.npFunction(message,suffix);
            break;
            case 'queue':
                client.music.bot.queueFunction(message, suffix);
            break;
            case 'loop':
                client.music.bot.queueFunction(message, suffix);
            break;
            case 'skip':
                client.music.bot.skipFunction(message, suffix);
            break;
            case 'pause':
                client.music.bot.pauseFunction(message, suffix);
            break;
            case 'resume':
                client.music.bot.resumeFunction(message, suffix);
            break;
            case 'clear':
                client.music.bot.clearFunction(message, suffix);
            break;
            case 'leave':
                client.music.bot.leaveFunction(message, suffix);
            break;
            case 'search':
                client.music.bot.searchFunction(message, suffix);
            break;
            case 'volume':
                client.music.bot.volumeFunction(message, suffix);
            break;
            case 'remove':
                client.music.bot.removeFunction(message, suffix);
            break;
        }
    }
    
}