import { useQuery } from "react-query";
import { fetchCoinHistory } from "../apis";
import ApexChart from 'react-apexcharts';

interface IHistroical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
const Chart = ({coinID}:{coinID:string}) => {
    const {isLoading,data} = useQuery<IHistroical[]>(["ohlcv",coinID],()=>fetchCoinHistory(coinID));
    return (<div>
        {isLoading?"Loading Chart..." : <ApexChart 
        type="line"
        series={[{
            name:"price",
            data: data?.map(price=>Math.round(price.close))
        }]}
        options={{
            theme:{
                mode:"dark"
            },
            chart:{
                height:500,
                width:500,
                background: "rgba(0,0,0,0)",
            },
            stroke: {
                width:[5,5],
                curve:"smooth" 
            },
            fill: {
                type:"gradient",
                gradient:{
                    gradientToColors:["#20bf6b"],stops:[0,100]
                }
            },
            colors:["#0fb9b1"]
            ,
            grid: {
                show:false
            },
            yaxis:{
                show:false
            },
            xaxis: {
                labels:{
                    show:false
                },
                axisBorder:{
                    show:false
                },
                axisTicks:{
                    show:false
                }
                ,
                categories:data?.map(date=>{
                    const time = new Date(date.time_open);
                    const year = time.getFullYear();
                    const month = time.getMonth();
                    const day = time.getDate();
                    return `${year}-${month+1}-${day}`;
                }),
                     
            },
            
        }
        }
        />
        }
    </div>);
}
export default Chart;