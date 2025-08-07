import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite" 
import { CreateUserParams, SignInParams } from '@/type'

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,    
    platform: "com.akash.foodapp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "689310ea000f9a62a210",
    bucketId: "68948cdc00319da27767",
    userCollectionId: "6893112e000368bf071e",
    categoriesCollectionId: "689487f6000a08bcb6aa",
    menuCollectionId: "689488de001cf5d5bb8a",
    customizationsCollectionId: "68948a750027084d47ca",
    menuCustomizationsCollectionId: "68948baa0009f9bfd16d",
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const database = new Databases(client)   
export const avatar = new Avatars(client)

export const createUser = async ({email, password, name}: CreateUserParams) => {      
    try {
        const newUserAccount = await account.create(ID.unique(), email, password, name)
        if (!newUserAccount) {
            throw new Error('Failed to create user')
        }
        await signIn({email, password})

        const avatarUrl = `${appwriteConfig.endpoint}/avatars/initials?name=${encodeURIComponent(name)}&project=${appwriteConfig.projectId}`


        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {name, email, accountId: newUserAccount.$id, avatar: avatarUrl}
        )

        return newUser
    } catch (error: any) {
        console.log(error.message)  
        throw new Error(error as string)
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        if (!session) {
            throw new Error('Failed to sign in')
        }
        return session
    } catch (error: any) {
        console.log(error.message)  
        throw new Error(error as string)
    } 
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) {
            throw new Error('Failed to get current user')
        }
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) {
            throw new Error('User not found')
        }
        return currentUser.documents[0]
    } catch (error: any) {
        console.log(error.message)  
        throw new Error(error as string)
    }
}