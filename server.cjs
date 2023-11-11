const express = require("express");
const app = express();
const port = 3000;

const ERC725 = require("@erc725/erc725.js");
const lsp3ProfileSchema = require("@erc725/erc725.js/schemas/LSP3ProfileMetadata.json");

app.get("/", (req, res) => {
  res.send("Hello World!");

  // Initatiate erc725.js
const erc725js = new ERC725(
  lsp3ProfileSchema,
  "0x4B4Fc6B8aC2D4992F15ED21c9059Ca16c3c61Da7",
  "https://rpc.lukso.gateway.fm",
  {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
