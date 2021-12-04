import { BrowserRouter, Routes , Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

const Router = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Coins/>}/>
            <Route path="/:coinID/*" element={<Coin/>}/>
        </Routes>
    </BrowserRouter>)
}
export default Router;