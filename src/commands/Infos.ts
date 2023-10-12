import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import EasyCommand from "../structure/EasyCommand";
import client from "../index";
import EasyEmbed from "../structure/EasyEmbed";
import BotConfig from "../configs/bot";

export default class InfoCommand extends EasyCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("infos")
        .setDescription("Get infos about the bot")
    );
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    const infoEmbed = new EasyEmbed()
      .setBrandedTitle("Infos")
      .setDescription("Hi hi! I'm **" + BotConfig.BOT_NAME + "**, a bot made by *x404*. I'm made with `discord.js` and `typescript`. I'm __open source__, you can find my code: [here](https://github.com/x404Dev/x404jr). I hope you have a great day =D")

    await interaction.reply({ embeds: [infoEmbed] });
  }
}