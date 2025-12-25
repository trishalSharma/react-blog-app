import { Databases, ID, Query, Permission, Role, Storage } from "appwrite";
import client from "./config"; // assuming config exports initialized client
import conf from "../conf/conf";

// ---------- CONSTANTS ----------
const DATABASE_ID = conf.appwriteDatabaseId
const PROFILE_COLLECTION_ID = conf.appwriteProfileCollectionId
const BUCKET_ID = conf.appwriteCollectionId

// ---------- SERVICES ----------
const databases = new Databases(client);
const storage = new Storage(client);

// ---------- PROFILE SERVICE ----------
const profileService = {

  // 1️⃣ CREATE PROFILE (AFTER SIGNUP)
  async createProfile(user) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        PROFILE_COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          username: user.name
            .toLowerCase()
            .replace(/\s+/g, ""),
          bio: "",
          avatarId: "",
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    } catch (error) {
      throw error;
    }
  },

  // 2️⃣ GET PROFILE BY USERNAME (PUBLIC)
  async getProfileByUsername(username) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROFILE_COLLECTION_ID,
        [Query.equal("username", username)]
      );

      return response.documents[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // 3️⃣ GET PROFILE BY USER ID (INTERNAL USE)
  async getProfileByUserId(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROFILE_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      return response.documents[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // 4️⃣ UPDATE PROFILE (OWNER ONLY)
  async updateProfile(profileId, data) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        PROFILE_COLLECTION_ID,
        profileId,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      throw error;
    }
  },

  // 5️⃣ UPLOAD AVATAR (SAME BUCKET)
  async uploadAvatar(file, userId) {
    try {
      const fileId = `avatar_${userId}`;

      return await storage.createFile(
        BUCKET_ID,
        fileId,
        file,
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
    } catch (error) {
      throw error;
    }
  },

  // 6️⃣ GET AVATAR PREVIEW URL
  getAvatarPreview(avatarId) {
    if (!avatarId) return null;

    return storage.getFilePreview(
      BUCKET_ID,
      avatarId,
      300,
      300,
      "center",
      80
    );
  },
};

export default profileService;
