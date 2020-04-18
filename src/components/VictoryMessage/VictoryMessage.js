import React, { memo } from 'react'
import './VictoryMessage.scss'
import propTypes from "prop-types";

const VictoryMessage = ({ show, text, onClick }) => show ?
  <div className='victory-message'>
    <div className='popup' onClick={ onClick }>
      <p>{ text }</p>
    </div>
  </div> : null

VictoryMessage.defaultProps = {
  show: false,
  text: '',
  onClick: e => e
}

VictoryMessage.propTypes = {
  show: propTypes.bool,
  text: propTypes.string,
  onClick: propTypes.func,
}

export default memo(VictoryMessage)