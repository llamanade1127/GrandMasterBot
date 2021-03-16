const ticketSystem = require('djs-ticketsystem');
const { Client } = require('discord.js');

const client = new Client();

client.on('ready', () => console.log('Online!'));

client.on('message', message => {
    if (message.content == '-ticket') {
        message.guild.createTicket({ owner: message.author })
            .catch(console.error);
    };
    if(message.content == '-close' &&  message.channel.isTicket()){
        message.channel.delete();
    }
});

client.login("Nzc5NTA5NjQ2MTc1NjMzNDMw.X7hk7g.vjH0Vs5qPonyt1cnNdE76cP8O1U");