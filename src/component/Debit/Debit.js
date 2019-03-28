import React,{Component} from 'react'
import './Debit.css'

class Debit extends Component{
    constructor(props){
        super(props)
        this.state = {
            titleStyle:'',
            contentStyle:''
        }
    }

    render() {
        return (
            <div className={"card"}>
                <div className={"title"} style={{background:this.props.color}}><span style={{marginLeft:'10px'}}>Expenditure</span></div>
                <div className={"content"}><span className={"money"}>￥</span><span style={{marginLeft:'10px'}}>{this.props.money}</span></div>
            </div>
        )
    }
}

export default Debit
