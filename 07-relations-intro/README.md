# Relationships Intro with Mongoose

We have two ways to create relations between Data:
- Nesting info inside an object
- REFERENCING another object by its ID

In order to explore how to do a relation you can run this sample code:

- npm i
- Put your ATLAS URL into a .env file (you can copy the .env.sample file and replace the ATLAS Url)
- Also adapt the database NAME in the URL (so you do not overwrite an existing database of yours)
- npm start

Check if you get a success message that the DB Connection is establishes
  - otherwise re-check if the .env is in your root folder and the key MONGO_URI is spelled correctly

### Testing the relationship routes.

We have four basic routes:
- /seed => to create some initial data
- /users => get list of users
- /todos => get list of todos
- /users/:id/todos => get todos of one user!

To test that flow, step into the "requests.http" file to execute some requests.

First start by calling the route /seed to insert some initial data (2 users & 3 todos)

The code in the route /seed will automatically create RELATIONS between users and todos.

Afterwards call the /users route to see all users in the DB. Pick any user ID

Now call the /users/:id/todos route and replace the :id with a real user ID.

Now you should receive only the todos that belong to that user.

Try with another user ID.

This way you can now fetch user specific data.

But so far we can see the todos of every user.

In order to PROTECT user information, we must get into authentication.

Check the next snippet folder for the auth intro...