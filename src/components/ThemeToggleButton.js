import React from 'react';
import { Button } from 'semantic-ui-react';

let toggleButtonStyle = {
  position: 'fixed',
  bottom: '30px',
  left: '95%',
  transform: 'translateX(-50%)',
  opacity: 0.6,
};

function ToggleThemeButton(props) {
  return (
    <Button
      inverted={!props.toggleTheme}
      circular
      style={toggleButtonStyle}
      size='massive'
      onClick={props.action}
      icon={props.toggleTheme ? 'lightbulb outline' : 'lightbulb'}
    />
  );
}

export default ToggleThemeButton;
