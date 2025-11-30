import userRepository from "../repositories/user-repositories";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePassword";

class UserService {

  // Check if user exists
  async checkUserExist(email: string) {
    const user = await userRepository.findByEmail(email);
    return user || false;
  }

 


}

export default new UserService();
