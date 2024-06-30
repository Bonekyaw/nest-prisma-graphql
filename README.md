# This is Nest JS - Graphql Starter Kits

This is for Backend API Development. It can be used for developing a backend as well as learning how to do.  
If you find it useful, give me a **GitHub star**, please.

In this template,

In this template,

- Nest JS framework
- Typescript
- Database - as you like
- Prisma ORM
- Graphql api ( Code-first )
- AuthGuard by Passport & JWT
- Authorization RolesGuard
- bcrypt
- ValidationPipe
- Nest Config
- Rate Limiting
- Logger
- file uploading
- Pagination ( offset-based & cursor-based ) etc.

In order to use it,

**Rename** .env.example file to .env file.  
For **MySQL**

```bash

DATABASE_URL="mysql://username:password@localhost:3306/mydb"

```

For **PostgreSQL**

```bash

DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"

```

Please note.  
_TOKEN_SECRET_ should be complex and hard to guess.

If you use file uploading feature in this kit,  
Please note that version of graphql-upload package should be 14.  
For large projects, it is the best solution to use aws S3, DigitalOcean space, etc.,
instead of using file system.

## Step by Step Installation

```bash
mkdir lucky
cd lucky
git clone https://github.com/Bonekyaw/nest-prisma-graphql.git .
rm -rf .git
npm install
npm run start:dev

```

Before you run, make sure you've renamed .env file and completed required information.

I'm trying best to provide the **latest** version. But some packages may not be latest after some months. If so, you can upgrade manually one after one, or you can upgrade all at once. Please note that graphql-upload version should be 14. If not, you may find some errors. Its latest version is 16 at the present.

```bash
npm install -g npm-check-updates
npm outdated
ncu --upgrade
npm install
```

If you find some codes not working well, please let me know your problems.

For Graphql Query, use Postman.  
You will see everything about graphql queries. Thanks, Postman.

```graphql
mutation Register {
  register(registerInput: { phone: "0977*******7" }) {
    message
    phone
    token
  }
}

mutation Verify {
  verify(
    verifyInput: {
      token: "3llh4zb6rkygbrah5demt7"
      phone: "0977******7"
      otp: "123456"
    }
  ) {
    message
    phone
    token
  }
}

mutation Confirm {
  confirm(
    confirmInput: {
      password: "12345678"
      phone: "0977*******7"
      token: "xdyj8leue6ndwqoxc9lzaxl16enm0gkn"
    }
  ) {
    message
    token
    phone
    userId
    randomToken
  }
}

mutation Login {
  login(loginInput: { phone: "0977******7", password: "12345678" }) {
    message
    token
    userId
    randomToken
  }
}

Please note. For upload test, use Altair graphql client tool.

mutation UpdateProfile {
  updateProfile(file: ...) {
    message
    profile
  }
}

query Admins {
    admins(cursor: 1, limit: 5) {
        nextCursor
        list {
            createdAt
            id
            lastLogin
            name
            phone
            profile
            role
            status
        }
    }
}

query AdminsByoffset {
    adminsByoffset(limit: 5, page: 1) {
        countPerPage
        currentPage
        lastPage
        nextPage
        previousPage
        total
        list {
            createdAt
            id
            lastLogin
            name
            phone
            profile
            role
            status
        }
    }
}

```

## Find more other Starter kits of mine ?

`Nest JS for REST Api`

[Nest JS + Prisma ORM - REST api](https://github.com/Bonekyaw/nest-prisma-sql-rest)

`Nest JS for Graphql Api`

[Nest JS + Prisma ORM - Graphql api](https://github.com/Bonekyaw/nest-prisma-graphql) - Now you are here

`Node Express JS For REST Api`

[Express + Prisma ORM + mongodb - rest api](https://github.com/Bonekyaw/node-express-prisma-mongodb)  
 [Express + Prisma ORM + SQL - rest api](https://github.com/Bonekyaw/node-express-prisma-rest)  
 [Express + mongodb - rest api](https://github.com/Bonekyaw/node-express-mongodb-rest)  
 [Express + mongoose ODM - rest api](https://github.com/Bonekyaw/node-express-nosql-rest)  
 [Express + sequelize ORM - rest api](https://github.com/Bonekyaw/node-express-sql-rest)

`Node Express JS For Graphql Api`

[Apollo server + Prisma ORM + SDL modulerized - graphql api](https://github.com/Bonekyaw/apollo-graphql-prisma)  
 [Express + Prisma ORM + graphql js SDL modulerized - graphql api](https://github.com/Bonekyaw/node-express-graphql-prisma)  
 [Express + Apollo server + mongoose - graphql api](https://github.com/Bonekyaw/node-express-apollo-nosql)  
 [Express + graphql js + mongoose - graphql api](https://github.com/Bonekyaw/node-express-nosql-graphql)  
 [Express + graphql js + sequelize ORM - graphql api](https://github.com/Bonekyaw/node-express-sql-graphql)

`Mobile Application Development`

[React Native Expo](https://github.com/Bonekyaw/react-native-expo)
