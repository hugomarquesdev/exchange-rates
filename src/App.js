import React, { useEffect, useState, useRef, useCallback } from "react";
import upholdSDK from "./utils/upholdSDK";
import CurrencyInput from "./components/CurrencyInput";
import CurrencyList from "./components/CurrencyList";
import { debounce } from "lodash";
import { AppContainer, Description, Loader } from "./styles/AppStyles";

const App = () => {
    const [amount, setAmount] = useState("0");
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [currenciesList, setCurrenciesList] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const cacheKey = "currencies";
                let data = localStorage.getItem(cacheKey);

                if (!data) {
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
    }, []);

    useEffect(() => {
        const refreshData = debounce(async () => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }

            try {
                setIsLoading(true);

                const data = await upholdSDK.getTicker();
                setData(data);
                localStorage.setItem("currencies", JSON.stringify(data));

                const currenciesList = data
                    .map((item) => item.pair.split("-")[1])
                    .filter((currency) => currency && currency.trim() !== "");

                setCurrenciesList([...new Set(currenciesList)]);

                setIsLoading(false);
            } catch (error) {
                console.error("Error refreshing data:", error);
                setIsLoading(false);
            }
        }, 500);

        refreshData();

        return () => {
            refreshData.cancel();
        };
    }, [selectedCurrency, amount]);

    const calculateExchangeRate = useCallback(
        (selectedCurrency, quoteCurrency) => {
            const pair = `${selectedCurrency}-${quoteCurrency}`;
            const rate = data.find((item) => item.pair === pair);

            if (rate && amount) {
                return (parseFloat(amount) * parseFloat(rate.ask)).toFixed(2);
            }
        },
        [data]
    );

    return (
        <AppContainer>
            <h1>Currency Converter</h1>
            <Description>
                Receive competitive and transparent pricing with no hidden
                spreads. See how we compare.
            </Description>
            <CurrencyInput
                amount={amount}
                setAmount={setAmount}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                currenciesList={currenciesList}
            />
            {!isLoading && amount > 0 && (
                <CurrencyList
                    currenciesList={currenciesList}
                    calculateExchangeRate={calculateExchangeRate}
                    selectedCurrency={selectedCurrency}
                />
            )}
            {isLoading && (
                <Loader>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </Loader>
            )}
        </AppContainer>
    );
};

export default App;
