import React, {Component} from 'react';
import axios from 'axios';
import ExItem from  './ExItem';
import history from './History';
class AddExItem extends Component{
    constructor(){
        super();
        this.state={
            numItem:1,
            name:"",
            del:false
        };
        this.ItemComp=[];
        this.children=[];
        this.onSubmit = this.onSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.addRef = this.addRef.bind(this);
        this.addRequest = this.addRequest.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.state.message="";
    }
    addRef(ref){
        if(this.state.del){
            console.log(ref);
            //var len = this.ItemComp.length;
            //this.ItemComp.splice(len-1,1);
            //ref = null;
        }else{
            this.ItemComp.push(ref);
        }
        
    }
    
    addItem(){
        //const target = document.getElementById('target');
        //console.log(target);
        this.setState({numItem: this.state.numItem+1,
                       del:false
        });
        //this.getRowData();
    }
    delItem(){
        var len = this.ItemComp.length;
        this.ItemComp.splice(len-1,1);
        console.log(this.ItemComp);
        if(this.state.numItem>1){
            
            this.setState({numItem: this.state.numItem-1,
                           del:true
            });
            
            
        }
        console.log("===");
        console.log(this.ItemComp);
        
        
    }
    getRowData(){
        var RowsData = [];
        const cnt = this.ItemComp.length;
        console.log(this.ItemComp);
        var errNum = 0;
        var message="";
        for(var i = 0;i<cnt;i++){
           // RowsData.push(this.children[i].getData());
           if(this.ItemComp[i]!=null){
           
                var item = this.ItemComp[i].getData();
                console.log(item);
                
                errNum=errNum+item['err'];
                if(item['err']===0){
                    RowsData.push(item['data']);
                }
                if(item['err']>0)
                    message=message+" , row: "+(i+1)+" : "+ item['message']+" ;";
            }
        }
        //console.log(this.ItemComp);
        //console.log(RowsData);
        const name = this.refs.name.value;
        const email = this.refs.email.value;
        if(name.length===0){
            message+="Requestor name can't be blank !";
            errNum+=1;
        }
        if(email.length===0){
            message+="Email address can't be blank !";
            errNum+=1;
        }else{
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isValid = re.test(String(email).toLowerCase());
            if(!isValid){
                message+="Email address format is incorrect !";
                errNum+=1;
            }
            
        }

        var res ={};
        res['errNum']=errNum;
        res['message']=message;
        res['data'] = RowsData;
       
        return res;
        
    }
    addRequest(newReq){
        axios.request({
            method:'post',
            url:"http://localhost:3000/api/Requests",
            data:newReq
        })
        .then(response =>{
            history.push('/home');
        })
        .catch(err=>console.log(err));
    }
    
    onSubmit(){
        //console.log(this.refs.curdate.innerHTML);
        //console.log(this.ItemComp[0].getData());
        const rowData = this.getRowData();
        console.log(rowData);
        if(+rowData['errNum']>0){
            this.setState({message:rowData["message"]});
        }else{
            //console.log(items);
                const res = {   "requestor":this.refs.name.value,
                "email":this.refs.email.value,
                "requestDate":this.refs.curdate.innerHTML,
                "expensesItems":rowData['data']
                

                };
                this.addRequest(res);
                this.ItemComp=[];
        }
        
        
        //e.preventDefault();
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        // remove event listener
    }
    
    render(){
        this.childArray = [];
        for(var i = 1; i< this.state.numItem;i+=1){
            this.childArray[i]=<ExItem key={i} number={i} ref={this.addRef}></ExItem>;
            //this.childArray.push(i);
            //this.childArray.push(ExItem);
        }
        return(
            <div>
            <div className="col-sm-4">
               
                <div className="form-group">
                    <label >Requestor</label>
                
                    <input type="text" name = "name"  value = {this.state.name} onChange={this.nameChange} className="form-control" ref="name"/>
                    
                </div>
                <div className="form-group">
                <label >Email address:</label>
                <input type="email" name="email" className="form-control" ref="email"/>
                </div>
                <p id="curdate" name="curdate" ref ="curdate"></p>
            </div>
            <div className="col-sm-4">
            <label value="err">{this.state.message}</label>
            </div>
            <div className="col-sm-12">
                <div className="form-group"><button id="add" onClick={this.addItem} className="btn btn-primary" ><i className="glyphicon glyphicon-plus"></i></button>
                <button id="minus" onClick={this.delItem} className="btn btn-primary" ><i className="glyphicon glyphicon-minus"></i></button>
                </div>
                <table className = "table">
                    <thead>
                    <tr>
                        <th>Expense Item</th>
                        <th>Description</th>
                        <th>Justification</th>
                        <th>Quantity</th>
                        <th>Estimated Amount</th>
                        <th>Date from</th>
                        <th>Date to</th>
                    </tr>
                    </thead>
                    <tbody id="target">
                        <ExItem key={0} number={0} ref={(ref) => this.ItemComp[0] = ref}/>
                        
                    </tbody>
                    <tbody>{this.childArray}</tbody>
                </table>
                <div><button id="submit" onClick ={this.onSubmit} className="btn btn-primary" >submit</button></div> 
            </div>
            </div>
        );
    }
    nameChange(e){
        var val = e.target.value;
        if(!isNaN(val)){
            alert("only characters is allowed");
            this.setState({name: ""});
        }else{
            this.setState({name: val});
        }
    }
}
export default AddExItem;
//<!-- <Parent ref={(ref) => this.parentCom = ref}> {this.children} </Parent> -->
//<ExItem number={0} ref={(ref) => this.ItemComp[0] = ref}></ExItem>
class Parent extends React.Component{
    constructor(){
        super();
        this.getData = this.getData.bind(this);
    }
    getData(){
        const RowsData = [];
        
        /*React.Children.forEach(this.props.children, child =>{
            RowsData.push(child.getData());
        })
        console.log(RowsData);*/
        return RowsData;
    }
    render(){
        return (<tbody id="target">{this.props.children}</tbody>);
    }
}

