import bcrypt from 'bcrypt';

class HashPassword{
    async hashPasswod(password:any){
       return await bcrypt.hash(password,10)
    }
}

export default new HashPassword()