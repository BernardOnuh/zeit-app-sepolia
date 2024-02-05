import Image from "next/image";

const TokenImg = ({ tokenType, classNames }) => {
    let iconName;
    let iconWidth;
    if (tokenType == "ETH") {
      iconName = "Ethereum_logo.svg";
      iconWidth = 12;
    } else if (tokenType == "BTC") {
      iconName = "btc.svg";
      iconWidth = 23;
    } else {
      iconName = "tether-logo.svg";
      iconWidth = 23;
    }
    return (
      <Image
        width={iconWidth}
        height={1}
        src={`/images/${iconName}`}
        className={classNames}
        alt="token"
      />
    );
  };
  export default TokenImg