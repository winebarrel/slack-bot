import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { Action } from "./action";

export type Message = SlackEventMiddlewareArgs<"app_mention"> &
  AllMiddlewareArgs;

export class Handler {
  static actions = new Map<RegExp, Action>();

  static on(pattern: RegExp, action: Action) {
    console.log("load action", action.name);
    this.actions.set(pattern, action);
  }

  static async call(message: Message) {
    const { event, context, say } = message;
    const text = event.text
      .replace(new RegExp(`^<@${context.botUserId}>\\s+`), "")
      .trim();

    let matched = false;

    for (const [key, action] of this.actions) {
      const matchData = text.match(key);

      if (matchData) {
        matched = true;
        await action.call(matchData, message);
      }
    }

    if (!matched) {
      say({
        text: `\`${text}\` command not found`,
        thread_ts: event.thread_ts,
      });
    }
  }
}
