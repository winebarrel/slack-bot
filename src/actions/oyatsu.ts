import { Action } from "../action";
import { Handler, Message } from "../handler";

class Oyatsu implements Action {
  name = "おやつ";
  help = "おやつを食べませんか？";

  OYATSU_LIST = [
    "🌰",
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
    "🍍",
    "🍅",
    "🍆",
    "🌽",
    "🍠",
    "🍞",
    "🧀",
    "🍗",
    "🍖",
    "🍤",
    "🍳",
    "🍟",
    "🌭",
    "🍕",
    "🍝",
    "🌮",
    "🌯",
    "🍜",
    "🍲",
    "🍥",
    "🍣",
    "🍱",
    "🍛",
    "🍙",
    "🍚",
    "🍘",
    "🍢",
    "🍡",
    "🍧",
    "🍨",
    "🍦",
    "🍰",
    "🎂",
    "🍮",
    "🍬",
    "🍭",
    "🍫",
    "🍿",
    "🍩",
    "🍪",
    "🍄",
    "🥝",
    "🥑",
    "🥒",
    "🥕",
    "🌶",
    "🥔",
    "🥜",
    "🥐",
    "🥖",
    "🥚",
    "🥓",
    "🥞",
    "🍔",
    "🥙",
    "🥗",
    "🥘",
    "🥨",
    "🥮",
  ];

  async call(_m: RegExpMatchArray, { say }: Message) {
    const oyatsu =
      this.OYATSU_LIST[Math.floor(Math.random() * this.OYATSU_LIST.length)];
    say(`つ ${oyatsu}`);
  }
}

Handler.on(/^おやつ$/, new Oyatsu());
