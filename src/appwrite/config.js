    import conf from '../conf/conf';
    import { Client, ID, Databases, Storage, Query, Permission, Role} from "appwrite";

    // Todo: search functionality, profile page, 

    export class Service{
        client = new Client();
        databases;
        bucket;

        constructor(){
            this.client
            .setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteUrl);
            this.bucket = new Storage(this.client);
            this.databases = new Databases(this.client);
        }

        async  createPost({title, slug, content, featureImage, status, userId,userName}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featureImage,
                        status,
                        userId,
                        userName,

                    },
        
                )
            } catch (error) {
                console.log("Appwrite service :: createPost :: error", error);
            }
        }

        async updatePost(slug,{title, content, featureImage, status}){
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                     featureImage,
                        status,
                    }
                )
            } catch (error) {
                console.log("Appwrite service :: updatePost :: error", error);
            }
        }

        async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deletePost :: error", error);
                return false;
            }
        }

        async getPost(slug){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )

            } catch (error) {
                console.log("Appwrite service :: getPost :: error", error);
                return false;
            }
        }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );

            return response.documents;   
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return [];
        }
    }

    async getUserPosts(userId){
        try {
            const response =  await this.databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    [
        Query.equal("userId",userId)
    ]
);
return response.documents;
        } catch{
            console.log("Appwrite :: getUserPosts :: error", error)
            return [];
        }

    }

        // services for File CRUD

        async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                ["read(\"any\")"]   
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }


        async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                );
                return true;
            } catch (error) {
                console.log("Appwite service :: deleteFile :: error",error);
                return false;
            }
        }

        getFileView(fileId){
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
        }
    }

    const service= new Service()
    export default service