import React from 'react';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';

export default styled(({ color, ...otherProps }) => <ButtonBase {...otherProps} />)`
  color: ${props => props.color};
  flex: 0 0 30px;
`;  

