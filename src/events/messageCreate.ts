import { Events, Message } from 'discord.js'
import Modules from '../configs/modules';
import client from '../index';

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(message: Message) {
        if(message.author.bot) return;
        //AI Chatbot
        if(message.content.startsWith(`<@${client.user!.id}>`) && Modules.AIChatbot) {
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