import * as util from "util";
const gis = util.promisify(require("g-i-s"));

import { Action } from "../action";
import { Handler, Message } from "../handler";

// cf. https://github.com/jimkang/g-i-s
type SearchResult = {
  url: string;
};

class Image implements Action {
  name = "image";
  help = "Search images";

  async call(m: RegExpMatchArray, { say, event }: Message) {
    const phrase = m[1];
    const rs = (await gis(phrase)) as SearchResult[];

    if (rs.length > 0) {
      const img = rs[Math.floor(Math.random() * rs.length)];
      say({
        text: img.url,
        thread_ts: event.thread_ts,
      });
    } else {
      say({
        text: `\`${phrase}\` image not found`,
        thread_ts: event.thread_ts,
      });
    }
  }
}

Handler.on(/^(?:img|image)\s+(.+)$/i, new Image());
