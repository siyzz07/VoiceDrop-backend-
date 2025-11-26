import userRepository from "../repositories/user-repositories";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePassword";

class UserService {

  // Check if user exists
  async checkUserExist(email: string) {
    const user = await userRepository.findByEmail(email);
    return user || false;
  }

  // Compare passwords
  async validatePassword(email: string, plainPassword: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return false;

    return await comparePassword.passwordCompare(
      plainPassword,
      user.password
    );
  }

  // Register a new user
  async registerUser(data: any) {
    const { username, password, email } = data;

    const hashedPassword = await hashPassword.hashPasswod(password);

    const user = await userRepository.createUser(
      username,
      email,
      hashedPassword
    );

    return user;
  }
}

export default new UserService();
