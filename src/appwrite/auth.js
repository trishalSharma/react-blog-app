import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)           // Must be https://cloud.appwrite.io/v1
            .setProject(conf.appwriteProjectId);     // Comes from .env

        this.account = new Account(this.client);
    }

    // -----------------------------------------------------
    // EMAIL + PASSWORD SIGNUP (Optional - can remove later)
    // -----------------------------------------------------
    async createAccount({ email, password, name }) {
        try {
            // 1️⃣ Create account
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // 2️⃣ Send verification email (optional)
            await this.account.createVerification("http://localhost:5173/verify");

            return { status: "VERIFICATION_REQUIRED", userAccount };
        } catch (error) {
            throw error;
        }
    }

    // -----------------------------------------------------
    // MAGIC LINK LOGIN (Recommended for Cloud apps)
    // -----------------------------------------------------
    async createMagicSession(email) {
        try {
            return await this.account.createMagicURLSession(
                ID.unique(), 
                email,
                "http://localhost:5173/verify"  // Where Appwrite redirects user after clicking link
            );
        } catch (error) {
            throw error;
        }
    }

    // Finalize Magic Link login
    async updateMagicSession(userId, secret) {
        try {
            return await this.account.updateMagicURLSession(userId, secret);
        } catch (error) {
            throw error;
        }
    }

    // -----------------------------------------------------
    // EMAIL + PASSWORD LOGIN
    // -----------------------------------------------------
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // -----------------------------------------------------
    // GET LOGGED-IN USER
    // -----------------------------------------------------
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null; // not logged in
        }
    }

    // -----------------------------------------------------
    // LOGOUT USER
    // -----------------------------------------------------
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite logout error:", error);
        }
    }
}

const authService = new AuthService();
export default authService;
