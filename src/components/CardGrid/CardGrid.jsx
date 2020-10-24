import React from "react";
import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`

export const CardGrid = ({children, className}) => {
    return (
        <Grid className={className}>
            {children}
        </Grid>
    )
}
