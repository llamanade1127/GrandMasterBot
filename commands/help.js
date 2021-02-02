const { execute } = require("./clear");

module.exports = {
    name: "help",
    description: "help",
    async execute(client, message, args, Discord){
        for(i = 0; i < client.commands.length; i++){
            var name = client.commands[i].name;
            var description = client.commands[i].description;
        }
    }
}