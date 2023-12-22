import styled from "styled-components";

export const CurrencyListContainer = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 450px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
        width: 12px;
    }

    &::-webkit-scrollbar:horizontal {
        height: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 2px solid #ffffff;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ffffff;
    }
`;

export const CurrencyRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 1.5rem;
    color: darkslategrey;
    font-weight: 600;
    border: 0;
    font-size: 1.5rem;
    color: darkslategrey;
    align-items: center;
`;
