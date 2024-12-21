import CanvasJSReact from "../canvasJS/assets/canvasjs.react";
import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Tab, Tabs} from "react-bootstrap";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SiteProductDailySales extends Component<any, any>{
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var year = window.location.href.split('/').slice(-3)[0];
        var month = window.location.href.split('/').slice(-2)[0];
        var prod_id = window.location.href.split('/').slice(-1)[0]
        //alert(window.location.pathname.split("/").pop());
        const resp = await axios.get(`${base_url}product/dailySales/`+year+'/'+month+'/'+prod_id);
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
                text: "Daily Sales"
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

        var lineChart = {
            title: {
                text: "Daily Sales"
            },
            animationEnabled: true,
            theme: "light1",
            backgroundColor: "#F5DEB3",
            data: [{
                type: "line",
                dataPoints: this.state.result.map((item: any) => {
                    return {label: item[1], y: item[0]}
                })
            }]
        }

        var pieChart = {
            title: {
                text: "Daily Sales"
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
                        <th className="text-center">{item[1]}</th>
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
                        <CanvasJSChart options={lineChart} />
                        <CanvasJSChart options={barChart} />
                        <CanvasJSChart options={pieChart}/>
                    </Tab>
                    <Tab eventKey="table" title="Table">
                        <table className="table">
                            <thead>
                            <tr>
                                <td className="text-center">Day</td>
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

export default SiteProductDailySales;