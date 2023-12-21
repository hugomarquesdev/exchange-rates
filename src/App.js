import React, { useEffect, useState } from "react";
import styled from "styled-components";
import upholdSDK from "./utils/upholdSDK";
import CurrencyInput from "./components/CurrencyInput";
import CurrencyList from "./components/CurrencyList";

const AppContainer = styled.div`
    text-align: center;
    margin: 20px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const App = () => {
    const [amount, setAmount] = useState(() => {
        return localStorage.getItem("amount") || "1";
    });
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem("selectedCurrency") || "USD";
    });
    const [currenciesList, setCurrenciesList] = useState([]);
    const [data, setData] = useState([]);
    const [debouncedSelectedCurrency, setDebouncedSelectedCurrency] =
        useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem("amount", amount);
    }, [amount]);

    useEffect(() => {
        localStorage.setItem("selectedCurrency", selectedCurrency);
    }, [selectedCurrency]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const cacheKey = "currencies";
                let data = localStorage.getItem(cacheKey);

                if (!data || debouncedSelectedCurrency) {
                    data = await upholdSDK.getTicker();
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                } else {
                    data = JSON.parse(data);
                }

                setData(data);

                const currenciesList = data
                    .map((item) => item.pair.split("-")[1])
                    .filter((currency) => currency && currency.trim() !== "");

                setCurrenciesList([...new Set(currenciesList)]);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [debouncedSelectedCurrency]);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedSelectedCurrency(selectedCurrency);
        }, 500);

        return () => {
            clearTimeout(timeOut);
        };
    }, [selectedCurrency]);

    const calculateExchangeRate = (selectedCurrency, quoteCurrency) => {
        const pair = `${selectedCurrency}-${quoteCurrency}`;
        const rate = data.find((item) => item.pair === pair);

        if (rate && amount) {
            return (parseFloat(amount) * parseFloat(rate.ask)).toFixed(2);
        }

        return;
    };

    return (
        <AppContainer>
            <Title>Assessment Challenge</Title>
            <CurrencyInput
                amount={amount}
                setAmount={setAmount}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                currenciesList={currenciesList}
            />
            {!isLoading && (
                <CurrencyList
                    currenciesList={currenciesList}
                    calculateExchangeRate={calculateExchangeRate}
                    selectedCurrency={selectedCurrency}
                />
            )}
            {isLoading && <span>Loading...</span>}
        </AppContainer>
    );
};

export default App;
