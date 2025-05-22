import { log } from "console"
import hashPassword from "../utils/hashPassword"
import userRepositories from "../repositories/user-repositories"

class UserServices{
    async checkUserExist(){
        
    }

    async registerUser(data:any):Promise<any>{
        const{username, password, email}=data
        const PasswordHash=await hashPassword.hashPasswod(password)
        const userData={username,email,PasswordHash}
        const user=await userRepositories.registerUser(userData)
        return user
        

    }
}

export default new UserServices()