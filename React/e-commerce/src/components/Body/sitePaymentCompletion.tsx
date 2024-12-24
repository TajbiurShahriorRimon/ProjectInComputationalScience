import React, {Component, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import base_url from "../../api/bootapi";
const Completion = () => {
    var navigate = useNavigate();
    var val = localStorage.getItem("totalPrice")

    const[paymentCompletionVal, setPaymentCompletionVal] = useState({
        orderData: {
            customer: {
                id: localStorage.getItem("userId_session") //1 //session_userId local_storage
            },
            totalPrice: val == null ? 0: parseFloat(val),
            date: "dummy date",
            status: "pending"
        }
    })

    useEffect(() => {
        let token= "Bearer "+localStorage.getItem("token");
        //console.log(token);        
        orderProduct();
    }, [])  
    
    const orderProduct = async () => {
        const resp = await axios.post(`${base_url}order`, paymentCompletionVal.orderData);
        //console.log(resp);
        var order_id = resp.data; //getting the order_id which will be used for insertion for sales items
        if(resp.status == 201){
            //alert("Success");
            await salesItem(order_id);
        }
    }

    //This function is not needed anymore
    const salesItem = async (order_id: any) => {
        var array = JSON.parse(localStorage.getItem("shoppingCart") || '{}');
        for(let i = 0; i < array.length; i++){
            array[i].order.id = order_id;
        }
        const response = await axios.post(`${base_url}sales`, array);
        if(response.status == 201){
            //After successful insertion, we have to remove the session
            alert("Successfully Purchased");            
            localStorage.removeItem("shoppingCart"); //removing the shopping cart session
            localStorage.removeItem("totalPrice");
        }
    }
    return (
        <h1>Thank you! 🎉</h1>
    );    
  }
  
export default Completion;