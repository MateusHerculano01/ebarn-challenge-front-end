import { UserInterface } from "./user-interface";

export interface PushSubscriptionInterface {
  user?: UserInterface;
  endpoint: string;
  expirationTime: any;
  keys: {
    p256dh: string;
    auth: string;
  };
}
