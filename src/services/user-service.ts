import { log } from "console";
import hashPassword from "../utils/hashPassword";
import userRepositories from "../repositories/user-repositories";
import emailService from "./email-service";
import comparePassword from "../utils/comparePassword";

class UserServices {
  //-----------------------------------------chek user exist
  async checkUserExist(email: string) {
    const User = await userRepositories.checkUsrExist(email);
    if (User) {
      return User;
    } else {
      return false;
    }
  }

  //-------------------------------------------compare passowrd
  async comparePassword(eamil: string, passowrd: string) {
    let user = await userRepositories.findUser(eamil);
    let compare = await comparePassword.passwordCompare(
      passowrd,
      user?.password
    );
    return compare;
  }

  //------------------------------------------- register user
  async registerUser(data: any): Promise<any> {
    const { username, password, email } = data;
    const PasswordHash = await hashPassword.hashPasswod(password);
    const userData = { username, email, PasswordHash };
    const user = await userRepositories.registerUser(userData);
    return user;
  }
}

export default new UserServices();
