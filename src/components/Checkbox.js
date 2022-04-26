import React from 'react'
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import styled from 'styled-components';

const Wrapper = styled.div`
    .rc-checkbox-inner {
        border: 1px solid #6085db;
        /* background: #f2f4f9; */
        border-radius: 50%;
    }

    .rc-checkbox-input{
        cursor: default;
    }

        .rc-checkbox-disabled{
        cursor: default;
    }
`;
const CheckboxComponent = ({...props}) => {
  return (
      <Wrapper>
          <Checkbox  {...props}/>
      </Wrapper>   
  )
}

export default CheckboxComponent