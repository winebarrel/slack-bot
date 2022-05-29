import { Action } from "../action";
import { Handler, Message } from "../handler";

class Ping implements Action {
  name = "ping";
  help = "Return PONG to PING";

  async call(_m: RegExpMatchArray, { event, say }: Message) {
    say({
      text: `<@${event.user}> pong`,
      thread_ts: event.thread_ts,
    });
  }
}

Handler.on(/^ping$/i, new Ping());
