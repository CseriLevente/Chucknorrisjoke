const axios = require("axios");

const kategórianevek = {
  animal: { hunname: "állatok" },
  career: { hunname: "karrier" },
  celebrity: { hunname: "híresség" },
  dev: { hunname: "fejlesztő" },
  explicit: { hunname: "kifejezett" },
  fashion: { hunname: "divat" },
  food: { hunname: "ételek" },
  history: { hunname: "történelem" },
  money: { hunname: "pénz" },
  movie: { hunname: "film" },
  music: { hunname: "zene" },
  political: { hunname: "politikai" },
  religion: { hunname: "vallás" },
  science: { hunname: "tudomány" },
  sport: { hunname: "sport" },
  travel: { hunname: "utazás" },
};

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
  console.log("Itt vannak a Chuck Norris vicckategóriák:");
  Object.keys(kategórianevek).forEach((category, index) => {
    console.log(`${index + 1}. ${kategórianevek[category].hunname}`);
  });

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Válassz egyet: ", async (válkategóriaindex) => {
    readline.close();
    const kategóriaindex = parseInt(válkategóriaindex) - 1;
    const kategóriák = Object.keys(kategórianevek);
    const válkategória = kategóriák[kategóriaindex];

    if (
      isNaN(kategóriaindex) ||
      kategóriaindex < 0 ||
      kategóriaindex >= kategóriák.length
    ) {
      console.log("Rossz a bemenet. Csak számot válassz a felsoroltak közül.");
      return;
    }
    const vicc = await getjokefromcategory(válkategória);
    if (vicc) {
      console.log(
        `Itt egy vicc a kategóriádból '${kategórianevek[válkategória].hunname}':`,
        vicc
      );
    } else {
      console.log("Nincs vicc bocsi");
    }
  });
}

getrandomjoke();
