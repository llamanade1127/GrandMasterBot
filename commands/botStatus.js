const { execute } = require("./ban");

module.exports = {
   name:'botstatus',
   description: 'Changes the bot status',
   minArgs: 1,
   async execute({text, client, command, prefix}){
       var newStatus = text.substrin(command.length + prefix.length, text.length);

       client.user.setActivity(newStatus); 
   } 
}