import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      await this.account.createVerification(
        "http://localhost:5173/verify"
      );

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async resendVerification() {
  try {
    await this.account.createVerification(
      "http://localhost:5173/verify"
    );
  } catch (error) {
    throw error;
  }
}

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(
        email,
        password
      );

      const user = await this.account.get();
       if (!user.emailVerification) {
        await this.logout();
        throw new Error("EMAIL_NOT_VERIFIED");
      }
        return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }
  
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
}

const authService = new AuthService();
export default authService;
