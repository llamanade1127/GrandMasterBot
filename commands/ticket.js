const { execute } = require("./kick");
const ticketSystem = require('djs-ticketsystem');
const {supportTeam} = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "create",
    description: "Creates a support ticket",
    async execute({message, client, author, args,woCommand, text, prefix}){
        let supportRole = message.guild.roles.cache.get(supportTeam);
        message.delete();
        const startEmbed = new Discord.MessageEmbed().setTitle("Support Ticket!").setDescription(`User: ${author} \n\n English: Thank you for contacting our support team! ${supportRole} will be ready to assist you as soon as possible. In the meantime, please describe your issue as clear as possible. \n\n Your reason was: ${text.slice(prefix.length)}`)
        message.guild.createTicket({owner: message.author, reason: woCommand,openMessage:{embed:startEmbed}})
            .catch(console.error);
        console.log('New ticket created');
        client.on('message', newMessage => {
            if(newMessage.content == 'close' && newMessage.author.id == author.id){
                console.log('here');
                if(newMessage.channel.isTicket()){
                    newMessage.channel.delete();
                }
            }
        });
    }
}