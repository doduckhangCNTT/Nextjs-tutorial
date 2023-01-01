export const getRandomJoke = async () => {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const jokes = await res.json();
    return jokes;
  } catch (error: any) {
    console.log(error.message);
  }
};
