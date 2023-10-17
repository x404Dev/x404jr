import { ApiClient, HelixUser } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { Client } from "discord.js";
import chalk from "chalk";

export default class StreamAlerts {

    private readonly _client: Client;

    private _twitchClientID: string | undefined;
    private _twitchApiClient: ApiClient| undefined;
    private _twitchListener: EventSubWsListener| undefined;

    constructor(client: Client) {
        this._client = client;
    }

    private async registerTwitchListeners(users: string[]) {
        this._twitchClientID = process.env.TWITCH_CLIENT_ID!;
        const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET!;
        const twitchAuthProvider = new AppTokenAuthProvider(this._twitchClientID, twitchClientSecret);
        this._twitchApiClient = new ApiClient({ authProvider: twitchAuthProvider });
        this._twitchListener = new EventSubWsListener({ apiClient: this._twitchApiClient });
        this._twitchListener.start();

        for(const user of users) {
            const twitchUser = await this.geTwitchUser(user);
            if()
            // this._twitchListener.subscribeToStreamOnlineEvents(this.geTwitchUser(user)!)
        }
        // this._twitchListener.onStreamOnline()
    }

    private async geTwitchUser(user: string): Promise<HelixUser | null> {
        if(this._twitchApiClient === undefined) throw new Error("Twitch API Client is not initialized!");
        return await this._twitchApiClient.users.getUserByName(user);
    }

}