
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../apis";
import { isDark } from "../atom";
const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-weight: bold;
    font-size: 48px;
`;
const Container = styled.div`
    position: relative;
    padding: 0px 20px;
    width:100%;
    max-width: 480px;
    margin:0 auto;
`;

const Header = styled.div`
    height: 10vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;
const CoinList = styled.ul`

`;
const Loader = styled.span`
    color:${props=>props.theme.accentColor};
    font-size:24px;  
    text-align: center;
    font-weight: bold;
    display:block;
    width:100%;
`;
const Coin = styled.li`
    background-color: ${({theme})=> theme.bgColor==='#2f3640' ? "rgba(0,0,0,0.5)" : "white"};
    margin-bottom: 10px;
    padding:20px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    display:flex;
    align-items: center;
    &:hover {
        background-color: ${props => props.theme.textColor};
        color : ${props => props.theme.bgColor}
    }
`;
const SetThemeButton = styled.button`
    all:unset;
    cursor: pointer;
    position: absolute;
    color:${({theme})=>theme.textColor};
    font-size: 20px;
    right:20px;
    top:40px;
`;

interface CoinI {
    id: string,
    name: string,
    
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}
const Coins = () => {
    const [isDarkTheme,setIsDark] = useRecoilState(isDark);
    const toggleTheme = () => setIsDark(prev=>!prev);
    const {isLoading:loading, data:coins} = useQuery<CoinI[]>("allCoins",fetchCoins);
    /*const [coins, setCoins] = useState<CoinI[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const requestCoin = async () => {
            await fetch("https://api.coinpaprika.com/v1/coins").then(async (res) => {
                const json = await res.json();
                setCoins(json.slice(0,100));
                setLoading(false);
            }
            );
        }
        requestCoin();
    }, []);*/
    return (
        <Container>
            <SetThemeButton onClick={()=>toggleTheme()}>{isDarkTheme ? "Light Mode" : "Dark Mode"}</SetThemeButton>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : 
            <CoinList>
                {coins?.slice(0,100).map((coin) =>
                    <Link to={`/${coin.id}`} 
                        key={coin.id}
                        state={{name:coin.name}}
                        >
                        <Coin>
                            <img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} style={{width:"35px",height:"35px",marginRight:"10px"}} alt={coin.name}/>
                            {coin.name} &rarr;
                        </Coin>
                    </Link>)
                }
            </CoinList>
            }
        </Container>
    )
}
export default Coins;