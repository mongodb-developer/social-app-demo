/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "social_butterfly";
const collection = "flutters";

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

db.flutters.insertMany([
  {
    postedAt: 1651965202500,
    body: "This is an awesome workshop!",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "smart@mongodb.com",
      nickname: "Mr. Smart",
      picture: "https://i.pravatar.cc/480?u=u1",
    },
  },
  {
    postedAt: 1651965202499,
    body: "A guy started a crowd-sourced internet database for turntables. It's called Wiki-Wiki-Wikipedia.",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "dj@mongodb.com",
      nickname: "DJ Database",
      picture: "https://i.pravatar.cc/480?u=u10",
    },
  },
  {
    postedAt: 1651965202498,
    body: "I've made a DataBase of some of the worst Carpool Karaoke songs ever. It's called CarDB.",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "dj@mongodb.com",
      nickname: "DJ Database",
      picture: "https://i.pravatar.cc/480?u=u10",
    },
  },
  {
    postedAt: 1651965202497,
    body: "Where do you store terrible dad jokes? ... In a dad-a-base.",
    likes: [],
    user: {
      id: "6276d0c602ce122f7b8b11ec",
      name: "Jesse Hall",
      nickname: "codestackr",
      picture:
        "https://lh3.googleusercontent.com/a-/AOh14GgPdA54bhnYcSngbZxMuSLe-khjk-BaaKWsvmxD=s96-c",
    },
  },
  {
    postedAt: 1651965202496,
    body: "How do you process a queue of table delete requests for an asynchronous database? Pop, Lock & Drop It.",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "emile@mongodb.com",
      nickname: "Emmy Freebase",
      picture: "https://i.pravatar.cc/480?u=u9",
    },
  },
  {
    postedAt: 1651965202495,
    body: 'Why was the pyro so upset when he searched for his favorite book in the library database? Results showed "no matches found".',
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "mary@mongodb.com",
      nickname: "Mary Smith",
      picture: "https://i.pravatar.cc/480?u=u12",
    },
  },
  {
    postedAt: 1651965202494,
    body: "A database professional walks into a bar ... And joins two tables.",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "tiffany@mongodb.com",
      nickname: "Tiff Any",
      picture: "https://i.pravatar.cc/480?u=u11",
    },
  },
  {
    postedAt: 1651965202493,
    body: "Why do you never ask SQL people to help you move your furniture? They sometimes drop the table.",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "steve@mongodb.com",
      nickname: "Steve Jacobson",
      picture: "https://i.pravatar.cc/480?u=u13",
    },
  },
  {
    postedAt: 1651965202492,
    body: "How many programmers does it take to screw in a lightbulb? None, it's a hardware problem.",
    likes: [],
    user: {
      id: "6276fc6ba6d2c39f61157254",
      name: "kyle@mongodb.com",
      nickname: "Kyle Johnson",
      picture: "https://i.pravatar.cc/480?u=u16",
    },
  },
]);

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
