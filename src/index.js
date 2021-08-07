import app from "./app";
const PORT = process.env.PORT || 4000;

async function main() {
  await app.listen(PORT);
  console.log(`Server on Port ${PORT}`);
}

main();
