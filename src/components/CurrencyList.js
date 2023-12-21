import React from "react";
import styled from "styled-components";

const CurrencyListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem 4rem;
    padding: 10px 0;
`;

const CurrencyRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid;
`;

const CurrencyList = ({
    currenciesList,
    calculateExchangeRate,
    selectedCurrency,
}) => {
    return (
        <CurrencyListContainer>
            {currenciesList.map(
                (quoteCurrency, index) =>
                    calculateExchangeRate(selectedCurrency, quoteCurrency) && (
                        <CurrencyRowContainer key={index}>
                            <span>
                                {calculateExchangeRate(
                                    selectedCurrency,
                                    quoteCurrency
                                )}
                            </span>
                            <span>{quoteCurrency}</span>
                        </CurrencyRowContainer>
                    )
            )}
        </CurrencyListContainer>
    );
};

export default CurrencyList;
