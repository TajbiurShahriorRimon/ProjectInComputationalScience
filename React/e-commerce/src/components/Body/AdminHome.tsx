import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import base_url from '../../api/bootapi';



const AdminHome = () => {

    useEffect(()=>{
        getActiveUsers();
        getInActiveUsers();
        getTodaysSale();
        getTotalSale();

      },[]);

      const [activeUser,setActiveUser] = useState({
        user:""
      });

      const getActiveUsers = () => {
          axios.get(`${base_url}activeUser`).then(
              (response) => {
                  console.log(response.data);
                  setActiveUser({user:response.data});
              },
              (error) => {
    
              }
    
          );
        };

        const [inActiveUser,setInActiveUser] = useState({
            user:""
          });
    
          const getInActiveUsers = () => {
              axios.get(`${base_url}inActiveUser`).then(
                  (response) => {
                      console.log(response.data);
                      setInActiveUser({user:response.data});
                  },
                  (error) => {
        
                  }
        
              );
            };

            const [todaysSale,setTodaysSale] = useState({
                value:""
              });
        
              const getTodaysSale = () => {
                  axios.get(`${base_url}todaysSale`).then(
                      (response) => {
                          console.log(response.data);
                          setTodaysSale({value:response.data});
                      },
                      (error) => {
            
                      }
            
                  );
                };

                const [totalSale,setTotalSale] = useState({
                    value:""
                  });
            
                  const getTotalSale = () => {
                      axios.get(`${base_url}totalSale`).then(
                          (response) => {
                              console.log(response.data);
                              setTotalSale({value:response.data});
                          },
                          (error) => {
                
                          }
                
                      );
                    };


return (
        <div className='container'>

            <div className="row justify-content-lg-start">
                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} border="primary" className="box">
                        <Card.Body>
                            <Card.Title>Active Users</Card.Title>
                            <Card.Body>{activeUser.user}</Card.Body>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} border="danger" className="box">
                        <Card.Body>
                            <Card.Title>Inactive Users</Card.Title>
                            <Card.Body>{inActiveUser.user}</Card.Body>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} border="info" className="box">
                        <Card.Body>
                            <Card.Title>Todays Sales</Card.Title>
                            <Card.Body>{todaysSale.value}&nbsp;TK</Card.Body>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} border="success" className="box">
                        <Card.Body>
                            <Card.Title>Total Sales</Card.Title>
                            <Card.Body>{totalSale.value}&nbsp;TK</Card.Body>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </div>
    )
}
export default AdminHome;