import CanvasJSReact from "../canvasJS/assets/canvasjs.react";
import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SiteCategoryProductsCount extends Component<any, any>{
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}getCountProduct`);
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
                text: "Number of Products"
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
                text: "Number of Products"
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

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }

        return(
            <div className="container">
                {resultTable}
                <CanvasJSChart options={barChart} />
                <br/>
                <hr/>
                <CanvasJSChart options={pieChart}/>
            </div>
        )
    }
}

export default SiteCategoryProductsCount;