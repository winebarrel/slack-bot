import { Action } from "../action";
import { Handler, Message } from "../handler";

class Help implements Action {
  name = "help";
  help = "Print help";
  actions: Map<RegExp, Action>;

  constructor(actions: Map<RegExp, Action>) {
    this.actions = actions;
  }

  async call(m: RegExpMatchArray, { say, event }: Message) {
    const cmd = m[1];
    let helps: string[] = [];

    for (const [key, action] of this.actions) {
      if (!cmd || action.name == cmd) {
        helps.push(`${action.name}  [${action.help}]`);
      }
    }

    if (helps.length > 0) {
      helps.sort();
      say({
        text: "```" + helps.join("\n") + "```",
        thread_ts: event.thread_ts,
      });
    }
  }
}

Handler.on(/^help(?:\s+(.+))?$/i, new Help(Handler.actions));
