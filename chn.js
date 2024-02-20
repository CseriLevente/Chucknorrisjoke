const axios = require("axios");

async function getjokecategories() {
  try {
    const response = await axios.get(
      "https://api.chucknorris.io/jokes/categories"
    );
    return response.data;
  } catch (error) {
    console.error("Baj van fater:", error);
    return [];
  }
}

async function getjokefromcategory(category) {
  try {
    const response = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    return response.data.value;
  } catch (error) {
    console.error("Nem sikerült viccet találni:", error);
    return null;
  }
}

async function getrandomjoke() {
  const categories = await getjokecategories();

  console.log("Itt vannak a Chuck Norris vicckategóriák:");
  categories.forEach((category, index) => {
    console.log(`${index + 1}. ${category}`);
  });

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Válassz egyet: ", async (válkategóriaindex) => {
    readline.close();
    const kategóriaindex = parseInt(válkategóriaindex) - 1;
    const válkategória = categories[kategóriaindex];

    if (isNaN(kategóriaindex) || kategóriaindex < 0 || kategóriaindex >= 17) {
      console.log("Rossz a bemenet. Csak számot válassz a felsoroltak közül.");
      return;
    }
    const joke = await getjokefromcategory(válkategória);
    if (joke) {
      console.log(`Itt egy vicc a kategóriádból '${válkategória}':`, joke);
    } else {
      console.log("Nincs vicc bocsi");
    }
  });
}

getrandomjoke();
