//track the searches made by user
import { Client, Databases, ID, Query } from "react-native-appwrite";
import { getUser } from "./auth";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  //check if record exists in db-

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    if (result.documents.length > 0) {
      const document = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
        count: document.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
  }
};

export const saveMovie = async (
  user_id: string,
  movie_id: string,
  poster_path: string,
  title: string,
  vote_average: number,
  release_date: string
) => {
  try {
    const res = await database.createDocument(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      ID.unique(),
      {
        user_id: user_id,
        movie_id: movie_id,
        poster_path: poster_path,
        title: title,
        vote_average: vote_average,
        release_date: release_date,
      }
    );

    return res;
  } catch (err) {
    console.log(err);

    throw new Error(err as string);
  }
};
export const getSavedMovies = async () => {
  let user = await getUser();
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("user_id", user?.$id!)]
    );

    return result.documents;
  } catch (err) {
    console.log(err);
  }
};

export const checkSavedMovie=async(movie_id:string)=>{
  let user = await getUser();
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("user_id", user?.$id!), Query.equal("movie_id", movie_id)]
    );

    return result.documents.length > 0;
  } catch (err) {
    console.log(err);
  }
}

export const deleteSaved= async(movie_id: string)=>{
  let user = await getUser();

  try {
    const doc =
    await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal("user_id", user?.$id!), Query.equal("movie_id", movie_id)]
    );
    const result = await database.deleteDocument(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      doc.documents[0].$id,
    );

    return result;
  } catch (err) {
    console.log(err);
  }
}