import React from "react";




function ConnectWalletPage() {
  const classes = useStyles();
  return (
    <div className="text-black">
      <div className="Title">
        <h1 className="navbar-logo">
          Alternative Uniswap Interface
        </h1>
      </div>

      <div>
        <div>
          <div
          >
            Please connect an Ethereum wallet to your browser to use the
            application
          </div>
        </div>
      </div>

      <div
      >
        <p>
          Alternative Uniswap Interface | Get AUT for use in the bakerloo testnet{" "}
          <a href="https://faucet.bakerloo.autonity.network/">here</a>
        </p>
      </div>
    </div>
  );
}

export default ConnectWalletPage;
