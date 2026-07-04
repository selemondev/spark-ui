import type { Options as ConfettiOptions } from "canvas-confetti";
import type { InjectionKey } from "vue";

export interface ConfettiApi {
  fire: (options?: ConfettiOptions) => Promise<void>;
}

export const confettiApiKey: InjectionKey<ConfettiApi> = Symbol("confetti-api");
