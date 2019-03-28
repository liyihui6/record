import React,{Component} from 'react'
import './Credit.css'

class Credit extends Component{
    constructor(props){
        super(props)
        this.state = {
            money:0,
            titleStyle:'',
            contentStyle:''
        }
    }

    render() {
        return (
            <div className={"card"}>
                <div className={"title"} style={{background:this.props.color}}><span style={{marginLeft:'10px'}}>Credit</span></div>
                <div className={"content"}><span className={"money"}>￥</span><span style={{marginLeft:'10px'}}>{this.props.money}</span></div>
            </div>
        )
    }
}

export default Credit
