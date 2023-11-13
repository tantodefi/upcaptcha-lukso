import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Web3 from "web3";
import { validator } from "web3-validator";
import "./App.css";



import ERC725js from "@erc725/erc725.js";
const LSP3UniversalProfileMetaDataSchema = [
  {
    name: "SupportedStandards:LSP3Profile",
    key: "0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347",
    keyType: "Mapping",
    valueType: "bytes4",
    valueContent: "0x5ef83ad9",
  },
  {
    name: "LSP3Profile",
    key: "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
    keyType: "Singleton",
    valueType: "bytes",
    valueContent: "JSONURL",
  },
  {
    name: "LSP12IssuedAssets[]",
    key: "0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd",
    keyType: "Array",
    valueType: "address",
    valueContent: "Address",
  },
  {
    name: "LSP12IssuedAssetsMap:<address>",
    key: "0x74ac2555c10b9349e78f0000<address>",
    keyType: "Mapping",
    valueType: "(bytes4,uint128)",
    valueContent: "(Bytes4,Number)",
  },
  {
    name: "LSP5ReceivedAssets[]",
    key: "0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b",
    keyType: "Array",
    valueType: "address",
    valueContent: "Address",
  },
  {
    name: "LSP5ReceivedAssetsMap:<address>",
    key: "0x812c4334633eb816c80d0000<address>",
    keyType: "Mapping",
    valueType: "(bytes4,uint128)",
    valueContent: "(Bytes4,Number)",
  },
  {
    name: "LSP1UniversalReceiverDelegate",
    key: "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
    keyType: "Singleton",
    valueType: "address",
    valueContent: "Address",
  },
  {
    name: "LSP1UniversalReceiverDelegate:<bytes32>",
    key: "0x0cfc51aec37c55a4d0b10000<bytes32>",
    keyType: "Mapping",
    valueType: "address",
    valueContent: "Address",
  },
  {
    name: "LSP17Extension:<bytes4>",
    key: "0xcee78b4094da860110960000<bytes4>",
    keyType: "Mapping",
    valueType: "address",
    valueContent: "Address",
  },
];

import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
const web3 = new Web3(window.lukso);

import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import LSP0ERC725Account from "@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json";
import LSP6KeyManager from "@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json";
import LSP9Vault from "@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json";
// etc.
import { INTERFACE_IDS } from "@lukso/lsp-smart-contracts/dist/constants.cjs.js";

function App() {
  const [isUPinstaller, setIsUPinstaller] = useState(false);

  /**
   * Is UP extension installed?
   * @returns object
   */
  const isUPinstalled = () => window.lukso || false;

  /**
   * Connect to Universal Profile Browser Extension directly
   */
  async function connect() {
    await web3.eth.requestAccounts();

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Connected with", accounts[0]);
    } catch (error) {
      // handle connection error
    }
  }

  /**
   * Get UP address
   */
  const getAddress = async () => {
    // Request the user's Universal Profile address
    await web3.eth.requestAccounts();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  };

  const getProfile = async () => {
    return await erc725js.getData();
  };

  const custom = async () => {
    // return await window.lukso.request({
    //   "method": "wallet_getPermissions",
    //   "params": []
    // });

    // const profileMetaData = await erc725js.fetchData("LSP3Profile");
    // console.log(profileMetaData);

    // console.log(UniversalProfileContract)

    // Fetch all of the profile's issued assets
    const profile = new ERC725js(
      LSP3UniversalProfileMetaDataSchema,
      "",
      window.lukso,
      {
        ipfsGateway: "https://2eff.lukso.dev/ipfs/", // todo the gateway should be without /ipfs/
      }
    );
    // Get all profile data keys of the smart contract
    return await profile.fetchData("LSP3Profile");




  };

  const interContract = async () => {
    // Create an instance of the Universal Profile
    const myUPContract = new web3.eth.Contract(
      UniversalProfile.abi,
      "0x9139def55c73c12bcda9c44f12326686e3948634"
    );

    const LSP0_INTERFACE_ID = INTERFACE_IDS.LSP0ERC725Account;

    console.log(
      // true or false
      await myUPContract
    );
  };

  useEffect(() => {
    setIsUPinstaller(isUPinstalled());
    // getAddress()

    custom().then((res) => {
      console.log(res);
    });

    //interContract()
  });

  return (
    <>
      <div>
        {isUPinstaller === false && (
          <>Please install Universal Profile to use this Dapp!</>
        )}

        <img
          src={`https://ipfs.io/ipfs/QmazbHPxEMD7j3aUrVMY8KjBPie9iZKVhvWYi67DkqAULy`}
        />

        <br />

        <button onClick={() => connect().then((res) => console.log)}>
          Connect
        </button>
      </div>
    </>
  );
}

export default App;
