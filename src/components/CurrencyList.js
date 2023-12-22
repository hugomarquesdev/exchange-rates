import React from "react";
import PropTypes from "prop-types";
import {
    CurrencyListContainer,
    CurrencyRowContainer,
} from "../styles/CurrencyListStyles";

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
                            <span style={{ fontSize: "1rem" }}>
                                {quoteCurrency}
                            </span>
                        </CurrencyRowContainer>
                    )
            )}
        </CurrencyListContainer>
    );
};

export default CurrencyList;

CurrencyList.propTypes = {
    currenciesList: PropTypes.array.isRequired,
    calculateExchangeRate: PropTypes.func.isRequired,
    selectedCurrency: PropTypes.string.isRequired,
};
