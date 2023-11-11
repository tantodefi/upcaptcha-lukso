import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Web3 from "web3";
import { validator } from "web3-validator";
import "./App.css";


import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
const web3 = new Web3(window.lukso);

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
    return await window.lukso.request({
      "method": "wallet_getPermissions",
      "params": []
    });

    // const profileMetaData = await erc725js.fetchData("LSP3Profile");
    // console.log(profileMetaData);

    // console.log(UniversalProfileContract)
    
  };

  useEffect(() => {
    setIsUPinstaller(isUPinstalled());
    // getAddress()

    custom().then((res) => {
      console.log(res);
    });
  });

  return (
    <>
      <div>
        {isUPinstaller === false && (
          <>Please install Universal Profile to use this Dapp!</>
        )}
        <br />

        <button onClick={() => connect().then((res) => console.log)}>
          Connect
        </button>
      </div>
    </>
  );
}

export default App;
