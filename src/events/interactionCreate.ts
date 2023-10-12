import { BaseInteraction, CommandInteraction, Events } from "discord.js";
import EasyClient from "../structure/EasyClient";
import client from "../index";


module.exports = {
	name: Events.InteractionCreate,
	once: false,
	execute(interaction: BaseInteraction) {
        if(interaction.isCommand()) {
            client.commandsManager.executeCommand(interaction as CommandInteraction);
          }
	},
};