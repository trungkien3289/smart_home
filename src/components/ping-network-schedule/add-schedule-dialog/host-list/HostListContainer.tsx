import React from 'react';
import styled from 'styled-components'

export default styled((props) => <div {...props} />)`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    ul{
        flex: 1 1 auto;
    }
`;
