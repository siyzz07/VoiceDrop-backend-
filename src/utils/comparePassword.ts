const bcrypt = require("bcrypt");

class ComparePassword {
  async passwordCompare(passowrd: string, hashPasswod:any) {
    const match = await bcrypt.compare(passowrd, hashPasswod);

    if (match) {
      console.log("Passwords match!");
      return true;
    } else {
      console.log("Passwords do not match.");
      return false;
    }
  }
}

export default new ComparePassword()
