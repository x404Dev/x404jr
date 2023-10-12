import { Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import EasyCommand from "./structure/EasyCommand";
import CommandManagers from "./managers/CommandManagers";
import EasyClient from "./structure/EasyClient";
dotenv.config();

const client = new EasyClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const commands: Collection<string, any> = new Collection<string, EasyCommand>();

//Register Commands
const commandsPath = path.join(__dirname, "./commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));
for (const file of commandFiles) {
  const cmdDir = path.join(commandsPath, file);
  const command = new (require(cmdDir).default)();
  commands.set(command.slashCommand.name, command);
}


//Event Handling
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN).then(() => {
    client.commandsManager.publishCommands(commands);
});

export default client;