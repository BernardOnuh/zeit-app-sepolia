import React from "react";
import PropTypes from "prop-types";

function CoinButton(props) {
  const { coinName, coinAbbr, onClick } = props;

  const buttonStyle = {
    width: "100%",
    padding: "8px 0", // You can adjust the padding as per your requirement
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    textAlign: "left",
  };

  const coinNameStyle = {
    opacity: 0.6,
    fontSize: "0.8rem", // You can adjust the font size as per your requirement
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <div>
        <h6 style={{ margin: 0 }}>{coinAbbr}</h6>
        <p style={coinNameStyle}>{coinName}</p>
      </div>
    </button>
  );
}

CoinButton.propTypes = {
  coinName: PropTypes.string.isRequired,
  coinAbbr: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CoinButton;

