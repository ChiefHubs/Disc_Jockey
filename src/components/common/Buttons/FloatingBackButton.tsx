import React from "react";
import "./FloatingBackButton.css";

interface ButtonProps {
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnText?: string;
}

export default function FloatingBackButton({ onClickHandler, btnText = "Back" }: ButtonProps) {
  return (
    <button className="floating-back-button" onClick={onClickHandler} style={{ backgroundColor: "purple", color: "white" }}>
      {btnText}
    </button>
  );
}
