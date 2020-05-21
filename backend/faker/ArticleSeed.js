const faker = require("faker");
const Article = require("../models/article");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/AbstractionPost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));

Article.deleteMany({})
  .then(() => {
    let articles = [];
    for (let i = 0; i < 50; i++) {
      const fakedate = new Date(faker.date.past());
      const month = getMonths(fakedate.getMonth());
      const day = fakedate.getDate();
      const year = fakedate.getFullYear();
      const title = faker.lorem.sentence();
      const description = faker.lorem.sentences();
      const titleImage = getImageUrl();
      articles.push({
        author: "alvin77",
        date: `${day}-${month},${year}`,
        title: title,
        description: description,
        titleImage: titleImage,
        tags: getTag(),
        likesCount: 0, // Math.floor(Math.random() * 10000)
        likes: [],
        bookmarks: [],
        article: {
          time: Date.now(),
          blocks: [
            {
              type: "header",
              data: {
                text: title,
                level: 2,
              },
            },
            {
              type: "image",
              data: {
                file: {
                  url: titleImage,
                },
                caption: false,
                withBorder: false,
                stretched: false,
                withBackground: false,
              },
            },
            {
              type: "paragraph",
              data: {
                text: description,
              },
            },
          ],
        },
      });
    }
    return Article.create(articles);
  })
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });

const getMonths = (num) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[num];
};
const getImageUrl = () => {
  const images = [
    "http://localhost:4777/image-1588783983385.jpg",
    "http://localhost:4777/image-1588862821111.png",
    "http://localhost:4777/image-1588864455269.jpg",
    "http://localhost:4777/image-1588865225936.jpg",
    "http://localhost:4777/image-1588868213362.jpg",
    "http://localhost:4777/image-1589028735492.jpg",
  ];
  return images[Math.floor(Math.random() * 5)];
};

const getTag = () => {
  var tagArray = [];
  const tags = [
    "javascript",
    "php",
    "Ruby",
    "node",
    "react",
    "angular",
    "Vue",
    "c++",
    "python",
    "django",
    "git",
    "gatsby",
  ];
  for (let i = 0; i < 3; i++) {
    tagArray.push(tags[Math.floor(Math.random() * 12)]);
  }

  return [...new Set(tagArray)];
};
// const getLikes = () => {
//   var likes = [];
//   for (let i = 0; i < 30; i++) {
//     var id = require("mongoose").Types.ObjectId();
//     likes.push(id);
//   }
//   return likes;
// };
