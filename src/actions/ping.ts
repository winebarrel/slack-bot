import { Action } from "../action";
import { Handler, Message } from "../handler";

class Ping implements Action {
  name = "ping";
  help = "Return PONG to PING";

  async call(_m: RegExpMatchArray, { body, say }: Message) {
    say({
      text: `<@${body.event.user}> pong`,
      thread_ts: body.event.thread_ts,
    });
  }
}

Handler.on(/^ping$/i, new Ping());
