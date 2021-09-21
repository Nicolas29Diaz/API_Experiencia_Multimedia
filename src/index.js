import app from "./app";
const PORT = process.env.PORT || 4000;

async function main() {
  await app.listen(PORT, "0.0.0.0");
  console.log(`Server on Port ${PORT}`);
}

main();
