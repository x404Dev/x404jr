import { EmbedBuilder } from "discord.js";
import BotConfig from "../configs/bot";
const client = require("../index");

export default class EasyEmbed extends EmbedBuilder {

    constructor() {
        super();
        this.setFooter({
          text: BotConfig.BOT_NAME + " v" + require("../../package.json").version,
          iconURL: client.user?.displayAvatarURL()
        });
        //Convert hex to ColorResolvable
        this.setColor(parseInt(BotConfig.BOT_COLOR.replace("#", ""), 16));
      }

  public setBrandedTitle(title: string): this {
    return this.setTitle(`${title} | ${BotConfig.BOT_NAME}`);
  }
}