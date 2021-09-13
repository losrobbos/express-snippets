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

Can make sense if ALL items are highly coupled with parent
And the nested data has a natural limit

- Example: Delivery addresses of a customer


Disadvantage:
- not to use if embedded data can grow large => size limit 16 MB for documents in MongoDB
- updates are quite heavy (= Mongo DB needs to do array operations!)


## OUTSOURCING (= References)

Outsource related data into OWN collection.

And just reference (!) items by their ID