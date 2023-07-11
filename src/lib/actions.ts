// graphql
import { GraphQLClient } from "graphql-request";

// query's
import {
  createUserMutation,
  getUserQuery,
  createProjectMutation,
  projectsQuery,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  deleteProjectMutation,
  updateProjectMutation,
} from "@/graphql";

// types
import { ProjectForm, UserProfile } from "@/common.types";

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
    client.setHeader("x-api-key", apiKey);
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

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    return response.json();
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async (
  category?: string,
  endcursor?: string
) => {
  return makeGraphQLRequest(projectsQuery, { category, endCursor: endcursor });
};

export const getProjectDetails = async (id: string) => {
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  return makeGraphQLRequest(getProjectsOfUserQuery, { id });
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  const updatedForm = { ...form };

  if (updatedForm.image.includes("data:")) {
    updatedForm.image = (await uploadImage(updatedForm.image))?.url;
  }
  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: {
      ...updatedForm,
    },
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};
