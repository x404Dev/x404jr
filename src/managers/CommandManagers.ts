import { Client, Collection, CommandInteraction, REST, Routes } from "discord.js";
import EasyCommand from "../structure/EasyCommand";
import chalk from "chalk";

export default class CommandManagers {
  private readonly _client: Client;
  private commands: Collection<string, any>;

  constructor(client: Client) {
    this._client = client;
    this.commands = new Collection<string, EasyCommand>();
  }

  public publishCommands(commands: Collection<string, EasyCommand>) {
    if(commands.size === 0) return console.log(chalk.yellow.bold("x404Jr") + chalk.blue.bold(":") + chalk.redBright(" No commands to publish!"))
    this.commands = commands;
    const rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN!
    );

    try {
      console.log(chalk.yellow.bold("x404Jr") + chalk.blue.bold(":") + chalk.cyan(" Started refreshing application (/) commands."))

      // Register global commands
      const globalCommandsData = rest.put(
        Routes.applicationCommands(process.env.DISCORD_APP_ID!),
        { body: commands.map((command) => command.toJSON()) }
      );
      console.log(chalk.yellow.bold("x404Jr") + chalk.blue.bold(":") + chalk.cyan(" Successfully reloaded ") + chalk.yellow.bold(commands.size.toString()) + chalk.cyan(" (/) commands! =D"))
    } catch (error) {
      console.error(error);
    }
  }
  public executeCommand(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
