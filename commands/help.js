
const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "help",
    async execute({message, client}){
        var helpEmbed = new Discord.MessageEmbed().setTitle("Help!").setColor(15158332);
        var array = Array.from(client.commands.keys());
        var x = 0;
        for(i = 0; i < array.length; i++){
            var command = client.commands.get(array[i]);
            var name = command.name;
            var description = command.description;
            helpEmbed.addField(`${name} command:`, "``" + `-${description} ` + "``", false);

        }
        helpEmbed.setFooter("If you need anyhelp please create a ticket using !ticket");
        message.reply({embed: helpEmbed});
    }
}