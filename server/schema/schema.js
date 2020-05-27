const graphql = require('graphql');
const { GraphQLObjectType,
         GraphQLString ,
        GraphQLSchema} = graphql;
const _ = require('lodash')
//dummy data
var books = [
    {name: 'Into the wind', genre: 'Funny', id: '1'},
    {name: 'Lound Laughs', genre: 'Funny', id: '2'},
    {name: 'Space World', genre: 'Science', id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
       id: { type: GraphQLString},
       name: {type: GraphQLString},
       genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLString}}, // book(id: '123')
            resolve(parent,args){
                // args.id
                //code to get data from db/other sources
                return _.find(books, {id: args.id})
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})