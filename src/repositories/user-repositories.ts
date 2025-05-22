import User from '../model/user-model'

class UserRepositories{
    async registerUser(data:any){
       const {username, PasswordHash, email}=data

       const saveUser=new User({
         name:username,
         password:PasswordHash,
         email:email
       })

       let user=saveUser.save()
       return user

    }
}

export default new UserRepositories