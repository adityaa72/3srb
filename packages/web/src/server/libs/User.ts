import { validateHash } from "@/utils/bcrypt";
import { ClientError } from "@/utils/errors";
import { type User as UserModel } from "@prisma/client";
import { prisma } from "../db";

class User {
  // =========== Properties ===========

  public static readonly ROOT_USER_ID = 1006090;

  public readonly row: UserModel;

  // =========== Constructors ===========

  constructor(row: UserModel) {
    this.row = row;
  }

  // =========== Public Accessors ===========

  public get email() {
    return this.row.email;
  }

  public get userId() {
    return this.row.userId;
  }

  // =========== Public Static Methods ===========

  public static async createUserId() {
    const lastUser = await prisma.user.findFirst({
      orderBy: { userId: "desc" },
    });
    if (!lastUser) return this.ROOT_USER_ID;
    const { userId } = lastUser;
    return userId + 1;
  }

  public static async getInstance(email: string, error?: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw ClientError(error ?? `User not exist with ${email}`);
    return new this(user);
  }

  public static async isEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }

  // =========== Public Methods ===========

  public async validateLogin(password: string) {
    if (!this.row.password)
      throw ClientError("This account don't use email password to login");

    await validateHash({
      password,
      hash: this.row.password,
    });
  }
}

export default User;
