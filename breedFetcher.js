const request = require("request");

// request(
//   "https://api.thecatapi.com/v1/breeds/search?q=" + firstThree,
//   (error, response, body) => {
//     //console.log(typeof body);
//     if (error) {
//       return console.log("Requested breed is not found." ,);
//     } else {
//       const data = JSON.parse(body);
//       return console.log(data[0].description);
//     }
//   }
// );

const fetchBreedDescription = function(breedName, callback) {
  const firstThree = breedName.toString().substring(0, 3);
  request(
    "https://api.thecatapi.com/v1/breeds/search?q=" + firstThree,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      } else {
        if (response.statusCode === 200) {
          const data = JSON.parse(body);
          //return console.log(data[0].description);
          
          if (data.length === 0) {
            callback("no desc found", null);
            return;
          }
          const messg = data[0].description;
          callback(null, messg);
          return;
        }
      }
    }
  );
};
// const resultCallback = function (error, description) {
//   console.log(`error: ${error}, description: ${description}`);
// };

// fetchBreedDescription("Siberian", (error, description)=>{
//   console.log(`error: ${error}, description: ${description}`);
// });

module.exports = {fetchBreedDescription};