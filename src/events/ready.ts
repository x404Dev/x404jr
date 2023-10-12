import { Events, Client, PresenceStatus, PresenceStatusData } from 'discord.js'
import BotConfig from '../configs/bot';
import chalk from 'chalk';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {

        const version = require('../../package.json').version;

        const log = console.log;
        log(chalk.blueBright.bold("+") + chalk.greenBright.bold.strikethrough("===") + chalk.blueBright.bold("[") + chalk.yellow.bold(" x404Jr ") + chalk.blueBright.bold("]") + chalk.greenBright.bold.strikethrough("================================================") + chalk.blueBright.bold("+"))
        log(chalk.cyan("  Hey! I am ") + chalk.yellow.bold("x404Jr") + chalk.cyan(" v") + chalk.blue.bold(version) + chalk.cyan("!"))
        log(chalk.cyan("  I am a ") + chalk.yellow.bold("Discord Bot") + chalk.cyan(" made by ") + chalk.yellow.bold("x404") + chalk.cyan(" for fun!"))
        log(chalk.cyan("  I am currently in ") + chalk.yellow.bold(client.guilds.cache.size.toString()) + chalk.cyan(" servers!"))
        log(chalk.cyan("  I am currently serving ") + chalk.yellow.bold(client.users.cache.size.toString()) + chalk.cyan(" users!"))
        log(chalk.cyan("  I am currently serving ") + chalk.yellow.bold(client.channels.cache.size.toString()) + chalk.cyan(" channels!"))
        log(chalk.cyan("  Anyways, I better get going! Have a nice day! =D"))
        log(chalk.blueBright.bold("+") + chalk.greenBright.bold.strikethrough("=============================================================") + chalk.blueBright.bold("+"))

        // Set the bot activity and status
        client.user?.setActivity(BotConfig.BOT_ACTIVITY, { type: BotConfig.BOT_ACTIVITY_TYPE });
        client.user?.setStatus(BotConfig.BOT_STATUS as PresenceStatusData);
	},
};