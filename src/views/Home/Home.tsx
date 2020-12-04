import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny, connect } from 'react-redux';
import {
    getQuotes,
    getCompanyProfile,
    addStock,
    getAllStocks,
} from '../../helpers/fetch';
import { Container, Grid } from '@material-ui/core';
import StockCard from '../../components/Card/Card';
import HeaderComponent from '../../components/Header/Header';
import { HomeContainer } from './styled';
import ModalComponent from '../../components/Modal/Modal';

interface IPrice {
    c: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

interface ICompany {
    country: string;
    currency: string;
    exchange: string;
    finnhubIndustry: string;
    ipo: string;
    logo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
}

interface StockResponseData {
    createdAt: string;
    symbol: string;
    __v: number;
    _id: string;
}

interface IMyStock {
    prices: IPrice[];
    companyData: ICompany[];
}

const Home = ({}) => {
    let priceList: any = [];
    let companyDataList: any = [];

    let updatedCompanyDataList: any = [];
    let updatedPriceList: any = [];

    const history = useHistory();
    const [inputValue, setInputValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [company, setCompany] = useState<ICompany>({
        country: '',
        currency: '',
        exchange: '',
        finnhubIndustry: '',
        ipo: '',
        logo: '',
        marketCapitalization: 0,
        name: '',
        phone: '',
        shareOutstanding: 0,
        ticker: '',
        weburl: '',
    });
    const [stock, setStock] = useState<IPrice>({
        c: 0,
        h: 0,
        l: 0,
        o: 0,
        pc: 0,
        t: 0,
    });

    const [myStockPrices, setMyStockPrices] = useState<IPrice[]>([]);
    const [myCompanyData, setMyCompanyData] = useState<ICompany[]>([]);

    const token = useSelector((state: RootStateOrAny) => state.token.token);

    useEffect(() => {
        const fetch = async () => {
            await getAllStocks(token).then((data) => {
                if (data.status === 200) {
                    data.json().then((res) => {
                        res.map(async (data: StockResponseData, i: number) => {
                            const [prices, companyData] = await Promise.all([
                                getQuotes(token, data.symbol),
                                getCompanyProfile(token, data.symbol),
                            ]);
                            prices.json().then((data) => {
                                let parsedData = JSON.parse(data);
                                priceList = myStockPrices;
                                updatedPriceList = priceList.concat(parsedData);
                                setMyStockPrices(updatedPriceList);
                            });
                            companyData.json().then((data) => {
                                let parsedData = JSON.parse(data);
                                companyDataList = myCompanyData;
                                updatedCompanyDataList = companyDataList.concat(
                                    parsedData
                                );
                                setMyCompanyData(updatedCompanyDataList);
                            });

                            console.log({ myStockPrices, myCompanyData });
                        });
                    });
                }
            });
        };

        fetch();
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        history.push('/login');
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setInputValue(value);
    };

    const onClose = () => {
        setOpen(!open);
    };

    const addStockToDB = async () => {
        try {
            await addStock(token, inputValue).then((res) =>
                console.log(res.status)
            );
        } catch (e) {
            console.error(e);
        }
    };

    const fetchData = async () => {
        setIsLoading(!isLoading);
        setOpen(!open);
        const company = await getCompanyProfile(token, inputValue).then((res) =>
            res.json().then((data) => JSON.parse(data))
        );
        const quote = await getQuotes(token, inputValue).then((res) =>
            res.json().then((data) => JSON.parse(data))
        );

        const [companyData, quoteData] = await Promise.all([company, quote]);

        setStock(quoteData);
        setCompany(companyData);
        setIsLoading(false);
    };

    return (
        <Container>
            <HomeContainer>
                <HeaderComponent
                    onChange={onChange}
                    onClick={() => fetchData()}
                    label="Los"
                    color="primary"
                    variant="contained"
                />
                <Grid container spacing={1}>
                    <Grid container item>
                        <StockCard
                            name={company.name}
                            currentPrice={stock.c}
                            openPrice={stock.o}
                            highPrice={stock.h}
                            lowPrice={stock.l}
                            closePrice={stock.pc}
                        />
                    </Grid>
                </Grid>
            </HomeContainer>
            <ModalComponent
                isLoading={isLoading}
                open={open}
                onClose={onClose}
                name={company.name}
                currentPrice={stock.c}
                openPrice={stock.o}
                highPrice={stock.h}
                lowPrice={stock.l}
                closePrice={stock.pc}
                onClick={addStockToDB}
                label="Hinzufügen"
                color="primary"
                variant="contained"
            />
        </Container>
    );
};

export default connect()(Home);

{
    /* <div>Home</div>
                <div>{stock.c}</div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={getStock}>Get Stock</button>
                    <input
                        type="text"
                        placeholder="Symbol"
                        onChange={(e) => onChange(e)}
                    />
                </div> */
}
