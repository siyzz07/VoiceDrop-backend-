import User from "../model/user-model";

class UserRepository {
  
  // Check if a user exists by email
  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  // Create a new user
  async createUser(username: string, email: string, hashedPassword: string) {
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    return await newUser.save();
  }
}

export default new UserRepository();
