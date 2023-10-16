import { Client, ClientOptions } from "discord.js";
import CommandManagers from "../managers/CommandManagers";
import AIChatBot from "../modules/AIChatBot";
import Modules from "../configs/modules";

export default class EasyClient extends Client {
    public readonly commandsManager: CommandManagers = new CommandManagers(this);
    public readonly aiChatBot: AIChatBot | null;

    constructor(options: ClientOptions) {
        super(options);
        this.aiChatBot = Modules.AIChatbot ? new AIChatBot(this) : null;
      }
}