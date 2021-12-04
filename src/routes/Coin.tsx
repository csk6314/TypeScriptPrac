import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams,Navigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

interface InfoDataI {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
    error?:string;
}
interface PriceDataI {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_15m: number;
        percent_change_30m: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_12h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_1y: number;
        ath_price: number;
        ath_date: string;
        percent_from_price_ath: number;
    }
}

const Container = styled.div`
    padding: 0px 20px;
    color : ${props => props.theme.textColor};
    width:100vw;
`;
const Header = styled.div`
    height: 10vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-weight: bold;
    font-size: 48px;
`;
const Loader = styled.span`
    color:${props => props.theme.accentColor};
    font-size:24px;  
    text-align: center;
    font-weight: bold;
    display:block;
    width:100%;
`;
const Overview = styled.div` 
    background-color: ${props => props.theme.accentColor};
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 25px;
    border-radius: 10px;
`;
const OverviewItem = styled.div` 
    color:white;
    display:flex;
    flex-direction: column;
    text-align: center;
    span:first-child{
        text-transform: uppercase;
        margin-bottom: 10px;
    }
`;
const Description = styled.p` 
    font-size: 18px;
    color : ${props => props.theme.textColor};
    padding:0 5px;
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0;
    gap:10px;
    justify-items: center;
`;
const Tab = styled.span<{isActive ?: boolean}>`
    max-width: 300px;
    width: 100%;
    text-align: center;
    color:white;
    background-color: ${({theme,isActive}) => isActive ? "#574b90" : theme.accentColor};
    padding: 10px;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color:#574b90;
    }
    a{
        display: block;
    }
`;


const Coin = () => {
    const [loading, setLoading] = useState(true);
    const { coinID } = useParams();
    const { state,pathname } = useLocation();
    const [info, setInfo] = useState<InfoDataI>();
    const [priceInfo, setPriceInfo] = useState<PriceDataI>();
    useEffect(() => {
        const requestData = async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        }
        requestData();
    }, [coinID])
    return (<>
        {loading ? <Loader>Loading...</Loader> :
            info?.error ? <Loader>Coin Not Found</Loader> :
            <Container>
                <Header>
                    <Title>{state?.name ? state.name : (loading ? "Loading..." : info?.name)}</Title>
                </Header>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{info?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>{info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Type:</span>
                        <span>{info?.type}</span>
                    </OverviewItem>
                </Overview>
                <div style={{ margin: "20px 0" }}>
                    <h2 style={{ fontSize: "20px", padding: "0 5px", marginBottom: "5px", fontWeight: "bold" }}>Description</h2>
                    <Description>
                        {info?.description}
                    </Description>
                </div>
                <Overview>
                    <OverviewItem>
                        <span>TotalSupply:</span>
                        <span>{priceInfo?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>MaxSupply:</span>
                        <span>{priceInfo?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={pathname===`/${coinID}/price`}>
                        <Link to="./price">
                        Price
                        </Link>
                    </Tab>
                    <Tab isActive={pathname===`/${coinID}/chart`}>
                        <Link to="./chart">
                        Chart
                        </Link>
                    </Tab>
                </Tabs>
                <Routes>
                    <Route path="/" element={<></>}/>
                    <Route path="/price" element={<Price/>}/>
                    <Route path="/chart" element={<Chart/>}/>
                    <Route path="*" element={<Navigate to="."/>}/>
                </Routes>
            </Container>
        }
    </>);
}
export default Coin;