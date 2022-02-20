import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

function Button ({
  children,
  type,
  linkTo,
  buttonOnClick,
  buttonStyle,
  buttonSize
}){
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];   //if no styling found, use default styling that is STYLES[0] which is defined above

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to = {linkTo} className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={buttonOnClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;