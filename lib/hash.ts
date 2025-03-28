import bcrypt from "bcryptjs"

export class Hash {
  static async hashPassword( password : string) {
    return await bcrypt.hash(password, 10)
  }

  static async verifyPassword (password : string, hashedPassword : string) {
    return await bcrypt.compare(password, hashedPassword)
  }
}