import { Client, Message } from "discord.js";
import { OpenAI } from "openai";
import aiChatBotOptions from "../configs/AIChatBot";

export default class AIChatBot {
  private openai: OpenAI;
  private _client: Client;

  constructor(client: Client) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
    this._client = client;
  }

  public async chat(message: Message): Promise<string> {
    let conversation = [];

    conversation.push({
      role: "system",
      content: aiChatBotOptions.context,
    });

    let prevMessages = await message.channel.messages.fetch({ limit: 10 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== this._client.user!.id) return;
        if (msg.createdAt.getTime() < Date.now() - 120000) return;

        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

        if(msg.author.id === this._client.user!.id) {
            conversation.push({
                name: username,
                role: "assistant",
                content: msg.content.replace(`<@${this._client.user!.id}>`, '').trim(),
            });
            return;
        }

        conversation.push({
            name: username,
            role: "user",
            content: msg.content.replace(`<@${this._client.user!.id}>`, '').trim(),
        });
    });

    const response = await this.openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: conversation as any, //Ik it's not the best way to do it but it works :P
      })
      .catch((err) => console.error("OpenAI Error: \n" + err));

    return response
      ? response.choices[0].message.content!
      : "Sorry, I can't answer to that :(";
  }
}
