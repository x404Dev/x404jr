import { ApiClient, HelixUser } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { EventSubStreamOnlineEvent } from "@twurple/eventsub-base";
import { Client, ColorResolvable } from "discord.js";
import chalk from "chalk";
import EasyEmbed from "src/structure/EasyEmbed";
import StreamAlertsOptions from "../configs/StreamAlerts";

export default class StreamAlerts {
  private readonly _client: Client;

  private _twitchClientID: string | undefined;
  private _twitchApiClient: ApiClient | undefined;
  private _twitchListener: EventSubWsListener | undefined;

  constructor(client: Client) {
    this._client = client;

    this.registerTwitchListeners(StreamAlertsOptions.twitchChannels);
  }

  private async registerTwitchListeners(users: string[]) {
    this._twitchClientID = process.env.TWITCH_CLIENT_ID!;
    const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET!;
    const twitchAuthProvider = new AppTokenAuthProvider(
      this._twitchClientID,
      twitchClientSecret
    );
    this._twitchApiClient = new ApiClient({ authProvider: twitchAuthProvider });
    this._twitchListener = new EventSubWsListener({
      apiClient: this._twitchApiClient,
    });
    this._twitchListener.start();

    for (const user of users) {
      const twitchUser = await this.geTwitchUser(user);
      if (!twitchUser)
        return console.log(
          chalk.yellow.bold("x404Jr") +
            chalk.blue.bold(":") +
            chalk.redBright("Twitch user `" + user + "` could not be found!")
        );
      this._twitchListener.onStreamOnline(twitchUser, this.twitchOnLive);
    }
  }

  private async geTwitchUser(user: string): Promise<HelixUser | null> {
    if (this._twitchApiClient === undefined)
      throw new Error("Twitch API Client is not initialized!");
    return await this._twitchApiClient.users.getUserByName(user);
  }

  private async twitchOnLive(event: EventSubStreamOnlineEvent) {
    console.log(
      chalk.yellow.bold("x404Jr") +
        chalk.blue.bold(":") +
        chalk.magenta(
          " " + event.broadcasterDisplayName + " is now live on twitch!"
        )
    );

    const stream = await event.getStream();
    if (!stream)
      return console.log(
        chalk.yellow.bold("x404Jr") +
          chalk.blue.bold(":") +
          chalk.redBright("Stream is null!")
      );

    const broadcaster = await event.getBroadcaster();

    this.sendLiveAlert(
      event.broadcasterDisplayName,
      0x6441a5,
      stream.title,
      broadcaster.profilePictureUrl,
      stream.getThumbnailUrl(1080, 608),
      "Twitch",
      "https://www.twitch.tv/" + event.broadcasterName,
      stream.gameName
    );
  }

  private sendLiveAlert(
    username: string,
    color: ColorResolvable,
    title: string,
    pfpUrl: string,
    thumbnailUrl: string,
    platform: string,
    url: string,
    game?: string
  ) {
    const streamEmbed = new EasyEmbed()
      .setTitle(title)
      .setColor(color)
      .setImage(thumbnailUrl)
      .setAuthor({
        name: username + " is now live on " + platform + "!",
        iconURL: pfpUrl,
      })
      .setURL(url)
      .setTimestamp();

    if (game) streamEmbed.setDescription("Playing " + game);
  }
}
