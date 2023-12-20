import React, { useEffect, useState } from "react";
import styled from "styled-components";
import upholdSDK from "./utils/upholdSDK";

const AppContainer = styled.div`
    text-align: center;
    margin: 20px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

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

const App = () => {
    const [amount, setAmount] = useState("0");
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [currenciesList, setCurrenciesList] = useState([]);
    const [data, setData] = useState([]);
    const [debouncedSelectedCurrency, setDebouncedSelectedCurrency] =
        useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const cacheKey = "currencies";
                const cachedData = localStorage.getItem(cacheKey);

                let data;

                if (cachedData) {
                    data = JSON.parse(cachedData);
                } else {
                    data = await upholdSDK.getTicker();
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                }

                setData(data);

                const currenciesList = data.map(
                    (item) => item.pair.split("-")[1]
                );

                setCurrenciesList([...new Set(currenciesList)]);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const refreshData = async () => {
            try {
                setIsLoading(true);

                const fetchedCurrencies = await upholdSDK.getTicker();
                localStorage.setItem(
                    "currencies",
                    JSON.stringify(fetchedCurrencies)
                );

                setData(fetchedCurrencies);
                setIsLoading(false);
            } catch (error) {
                console.error("Error refreshing data:", error);
                setIsLoading(false);
            }
        };

        if (debouncedSelectedCurrency) {
            refreshData();
        }
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
        console.log("Calculating for pair:", selectedCurrency, quoteCurrency);

        const pair = `${selectedCurrency}-${quoteCurrency}`;
        const rate = data.find((item) => item.pair === pair);

        if (rate && amount) {
            console.log("Rate found:", rate);
            return (parseFloat(amount) / parseFloat(rate.ask)).toFixed(2);
        } else {
            console.log("Rate not found for pair:", pair);
        }

        return;
    };

    return (
        <AppContainer>
            <Title>Assessment Challenge</Title>
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
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <CurrencyListContainer>
                    {currenciesList.map(
                        (quoteCurrency, index) =>
                            calculateExchangeRate(
                                selectedCurrency,
                                quoteCurrency
                            ) && (
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
            )}
        </AppContainer>
    );
};

export default App;
