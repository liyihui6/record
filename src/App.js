import React, { Component } from 'react';
import './App.css';
import Credit from './component/Credit/Credit'
import Debit from './component/Debit/Debit'
import Balance from './component/Balance/Balance'
import {Input,Button,Divider} from "antd";
import Storage from './LocalStorage/Storage'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      records:[
      ],
      income:0,
      expenditure:0,
      TempDate:'',
      TempTitle:'',
      TempAmount:'',
      EditDate:'',
      EditTitle:'',
      EditAmount:'',
    }
  }
  componentWillMount() {
    let data = []
    data = Storage.get('records')
    let income = 0
    let expenditure = 0
    if (data.length>0){
      data.map((value,index)=>{
        if (value.Amount > 0){
          income += Number(value.Amount)
        } else {
          expenditure += Number(value.Amount)
        }
        return null
      })
    }
    this.setState({
      records:data,
      income:income,
      expenditure:expenditure
    })
  }

  dateHanddle = (e)=>{
    this.setState({
      TempDate:e.target.value
    })
  }
  titleHanddle = (e)=>{
    this.setState({
      TempTitle:e.target.value
    })
  }
  amountHanddle = (e)=>{
    this.setState({
      TempAmount:e.target.value
    })
  }
  submit = ()=>{
    let record = {
      Date:this.state.TempDate,
      Title:this.state.TempTitle,
      Amount:this.state.TempAmount,
      Editing:false
    }
    Storage.add('records',record)
    let money = this.state.TempAmount
    let newIncome = this.state.income
    let newExpenditure = this.state.expenditure
    if (money > 0){
      newIncome += Number(money)
    } else {
      newExpenditure += Number(money)
    }
    let newRecords = this.state.records
    newRecords.push(record)
    this.setState({
      records:newRecords,
      income:newIncome,
      expenditure:newExpenditure,
      TempDate:'',
      TempTitle:'',
      TempAmount:''
    })
  }
  Delete = (Date,Title,Amount) => {
    let newIn = this.state.income
    let newEx = this.state.expenditure
    if (Amount > 0){
      newIn -= Number(Amount)
    } else {
      newEx -= Number(Amount)
    }
    this.setState({
      records:this.state.records.filter((item)=>{
        if (item.Date === Date && item.Title === Title && item.Amount === Amount){
          return null
        } else {
          return item
        }
      }),
      income:newIn,
      expenditure:newEx
    })
    Storage.delete('records',{Date:Date, Title:Title, Amount:Amount,Editing:false})
  }
  edit = (Date,Title,Amount)=>{
    let temp = []
    this.state.records.forEach((item)=>{
      if (item.Date === Date && item.Title === Title && item.Amount === Amount){
        let p = {Date:item.Date,Title:item.Title,Amount:item.Amount,Editing:true}
        temp.push(p)
      } else {
        temp.push(item)
      }
  })
    this.setState({
      records:temp,
      EditDate:Date,
      EditTitle:Title,
      EditAmount:Amount
    })
  }
  DateChange = (e)=>{
    this.setState({
      EditDate:e.target.value
    })
  }
  TitleChange = (e)=>{
    this.setState({
      EditTitle:e.target.value
    })
  }
  AmountChange = (e)=>{
    this.setState({
      EditAmount:e.target.value
    })
  }
  saveEdit = (Date,Title,Amount,uid)=>{
    let record = {
      Date:this.state.EditDate,
      Title:this.state.EditTitle,
      Amount:this.state.EditAmount,
      Editing:false
    }
    let oldMoney = Amount
    let money = this.state.EditAmount
    let newIncome = this.state.income
    let newExpenditure = this.state.expenditure
    if (oldMoney > 0){
      newIncome -= Number(oldMoney)
    } else {
      newExpenditure -= Number(oldMoney)
    }
    if (money > 0){
      newIncome += Number(money)
    } else {
      newExpenditure += Number(money)
    }
    let newRecords = this.state.records
    console.log(uid)
    newRecords.forEach((item,index)=>{
      if (index===uid){
        item['Date'] = record['Date']
        item['Title'] = record['Title']
        item['Amount'] = record['Amount']
        item['Editing'] = record['Editing']
      }
    })
    // console.log(newRecords)
    this.setState({
      records:newRecords,
      income:newIncome,
      expenditure:newExpenditure,
      EditDate:'',
      EditTitle:'',
      EditAmount:''
    })
    Storage.update('records',{Date:Date, Title:Title, Amount:Amount,Editing:false},record)
  }
  render() {
    return (
      <div className="App">
        <h1 style={{marginLeft:"30px"}}>Records</h1>
        <div className={"records"}>
          <div className={"record"}>
            <Credit color={"darkseagreen"} money={this.state.income+this.state.expenditure}></Credit>
          </div>
          <div className={"record_palevioletred"}>
            <Debit color={"palevioletred"} money={this.state.expenditure}></Debit>
          </div>
          <div className={"record_dodgerblue"}>
            <Balance color={"dodgerblue"} money={this.state.income}></Balance>
          </div>
        </div>
        <div className={'createRecord'}>
          <div className={'input'}>
            <Input placeholder={"Date"} onChange={this.dateHanddle} value={this.state.TempDate}/>
          </div>
          <div className={'input'}>
            <Input placeholder={"Title"}  onChange={this.titleHanddle} value={this.state.TempTitle}/>
          </div>
          <div className={'input'}>
            <Input placeholder={"Amount"} type={"number"} onChange={this.amountHanddle} value={this.state.TempAmount}/>
          </div>
          <div className={'input'}>
            <Button type="primary" onClick={this.submit}>Create Record</Button>
          </div>
        </div>
        <Divider></Divider>
        <div className={"table"}>
          <div className={"title"}>
            <span className={"titleChild"}>Date</span>
            <span className={"titleChild"}>Title</span>
            <span className={"titleChild"}>Amount</span>
            <span className={"titleChild"}>Action</span>
          </div>
          <div className={"tableContent"}>
            {
              this.state.records.map((item,uid)=>{
                return !item.Editing?(
                    <div className={"tablecontent"} key={uid}>
                      <span className={"contentChild"}>{item.Date}</span>
                      <span className={"contentChild"}>{item.Title}</span>
                      <span className={"contentChild"}>￥ {item.Amount}</span>
                      <span className={"contentChild"}><Button type={"primary"} style={{margin:"0 20px"}} onClick={this.edit.bind(this,item.Date,item.Title,item.Amount)}>Edit</Button><Button onClick={this.Delete.bind(this,item.Date,item.Title,item.Amount)} type={"danger"}>Delete</Button></span>
                    </div>
                ):(
                    <div className={"tablecontent"} key={uid}>
                      <span className={"contentChild"}><Input value={this.state.EditDate} onChange={this.DateChange}/></span>
                      <span className={"contentChild"}><Input value={this.state.EditTitle} onChange={this.TitleChange}/></span>
                      <span className={"contentChild"}><Input value={this.state.EditAmount} onChange={this.AmountChange}/></span>
                      <span className={"contentChild"}><Button style={{margin:"0 20px"}} onClick={this.saveEdit.bind(this,item.Date,item.Title,item.Amount,uid)} type={"primary"}>Save</Button></span>
                    </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
