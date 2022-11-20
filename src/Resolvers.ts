export const Resolvers = {
    Query: {
        getPerson: (_: any, args: any) => {
            console.log(args)
        }
    }
};
