import React from "react";
import styled from "styled-components";

const CurrencyInputContainer = styled.div`
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin-right: 10px;
    font-size: 16px;
`;

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
`;

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
                placeholder="Enter amount"
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
