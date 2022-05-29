import * as dotenv from "dotenv";
dotenv.config();
import { Handler } from "./handler";
import "./actions/index";
import { App, LogLevel } from "@slack/bolt";

const app = new App({
  logLevel: process.env.LOG_LEVEL
    ? LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel]
    : LogLevel.INFO,
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.event("app_mention", async (message) => {
  const { say, event } = message;

  try {
    await Handler.call(message);
  } catch (e) {
    const err = e as Error;
    const errmsg = err.stack ?? err.message;
    say({
      text: "unexpected error occurred\n```" + errmsg + "```",
      thread_ts: event.thread_ts,
    });
  }
});

(async () => {
  await app.start();
  console.log("Slack bot started");
})();
