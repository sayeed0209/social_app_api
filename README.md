# social_blog_API
## Tech Stack
- Backend
  - Node.js 
  - express.js
- JWT
- Database
    - MONGO_DB
- Testing
    - jest    
    
```
- inside of config/dot.env you need to create your own dot.env file.
- configure your database.
- Once you have created your database you can start the server (npm run dev)
npm install -> [install all the dependency]
npm run dev -> [start the server]
```

### Testing
```
- inside of config/test.env you need to create your own test.env file.
- npm test
```
## Endpoints
    ## posts
-POST:/posts:create a post

-GET:/posts:filter by query string (important) & sortBy('DESC/ASC')

-GET:/posts/:id - Get a post by id.

-PATCH:/posts/:id -Update a post by id

-DELETE:/posts/:id - Delete a post by id


    ## User
 -POST:/users/create:create a user.
<<<<<<< HEAD

 -POST:users/login:login a user.

 -POST:users/logout:logout a user.

 -POST:/users/logoutAll:logout a user from all device.

 -GET:/users/me :get user profile.

 -DELETE:/users/me:delete a user.

 -POST:/users/me/avatar :upload a picture under or euqal to 2MB.

 -DELETE:/users/:id/avatar :delete a avatar.

 -GET:/users /:id/avatar :get user avatar.
=======
 
 -POST:users/login:login a user.
 
 -POST:users/logout:logout a user.
 
 -POST:/users/logoutAll:logout a user from all device.
 
 -GET:/users/me :get user profile.
 
 -DELETE:/users/me:delete a user
 
 -POST:/users/me/avatar :upload a picture 
 
 -DELETE:/users/:id/avatar :delete a avatar 
 
 -GET:/users /:id/avatar :get user avatar
>>>>>>> 1e544ed74d3d4d8887403d7b232c542f11e86243
