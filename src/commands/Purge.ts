import { BaseGuildTextChannel, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import EasyCommand from "../structure/EasyCommand";
import EasyEmbed from "../structure/EasyEmbed";

export default class PurgeCommand extends EasyCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge a certain amount of messages")
        .addIntegerOption(option => option.setName("amount").setDescription("The amount of messages to purge").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false)
    );
  }

public async execute(interaction: ChatInputCommandInteraction) {

    interaction.deferReply({ ephemeral: true });

    const amount = interaction.options.getInteger("amount");

    if (amount! > 100) {
        return await interaction.editReply({ content: "You can't purge more than 100 messages at once!" });
    }

    if (amount! < 1) {
        return await interaction.editReply({ content: "You can't purge less than 1 message!" });
    }

    if (interaction.channel && interaction.channel.type === ChannelType.GuildText) {
        await (interaction.channel as BaseGuildTextChannel).bulkDelete(amount!);
    } else {
        return await interaction.editReply({ content: "This command can only be used in a server text channel!" });
    }

    const successEmbed = new EasyEmbed()
        .setBrandedTitle("Purge")
        .setDescription(`Successfully purged ${amount} messages!`)
    
    await interaction.editReply({ embeds: [successEmbed] });
}
}