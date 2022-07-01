const Match = require("../models/Match");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  parse,
} = require("graphql");

function paginate(arr, size) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
}

const MatchType = new GraphQLObjectType({
  name: "Match",
  description: "This is a Match Type GraphQlObject",
  fields: () => ({
    league: {
      type: GraphQLString,
    },
    match_Id: {
      type: GraphQLInt,
    },
    matchdate_ist: {
      type: GraphQLString,
    },
    matchtype: {
      type: GraphQLString,
    },
    parent_id: {
      type: GraphQLInt,
    },
    parent_name: {
      type: GraphQLString,
    },

    stage: {
      type: GraphQLString,
    },

    teama: {
      type: GraphQLString,
    },
    teama_Id: {
      type: GraphQLInt,
    },
    teamb: {
      type: GraphQLString,
    },
    teamb_Id: {
      type: GraphQLInt,
    },
    tourname: {
      type: GraphQLString,
    },
    venue: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "quryingAPIs",
  description: "This query contains all the Query APIs",
  fields: {
    //Following are available Retrieval APIs

    getMatchById: {
      type: MatchType,
      description: 'Get Match By Id by passing as "id" as argument',
      args: { match_Id: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        const result = await Match.findOne({
          match_Id: args.match_Id,
        }).exec();
        return result;
      },
    },

    getMatchesByDateRange: {
      type: new GraphQLList(MatchType),
      description:
        'Get list of available matches by providing "from" and "to" dates (yyyy/mm/dd) as arguments',
      args: { from: { type: GraphQLString }, to: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const result = await Match.find({
          matchdate_ist: {
            $gte: args.from,
            $lt: args.to,
          },
        });
        return result;
      },
    },

    getMatchesByPagination: {
      type: new GraphQLList(new GraphQLList(MatchType)),
      description:
        'Get all list of Matches divided in pages. Provide "itemsPerPage" in int as argument',
      args: { itemsPerPage: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        const result = await Match.find().exec();

        return paginate(result, args.itemsPerPage);
      },
    },
  },
});

const MutationQuery = new GraphQLObjectType({
  name: "MutatingAPIs",
  description: "Contains functions to modify data",
  fields: {
    // Following is the update API

    updateMatchField: {
      type: MatchType,
      description:
        'Mutation Func to update "venue" of the match by its id, through arguments',
      args: { venue: { type: GraphQLString }, match_Id: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        const result = await Match.findOneAndUpdate(
          { match_Id: args.match_Id },
          {
            venue: args.venue,
          }
        ).exec();

        return result;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});
