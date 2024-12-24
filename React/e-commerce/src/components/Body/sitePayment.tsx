import React, {useEffect, useState} from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CheckoutForm from "../Forms/CheckoutForm";
import axios from "axios";
import base_url from "../../api/bootapi";

const SitePayment = (e:any) => {
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const fetchStripe = async () => {
            const stripeInstance = await loadStripe('pk_test_51MaawyE63ffCwk3JRqrSNoMxVHFmjGOXE0ztrfRYDnBppg9SbKMSjxSDdnyvnazAOtyL9e41LvChCt8p8WxgoQQc00yAuaZw7s')
            setStripePromise(stripeInstance);
        }
        fetchStripe();
        getClientSecretKey();
    }, []);

    const getClientSecretKey = async () => {
      var val = localStorage.getItem("totalPrice")
      
      alert(val)
      var data = {
            //amount: 6000.33
            amount: val == null ? 0: parseFloat(val) * 100
          }
          //var response = await axios.post(`${base_url}Payment`, data);
          var response = await axios.post(`https://localhost:7167/api/Payment`, data);
          console.log(response);
          setClientSecret(response.data.clientSecret);
    }


    return (
        <>
          <h1>React Stripe and the Payment Element</h1>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </>
      );

};

export default SitePayment;