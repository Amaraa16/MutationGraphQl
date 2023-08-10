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
    getPostDetail(code: String): Post
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
      const Get = db("find", {});
      return Get
    },
    getPostDetail: () => {
      return null;
    },
  },
  Mutation: {
    createPost: (_, args) => {
      const Created = db("insertOne", {
        document: {
          text: args.PostCreateInput.text,
        },
      });
      return Created;
    },
    updatePost: (_, args) => {
      const updated = db("updateOne", {
        filter: { _id: { $oid: args.id } },
        update: {
          $set: {
            text: args.PostUpdateInput.text,
          },
        },
      });
      return updated
    },
    deletePost: (_, args) => {
      const deleted = db("deleteOne", {
        filter: { _id: { $oid: args.id } },
      });

      return deleted
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

console.log(`🚀 Server ready at: ${url}`);
