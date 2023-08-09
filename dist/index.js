import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./utils/db.js";
const typeDefs = `#graphql
  type Post {
    text: String
    userId: String
    createdAt: String
  }

  type Query {
    getPosts: [Post],
    getPostDetail: Post
  }

  input PostInput {
    text: String
  }

  type Mutation {
    createPost(PostCreateInput: PostInput!): Post,
    updatePost(id: ID!, PostUpdateInput: PostInput!): Post,
    deletePost(id: ID!): Boolean
  }
`;
const resolvers = {
    Query: {
        getPosts: () => {
            return null;
        },
        getPostDetail: () => {
            return null;
        },
    },
    Mutation: {
        createPost: (_, args) => {
            console.log(args.PostCreateInput.text);
            const Created = db("insertOne", {
                document: {
                    text: args.PostCreateInput.text,
                },
            });
            return Created;
        },
        updatePost: () => {
            return null;
        },
        deletePost: () => {
            return null;
        },
    },
};
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
