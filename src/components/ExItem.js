import React,{Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { Alert } from 'react-alert';
class ExItem extends Component{
    constructor(){
        super();
        var nowdate = new Date();
        nowdate.setDate(nowdate.getDate() + 7);
        this.state = {
            startDate: nowdate,
            endDate: nowdate,
            pickerDisabled:false,
            fieldDisabled:true,
            des:"",
            jus:"",
            quant:"",
            amount:""
        };
        this.getData = this.getData.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.ItemChange = this.ItemChange.bind(this);
        this.desChange = this.desChange.bind(this);
        this.jusChange = this.jusChange.bind(this);
        this.quantChange = this.quantChange.bind(this);
        this.amountChange = this.amountChange.bind(this);
    }

    
    getData(){
        /*console.log(this.refs.sel1.value);
        console.log(this.refs.des.value);
        console.log(this.refs.jus.value);
        console.log(this.refs.quantity.value);
        console.log(this.refs.amount.value);
        console.log(this.refs.fromdate.value);
        console.log(this.refs.todate.value);*/
        var res = {};
        var amtObj= this.refs.amount;
        res["err"] =0;
        res["message"]="";
        res["data"]={};
        if(this.refs.length!=0&& typeof amtObj !="undefined"){
            console.log(this.refs.length);
        
            const amount = this.refs.amount.value;
            const des = this.refs.des.value;
            const jus = this.refs.jus.value;
            if(+amount<10||+amount>2000){
                res["err"]=1;
                res["message"]="The Estimated Amount should between 10 to 2000";
            }
            if(des.length>30){
                res["err"]+=1;
                res["message"]+="The description are limited in 30 characters";

            }
            if(jus.length>20){
                res["err"]+=1;
                res["message"]+="The justification are limited in 20 characters";

            }
            const data = {
                "ItemName":this.refs.sel1.value,
                "Description":this.refs.des.value,
                "Justification":this.refs.jus.value,
                "Quantity":this.refs.quantity.value,
                "TotalAmount":this.refs.amount.value,
                "fromDate":this.state.startDate,
                "toDate":this.state.endDate
                }
                res["data"]=data;
        }
        return res;
    }
    
    render(){
        return(
            <tr>
                        <td>
                            <select className="form-control" onChange ={this.ItemChange} style={{width: '150px'}} ref ="sel1" name="sel1">
                            <option>Travel</option>
                            <option>Stay</option>
                            <option>Office Items</option>
                            <option>Other</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" value = {this.state.des} onChange = {this.desChange} name="des" ref="des"/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value = {this.state.jus} onChange = {this.jusChange} name="jus" ref="jus"/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value = {this.state.quant} disabled ={this.state.fieldDisabled} onChange ={this.quantChange} name="quantity" ref="quantity"/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value = {this.state.amount} onChange = {this.amountChange} name="amount" ref="amount"/>
                        </td>
                
                        <td>
                            
                                    <DatePicker className="form-control"
                                            selected={this.state.startDate}
                                            onChange={this.handleFromChange}
                                            disabled={this.state.pickerDisabled}
                                        />
                                   
                        </td>
                        <td>
                                <DatePicker className="form-control"
                                            selected={this.state.endDate}
                                            onChange={this.handleToChange}
                                            disabled={this.state.pickerDisabled}
                                        />
                        </td>
            </tr>
        )
    }
    handleFromChange = date => {
        var nowdate = new Date();
        nowdate.setDate(nowdate.getDate() + 6);
        if(date < nowdate){
            alert("Start date is allowed in a week from now");
        }else{
            this.setState({
                startDate: date,
                endDate: date
            });
        }
        
      };
    handleToChange = date => {
    
        if(this.state.startDate > date){
            alert(" End date should be later than start date");
        }else{
            this.setState({
                endDate: date
            });
        }
    
    };
    ItemChange(e){
        var val = e.target.value;
        var nowdate = new Date();
        nowdate.setDate(nowdate.getDate() + 7);
        if(val==="Office Items"||val==="Other"){
            console.log(val);
            this.setState({
                pickerDisabled: true,
                startDate: "",
                endDate: "",
                fieldDisabled:false
            });
        }else{
            this.setState({
                pickerDisabled: false,
                startDate: nowdate,
                endDate: nowdate,
                fieldDisabled:true
            });
        }
    }
    jusChange(e){
        var val = e.target.value;
        if(!isNaN(val)){
            alert("only characters is allowed");
            this.setState({jus: ""});
        }else{
            this.setState({jus: val});
        }
    }
    desChange(e){
        var val = e.target.value;
        if(!isNaN(val)){
            alert("only characters is allowed");
            this.setState({des: ""});
        }else{
            this.setState({des: val});
        }
    }
    quantChange(e){
        var val = e.target.value;
        if(isNaN(val)){
            alert("only number is allowed");
            this.setState({quant: ""});
        }else{
            this.setState({quant: val});
        }
        console.log("quantity change");
    }
    amountChange(e){
        var val = e.target.value;
        if(isNaN(val)){
            alert("only number is allowed");
            this.setState({amount: ""});
        }else{
            if(+val<10||+val>2000){
                console.log("over range");
            }
            this.setState({amount: val});
        }
        
    }
}
export default ExItem;