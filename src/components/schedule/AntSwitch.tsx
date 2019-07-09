import styled from 'styled-components'
import { Switch } from '@material-ui/core';
import React from 'react';
export const AntSwitch = styled((props) => <Switch {...props}/>)`
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: #ccc,
      '&$checked': {
        transform: 'translateX(12px)',
        color: #fff,
        '& + $track': {
          opacity: 1,
          backgroundColor: #fff,
          borderColor: #ccc,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: 1px solid #ccc,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: #fff,
    },
    checked: {},
    `