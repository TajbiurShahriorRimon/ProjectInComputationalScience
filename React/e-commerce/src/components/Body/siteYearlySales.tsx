import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";

import CanvasJSReact from "../canvasJS/assets/canvasjs.react";
import {Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SiteYearlySales extends Component<any, any>{
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}order/yearlySales`);
        console.log(resp);

        if (resp.status === 200){
            this.setState({
                result: resp.data,
                loading: false,
            })
        }
        console.log(this.state.result);
    }

    render() {

        var barChart = {
            title: {
                text: "Yearly Total Sales"
            },
            animationEnabled: true,
            theme: "light2",
            data: [{
                type: "column",
                dataPoints: this.state.result.map((item: any) => {
                    return {label: item[1], y: item[0]}
                })
            }]
        }


        var pieChart = {
            title: {
                text: "Yearly Total Sales"
            },
            animationEnabled: true,
            theme: "dark2",
            data: [{
                type: "pie",
                indexLabelFontSize: 18,
                radius: 180,
                startAngle: 240,
                legendMarkerColor: "grey",
                indexLabel: "{label} - {y}",
                yValueFormatString: "###0.0\"\"",
                dataPoints: this.state.result.map((item) => {
                    return {label: item[1], y: item[0]}
                })
            }]
        }

        var resultTable;
        var table;

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            table = this.state.result.map((item) => {
                return(
                    <tr>
                        <th className="text-center"><Link to={'/order/monthlySales/'+item[1]}>{item[1]}</Link></th>
                        <th className="text-center">{item[0]}</th>
                    </tr>
                )
            })
        }

        return(
            <div className="container">
                {resultTable}

                <br/>
                <hr/>


                <Tabs defaultActiveKey="chart" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="chart" title="Chart">
                        <CanvasJSChart options={barChart} />
                        <CanvasJSChart options={pieChart}/>
                    </Tab>
                    <Tab eventKey="table" title="Table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td className="text-center">Year</td>
                                    <td className="text-center">Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                            {table}
                            </tbody>

                        </table>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default SiteYearlySales;