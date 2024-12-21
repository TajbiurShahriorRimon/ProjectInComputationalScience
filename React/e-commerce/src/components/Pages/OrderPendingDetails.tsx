import React from "react";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import OrderPendingSalesDetails from "../Body/OrderPendingSalesDetails";

const OrderPendingDetails = () => {
    return(
        <div>
            <AdminNavbar/>
            <OrderPendingSalesDetails/>
        </div>
    )
}

export default OrderPendingDetails;