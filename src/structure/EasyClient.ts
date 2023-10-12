import { Client, ClientOptions } from "discord.js";
import CommandManagers from "../managers/CommandManagers";

export default class EasyClient extends Client {
    public readonly commandsManager: CommandManagers = new CommandManagers(this);
    constructor(options: ClientOptions) {
        super(options);
        
      }
}