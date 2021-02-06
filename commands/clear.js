const message = require("../events/guild/message")

module.exports = {
    name: 'clear',
    description: 'Clears messages',
    minArgs: 1,
    maxArgs: 1,
    async execute({message, args}){
        if(!args[0]) return message.reply("Please enter ammount of messages you want to delete.");
        if(typeof parseInt(args[0]) != 'number')return message.reply("Please enter a real number!");

        if(args[0] > 100) return message.reply("Must be less than 100 messages");
        if(args[0] < 1) return message.reply("Must be more than 1");

        message.channel.messages.fetch({Limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    },
    permissions:['ADMINISTRATOR']
}