const fetchStatus = require('rockstar-games-status');
const Discord = require('discord.js');
const updateChannel = require('../config.json');
module.exports = (client) => {
    function startPoint() {
        function sendUpdate() {
            fetchStatus().then((statuses) => {
                var statusArr = [
                    ['RedDead Online','pc', 'xboxOne', 'ps4', 'stadia'],
                    ["GTA 5",'pc', 'xboxOne', 'xbox360', 'ps3', 'ps4'],
                    ["Social Club", 'all'],
                    ["Launcher",'authentication','store','cloud','downloads']
                ]
                var sendembed = new Discord.MessageEmbed().setTitle("Rockstar Service");

                for(i = 0; i < statusArr.length; i++){
                    for(x = 1; x < statusArr[i].length; x++){
                        sendembed.addField(`${statusArr[i][0]} ${statuses[i][x]} Status: `, `${returnStatus(sendembed[i][0], sendembed[i][x], statuses)}`);
 
                    }
                }
                var channel = client.channels.cache.find(channel => channel.id === "795853712387735563");
                channel.send({embed: sendEmbed}).then(msg => {msg.delete({timeout: 60000})});
             
            });
        }

        function returnStatus(game, type, statuses){
            var online = '🟢';
            var offline = '🔴';
            switch(game){
                case 'RedDead Online':
                    switch(type){
                        case 'pc':    
                            var status = statuses.redDedOnline.pc;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'xboxOne':
                            var status = statuses.redDedOnline.xboxOne;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'ps4':
                            var status = statuses.redDedOnline.ps4;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'stadia':
                            var status = statuses.redDedOnline.stadia;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                    }
                    break;
                case "GTA 5":
                    switch(type){
                        case 'pc':    
                            var status = statuses.gtao.pc;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'xboxOne':
                            var status = statuses.gtao.xboxOne;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'ps4':
                            var status = statuses.gtao.ps4;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'ps3':
                            var status = statuses.gtao.ps3;
                            if(status){
                                return online;
                            } else{
                                return offline
                            }
                        case 'xbox360':
                            var status = statuses.gtao.xbox360;
                            if(status){
                                return online;
                            } else{
                                 return offline
                            }
                    }
                break;
                case "Social Club":
                    if(statuses.socialClub.all){
                        return online;
                    } else{
                        return offline;
                    }
                break;
                case "Launcher":
                    switch(type){
                        case 'authentication':
                            var status = statuses.launcher.authentication;
                            if(status){
                                return online;
                            } else{
                                 return offline
                            }
                        case 'store':
                            var status = statuses.launcher.store;
                            if(status){
                                return online;
                            } else{
                                 return offline
                            }
                        case 'cloud':
                            var status = statuses.launcher.cloud;
                            if(status){
                                return online;
                            } else{
                                 return offline
                            }
                        case 'downloads':
                            var status = statuses.launcher.downloads;
                            if(status){
                                return online;
                            } else{
                                 return offline
                            }
                    }
                    break;
                
            }
        }

        setInterval(sendUpdate(), 60000);
    }

    startPoint();
}