// graphql
import { GraphQLClient } from "graphql-request";

// query's
import { createUserMutation, getUserQuery } from "@/graphql";

// types
import { UserProfile } from "@/common.types";

const isProd = process.env.NODE_ENV === "production";
const apiUrl = isProd
  ? `${process.env.API_ENDPOINT}`
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProd ? `${process.env.API_KEY}` : "";
const serverUrl = isProd
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    client.setHeader('x-api-key', apiKey)
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const getUser = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};
