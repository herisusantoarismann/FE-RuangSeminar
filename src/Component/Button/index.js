import React from "react";
import "./style.scss";

const STYLE = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
];

const Button = ({ title, buttonStyle, ...rest }) => {
  const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
  return (
    <button className={`btn ${checkButtonStyle}`} {...rest}>
      {title}
    </button>
  );
};

export default Button;
