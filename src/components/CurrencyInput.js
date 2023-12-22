import React from "react";
import PropTypes from "prop-types";
import {
    CurrencyInputContainer,
    Input,
    Select,
} from "../styles/CurrencyInputStyles";

const CurrencyInput = ({
    amount,
    setAmount,
    selectedCurrency,
    setSelectedCurrency,
    currenciesList,
}) => {
    return (
        <CurrencyInputContainer>
            <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
            />
            <Select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
            >
                {currenciesList.map((currencyOption, index) => (
                    <option key={index} value={currencyOption}>
                        {currencyOption}
                    </option>
                ))}
            </Select>
        </CurrencyInputContainer>
    );
};

export default CurrencyInput;

CurrencyInput.propTypes = {
    amount: PropTypes.string.isRequired,
    setAmount: PropTypes.func.isRequired,
    selectedCurrency: PropTypes.string.isRequired,
    setSelectedCurrency: PropTypes.func.isRequired,
    currenciesList: PropTypes.array.isRequired,
};
