# GraphQL Server Example with NestJS (SDL-first)

This example shows how to implement an **GraphQL server (SDL-first) with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [NestJS](https://docs.nestjs.com/graphql/quick-start). It is based on a PostgreSQL database, you can run the database with [Docker](https://www.docker.com/). The example was bootstrapped using the NestJS CLI command `nest new nestjs-graphql-example`.

## Getting started

### 1. Download example and install dependencies

Download this example:

https://github.com/woochanleee/nestjs-graphql-example/archive/main.zip

Install yarn dependencies:

```
cd nestjs-graphql-example
yarn install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:woochanleee/nestjs-graphql-example.git --depth=1
```

Install yarn dependencies:

```
cd nestjs-graphql-example
yarn install
```

</details>

### 2. Start the PostgreSQL database server

Launch your PostgreSQL database server with this command:

```
yarn db:start
```

And setting prisma client and insert dummy data.

```
yarn db:setting
```

If you got error like this:

`Error: P1001: Can't reach database server at `localhost`:`5432``

You just run previous command one more time. Because Docker's execution is not over yet.

### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
yarn dev
```

Navigate to [http://localhost:3005/graphql](http://localhost:3005/graphql) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/graphql/graphql-playground).

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./src/graphql/schema.graphql`](./src/graphql/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Login and header setting

```grahpql
mutation {
  login(input: {
    email: "test",
    password: "test"
  }) {
    ok
    error
    accessToken
    refreshToken
  }
}
```

Bottom left, setting http headers(Authorization Bearer).

![image](https://user-images.githubusercontent.com/48552260/109138247-80d5d400-779d-11eb-8704-73ef880efd8b.png)

<Details><Summary><strong>See more API operations</strong></Summary>

### Create a new user

```graphql
mutation {
  createUser(
    input: {
      email: "email"
      password: "password"
      name: "optional not required"
    }
  ) {
    ok
    error
  }
}
```

### Edit a user profile

```graphql
mutation {
  editProfile(input: { name: "optional", password: "also optional" }) {
    ok
    error
  }
}
```

### Refresh token

```graphql
mutation {
  refreshToken {
    ok
    error
    accessToken
    refreshToken
  }
}
```

### Create a post

```graphql
mutation {
  createPost(input: { title: "title", content: "content" }) {
    ok
    error
  }
}
```

### Edit a post

```graphql
mutation {
  editPost(
    input: { postId: 1, title: "title optional", content: "content optional" }
  ) {
    ok
    error
  }
}
```

### Delete a post

```graphql
mutation {
  deletePost(id: 1) {
    ok
    error
  }
}
```

### Retrieve all posts and their authors

```graphql
query {
  getPosts {
    ok
    error
    posts {
      author {
        email
        id
        name
        registeredAt
        role
        updatedAt
      }
      authorId
      content
      createdAt
      id
      title
      updatedAt
    }
  }
}
```

### Get a post

```graphql
query {
  getPost(id: 1) {
    ok
    error
    post {
      author {
        email
        id
        name
        registeredAt
        role
        updatedAt
      }
      authorId
      content
      createdAt
      id
      title
      updatedAt
    }
  }
}
```

### Hello

```graphql
query {
  hello(name: "woochanleee")
}
```

### Hello, world!

```graphql
query {
  helloWorld
}
```

### Get my profile

```graphql
query {
  me {
    ok
    error
    user {
      id
      name
      registeredAt
      role
      updatedAt
      posts {
        authorId
        title
        content
        createdAt
        updatedAt
      }
    }
  }
}
```

### Get profile by email

```graphql
query {
  userProfile(email: "test") {
    ok
    error
    user {
      id
      name
      registeredAt
      role
      updatedAt
      posts {
        authorId
        title
        content
        createdAt
        updatedAt
      }
    }
  }
}
```

</Details>

## References

https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql-nestjs-sdl-first/README.md
