import React from 'react';
import { Button,ListGroup,ListGroupItem } from 'reactstrap';


function RegOption(){
    return(
        <div className='text-center'>
            

            <div className="list-group position-absolute top-50 start-50 w-50">
                
                <a href="/uReg" className="list-group-item list-group-item-action translate-middle bg-primary text-light">User Registration</a>
                <a href="/uVendorReg" className="list-group-item list-group-item-action translate-middle bg-primary text-light">Vendor Registration</a>
            </div>
        </div>
    )

}
 export default RegOption;