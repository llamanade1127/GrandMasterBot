

const fs = require('fs');
const Discord = require("discord.js");
var check = '';
let registered = false;

const registerEvents = (client, channelId) => {
    if(registered) return;

    registered = true;

    client.on('messageReactionAdd', (reaction, user) => {
        if(user.bot) return;
        const {message} = reaction;
        if(message.channel.id == channelId){
            message.delete();
        }
    });
};

module.exports = {
    name: "ticket",
    description: "Creates a support ticket",
    minArgs: 1,
    async execute(messege, args, client) {
        if(!args[0]) messege.reply("Please input a reason for this ticket!");

        var reason = "";
        for(var i = 0; i < args.length; i++){
            reason += args[i];
        }

        var server = message.guild;
        var name = getCurrentTickets();

        var ticketChannel = server.createChannel(name, "text");

        var sendEmbed = new Discord.MessageEmbed().setTitle(`New ticket created by ${message.author.tag}.`).setDescription("Reason: ", reason).setFooter("Please react to close the ticket");

        var message = ticketChannel.send({embed: sendEmbed}).then((message) => {
            message.react(check);
            registerEvents(client, ticketChannel);
            message.author.send("Your ticket has been sent! A reply should come soon!");
        });

        message.addReaction()
    }
}

function getCurrentTickets(){
    fs.readFile('../config.json', (error, data) => {
        var jsonData = JSON.parse(data);

        var current = jsonData.currentTickets;

        jsonData.currentTickets++;

        fs.writeFile('../config.json', JSON.stringify(jsonData, null, 4), (err) =>{
            if(err) return console.error(err);
        });

        return current;
    });
}
