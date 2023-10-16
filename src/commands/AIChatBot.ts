import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import EasyCommand from "../structure/EasyCommand";
import EasyEmbed from "../structure/EasyEmbed";
import Module from "../configs/modules";
import aiChatBotOptions from "../configs/AIChatBot";

export default class AIChatBot extends EasyCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("aichatbot")
        .setDescription("Get infos about the AI Chat Bot")
    );
    this.enabled = Module.AIChatbot;
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    const infoEmbed = new EasyEmbed()
      .setBrandedTitle("AI ChatBot")
      .setDescription("To use the AI ChatBot, just tag me and say something! The AI is powered by OpenAI's `" + aiChatBotOptions.model + "` model.")

    await interaction.reply({ embeds: [infoEmbed] });
  }
}