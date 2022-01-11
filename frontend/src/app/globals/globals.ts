import { Injectable } from "@angular/core";
import { User } from "../auth/auth.component";

@Injectable()
export class Globals {
  loginData = new LoginData();
}

class LoginData {
  token!: string;
  user: User | undefined;
}
