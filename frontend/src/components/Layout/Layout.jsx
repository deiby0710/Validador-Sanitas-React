import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
    return(
        <div className="layout-root">
            <Header/>
            <main className="layout-main flex-grow-1 d-flex justify-content-center align-items-center">
                <Outlet/>
            </main>
        </div>
    )
}