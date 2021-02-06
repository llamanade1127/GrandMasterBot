const { execute } = require("./ban");

module.exports = {
    name: "giveaway",
    minArgs: 2,
    description: "Starts a giveaway!",
    async execute({message, client, args}) {
        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(' '),
            winnerCount: parseInt(args[1])
        }).then((gData) => {
            console.log(gData); // {...} (messageid, end date and more)
        });
    }
}