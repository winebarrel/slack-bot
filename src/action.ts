import { Message } from "./handler";

export interface Action {
  name: string;
  help: string;
  call(m: RegExpMatchArray, message: Message): Promise<void>;
}
