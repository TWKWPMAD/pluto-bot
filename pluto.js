// file system
var fs = require('fs');

// JSONs
var auth = require('./auth.json');
var package = require('./package.json');

//var suggests;
//embedsNErrors = require('./embeds.json');

// external js
var ch;
var c;
var pt;
var sch;
//var snatch;
//var sh;

// js storage
var embeds;

// discord.js setup
const Discord = require('discord.js');
const client = new Discord.Client();

// login
client.login(auth.token);

// startup
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);

    // file system
    fs = require('fs');
    package = require('./package.json');
    auth = require('./auth.json');

    // external js
    ch = require('./handling/commandHandler');
    snh = require('./handling/commands/snatchHandler.js');
    c = require('./captcha/captcha.js');
    pt = require('./misc/piTime.js');
    //sch = require('./misc/secnytHandling');
    //snatch = require('./snatch.js');
    //sh = require('./suggestionHandling.js');

    // js storage
    embeds = require('./storage/constants/embeds.js')
});

// on message
client.on('message', msg => {
    //c.test(msg, client);
    // if bot, don't allow
    if(msg.channel.type == 'text'){
        if(!msg.author.bot){
            // if the message starts with the prefix
            if(msg.content.startsWith(package.prefix)){
                ch.handleP(msg, client);
                
            }
            if(msg.content.startsWith("/")){
                ch.handleS(msg, client);
            }
        }
    }
    if(msg.channel.id == '697952569405735014' && !msg.author.bot){
        sch = require('./misc/secnytHandling');
        sch.handle(msg, client);
    }
});



// custom error messages
const errors = {
    NAP: function(msg){
        msg.channel.send(`I don't understand any of your arguments!`);
    },
    NP: function(msg){
        msg.channel.send(`You don't have acceptable arguments!`);
    },
    CS: function(msg){
        msg.channel.send(`This functionality is coming soon! Try me later!`);
    },
    TMP: function(msg){
        msg.channel.send(`You have too many necessary flags! You need one, and only one.`);
    }
};

var stuff = {
    er: errors
};

module.exports = stuff;

//setInterval(pt.checkTime(client), 1000);