import { Action } from "../action";
import { Handler, Message } from "../handler";

class Who implements Action {
  name = "who";
  help = "Show user info";

  async call(m: RegExpMatchArray, { say, client }: Message) {
    const user = m[1];
    const members = await client.users.list().then((res) => res.members);

    if (!members || members.length == 0) {
      say(`\`${user}\` user not found`);
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
      say(`\`${user}\` user not found`);
      return;
    }

    for (const u of users) {
      say(
        [
          `slack_user_id: ${u.id}`,
          `name: ${u.name}`,
          `real_name: ${u.real_name}`,
          `display_name: ${u.profile?.display_name}`,
        ].join("\n")
      );
    }
  }
}

Handler.on(/^who\s+(.+)$/is, new Who());
