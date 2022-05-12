# Relationship notes

## Two techniques

### NESTING

Advantage: Simple
- used if data is TIGHTLY coupled with parent
- you never wana use this item anywhere else except in the parent

Typically used for One-on-One relationships:
- Example: Address of a customer
- Example: Driver's licence of a user

Multiple items:

Can make sense if ALL items are highly coupled with parent.
And the nested data has a natural limit

- Example: Delivery addresses of a customer


Disadvantage:
- not to use if embedded data can grow large => size limit 16 MB for documents in MongoDB
- updates are quite heavy (= Mongo DB needs to do array operations!)


## OUTSOURCING (= References)

Outsource related data into OWN collection.

And just reference (!) items by their ID

You would do OUTSOURCING whenever an item might get referenced by ANOTHER item.

Example: Author of Blog Posts

```
// User 
{
   "_id": "u1",
   "name": "losrobbos"
}

// Posts
{
   "_id": "p1",
   "title": "Relations, Relations, Relations...",
   "user_id": "u1"
},
{
   "_id": "p2",
   "title": "Developers, Developers, Developers...",
   "user_id": "u1"
}
```

In the example above, we have two blog posts written by the same user.

In order to prevent to NEST / DUPLICATE the whole user info, we simply OUTSOURCE the user from the blog post entries and just reference the ID.

So use OUTSOURCING if an item might get referenced MORE THAN ONCE by others items in the database.

Typically you use that type of relation for all sorts of PARENT CHILDREN relations:

- A user and its todos
- A user and its blog posts
- A user and its recipes
- A blog post and its comments

## RELATIONS TYPES

- One-to-One   - Example: ONE customer has ONE delivery address
- One-to-few   - Example: ONE customer has FEW social media profiles
- One-to-many  - Example: ONE Blog posts can have MANY comments
- Many to Many - Example: ONE Book can have many AUTHORS. And ONE Author can write MANY books 

Great article with real examples on these realtionship types:

http://learnmongodbthehardway.com/schema/schemabasics/?1
