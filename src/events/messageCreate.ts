import { ChannelType, Events, Message } from 'discord.js'
import Modules from '../configs/modules';
import client from '../index';
import aiChatBotOptions from '../configs/AIChatBot';

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(message: Message) {
        if(message.author.bot) return;
        //AI Chatbot
        if(message.content.startsWith(`<@${client.user!.id}>`) && Modules.AIChatbot) {
            if (aiChatBotOptions.whitelistChannelsID.length > 0 && !aiChatBotOptions.whitelistChannelsID.includes(message.channel.id)) return;
            if (aiChatBotOptions.blacklistChannelsID.length > 0 && aiChatBotOptions.blacklistChannelsID.includes(message.channel.id)) return;
            if (!aiChatBotOptions.enableDM && message.channel.type != ChannelType.GuildText) {
                return message.reply("Sorry, but I can't answer in DMs! I want to but I can't! :(");
            };

            await message.channel.sendTyping();

            const sendTypingInterval = setInterval(async () => {
                await message.channel.sendTyping();
            }, 5000);

            const response = await client.aiChatBot!.chat(message);
            clearInterval(sendTypingInterval);

            const chunkSize = 2000;

            for (let i = 0; i < response.length; i += chunkSize) {
                const chunk = response.substring(i, i + chunkSize);

                await message.reply(chunk);
            }
        }
	},
};