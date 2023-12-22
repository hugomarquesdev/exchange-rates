import styled from "styled-components";

export const CurrencyInputContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: aliceblue;
    padding: 15px;
    width: fit-content;
    border: 1px solid transparent;
    border-radius: 10px;
`;

export const Input = styled.input`
    margin-right: 10px;
    font-size: 2rem;
    border: 0;
    background-color: transparent;

    &:focus-visible {
        outline: 0;
    }
`;

export const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid transparent;
    border-radius: 20px;
`;
