import React from "react";
import styled from "styled-components";

const StyledInputGroup = styled.div`
    &:first-of-type {
        margin-top: 0
    }
`

export const InputGroup = ({children}) => {
    return (
        <StyledInputGroup className="mt-4">{children}</StyledInputGroup>
    )
}

