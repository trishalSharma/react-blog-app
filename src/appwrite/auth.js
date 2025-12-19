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

      if (userAccount) {
        return this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      return await this.account.createOAuth2Session(
        "google",
        "http://localhost:5173/",
        "http://localhost:5173/login"
      );
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
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async sendPasswordRecovery(email, redirectUrl) {
    try {
      return await this.account.createRecovery(
        email,
        redirectUrl
      );
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(userId, secret, newPassword) {
    try {
      return await this.account.updateRecovery(
        userId,
        secret,
        newPassword
      );
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
