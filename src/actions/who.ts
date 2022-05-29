import { text } from "stream/consumers";
import { Action } from "../action";
import { Handler, Message } from "../handler";

class Who implements Action {
  name = "who";
  help = "Show user info";

  async call(m: RegExpMatchArray, { say, client, event }: Message) {
    const user = m[1];
    const members = await client.users.list().then((res) => res.members);

    if (!members || members.length == 0) {
      say({
        text: `\`${user}\` user not found`,
        thread_ts: event.thread_ts,
      });
      return;
    }

    const users = members
      .filter(
        (m) =>
          !m.deleted &&
          !m.is_bot &&
          !m.is_app_user &&
          !m.is_restricted &&
          !m.is_ultra_restricted
      )
      .filter((m) =>
        [m.id, m.name, m.real_name, m.profile?.display_name].some(
          (i) => (i || "").indexOf(user) >= 0
        )
      );

    if (users.length == 0) {
      say({
        text: `\`${user}\` user not found`,
        thread_ts: event.thread_ts,
      });
      return;
    }

    for (const u of users) {
      say({
        text: [
          `slack_user_id: ${u.id}`,
          `name: ${u.name}`,
          `real_name: ${u.real_name}`,
          `display_name: ${u.profile?.display_name}`,
        ].join("\n"),
        thread_ts: event.thread_ts,
      });
    }
  }
}

Handler.on(/^who\s+(.+)$/is, new Who());
