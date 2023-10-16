interface AIChatBotOptions {
    context: string,
    model: string,
    whitelistChannelsID: string[],
    blacklistChannelsID: string[],
    enableDM: boolean,
}

const aiChatBotOptions: AIChatBotOptions = {
    context: "You are x404Jr, x404's AI pet. You like using irony and sarcasm to roast everyone!", //Context to feed to gpt-3, use this to define how the bot should respond
    model: "gpt-3.5-turbo", //check https://platform.openai.com/docs/models/overview for more info || GPT-3.5-turbo is good, cost-effective and still gives good responses
    whitelistChannelsID: [],
    blacklistChannelsID: [],
    enableDM: false,
}

export default aiChatBotOptions;