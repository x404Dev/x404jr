import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export default class EasyCommand {

    public slashCommand: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

    constructor(command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder) {
        this.slashCommand = command;
    }

    public execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    public toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return this.slashCommand.toJSON();
    }

}