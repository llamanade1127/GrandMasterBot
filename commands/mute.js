
//TODO: Need to add prefix and main and mute roles to config

module.exports = {
    name: "kick",
    description: "kicks someone",
    args:'1: -t TIME for time, 2: -s for silent 3: -r REASON',
    example: `!kick -t 20 -r Was toxic`,
    async execute(message,args){
        if(args[0]) return message.reply("Must have a person to ban!");
        
        const {member, mentions} = message;

        const tag = `<@${member.id}>`;
        var timed = false;
        var time = 0;
        var silent = true;
        var reasonB = false;
        var reason = "";
        
        for(var i = 0; i < args.length; i++){
            if(args[i] == '-t'){
                timed = true;
                if(isNan(args[i+1])) return message.reply("The lenght for time must be a whole number!") 
                time = args[i+1];
            } else if(args[i] == '-s'){
                silent = false;
            } else if(args[i] == '-r'){
                if(args[i+1]){
                    reason += args[i+1];
                } else return message.reply('Must input a reason for -r');
            }
        }

        let mainRole = message.guild.roles.cache.find(role => role.name === "member");
        let muteRole = message.guild.roles.cahce.find(role => role.name === 'mute');

        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('MUTE_MEMBERS')){
            const target = mentions.user.first();
            if(target){
                const targetMember = message.guild.members.cache.get(target.id);
                //gets the main roles
                targetMember.roles.remove(mainRole.id);
                targetMember.roles.add(muteRole.id);
                if(!silent){
                    if(reasonB){
                        if(timed){
                            message.channel.send(`<@${targetMember.id}> has been muted for ${time} seconds because ${reason}!`);
                        } else{
                            message.channel.send(`<@${targetMember.id}> has been muted because ${reason}!`);
                        }   
                    }
                    message.channel.send(`<@${targetMember.id}> has been muted!`);
                }
                if(timed){
                    setTimeout(function() {
                        targetMember.roles.remove(muteRole.id);
                        targetMember.roles.add(mainRole.id);
                    }, ms(time));
                }
            } else message.reply('You must put a valid member to kick!');
        } else return message.reply('You do not have the permission to execute this command');
    }
}