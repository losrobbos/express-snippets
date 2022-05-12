# Relationship notes

## Two techniques

### NESTING

Nest related data inside the parent item.

Example: Delivery address of a customer

```
// Customer
{
   "_id": "c1",
   "name": "losrobbos",
   "delivery_address": {
      "street_nr": "Sesame Street 15",
      "zipcode": "D-12345",
      "city": "Berlin",
      "country": "Germany"
   }
}
```

In the example above we simply CONNECT the customer delivery info by placing it INSIDE the parent customer item.

This technique is called <b>embedding</b> or <b>nesting</b>.

Advantage: Simple
- used if data is TIGHTLY coupled with parent
- you never wana use this item anywhere else except in the parent

Typically used for One-on-One relationships.
- Example: Address of a customer
- Example: Driver's licence of a user

It can also be used for nesting <b>multiple</b> items.

That can make sense if ALL items are highly coupled to its parent and are not used in any other context.

Additionally the nested data has a natural limit and is very unlikely to grow (like Social Media Profile links of a user)

- Example: Delivery addresses of a customer
- Example: Social Media Profiles of a user

Disadvantage:
- not to use nesting if embedded data can GROW LARGE => size limit for documents in MongoDB is 16 MB !
- updates can become quite heavy (= Mongo DB needs to do array operations on embedded items) -> that can slow down the performance for WRITES in case we got a lot of embedded data that is frequently updated => so prevent nesting on items that very likely will get frequently updated

So in those cases where NESTING / Embedding is not desired: What other technique can we use then?


## OUTSOURCING (= References)

Referencing means: OUTSOURCE related data into an OWN database collection. And just reference (!) items by their ID.

You would do OUTSOURCING whenever an item might get referenced by ANOTHER item or if the related data, you wanted to embed, can grow without limits.

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
