'use strict';
const Discord = require("discord.js");
const WOKcommands = require('wokcommands');
const { GiveawaysManager } = require('discord-giveaways');
const ticketSystem = require('djs-ticketsystem');
const { token , ytAPIKey, channelId} = require("./config.json");
const message = require("./events/guild/message");

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.music = require('discord.js-musicbot-v2');

//client.music.start(client, {
  //  youtubeKey: ytAPIKey
//});

//This is having errors. Maybe make function?
const updateMembers = guild => {
  const channel = guild.channels.cache.get(channelId);
  channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
}

client.on('guildMemberAdd', (member) => updateMembers(member.guild));
client.on(`guildMemberRemove`, (member) => updateMembers(member.guild));
//client.on(`ready`, () => updateMembers('704075878832930887')); 


//Giveaway manager--

// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        reaction: '🎉'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;



//Nzc5NTA5NjQ2MTc1NjMzNDMw.X7hk7g.vjH0Vs5qPonyt1cnNdE76cP8O1U
//ODA2MjUxOTc4NjM1NzM5MTk2.YBmuqw.-aY8rrgXBYE1Gf0x7OdOZVM0Mu0
client.login("ODA2MjUxOTc4NjM1NzM5MTk2.YBmuqw.-aY8rrgXBYE1Gf0x7OdOZVM0Mu0");

