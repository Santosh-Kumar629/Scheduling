import React,{Component} from 'react'
class Table extends Component{
    constructor(props){
        super(props)
        this.state={
            user:[],
            isloading:false,
            isError:false
        }
    }
}

async componentDidMount(){
    this.setState({isloading:true})
    const response = await fetch("http://amazon.watsoo.com/watsoo-amazon-api//trip-controller-web/v1/vehicle/wise/summary/36");
    if(response.ok){
        const users = await response.json()
        this.setState({users,isloading:false})
        
    }else
    {
        this.setState({isError:true,isloading:false});
    }
}
renderTableHeader=()=>{
    return Object.keys(this.state.users[0]).map(attr=><th key={attr}>
        {attr.UpperCase()}
    </th>)
}
renderTableRows=()=>{
    return this.state.users.map(user=>{
        return(
            <tr key={user.Tripno}>
               <td>{user.Tripno}</td>
               <td>{user.TripStartstoTripEnd}</td>
               <td>{user.Drivername}</td>
               <td>{user.TripExpenses}</td>
               <td>{user.Tripkm}</td>
               <td>{user.TripGPSkm}</td>
               <td>{user.TripTime}</td>
               <td>{user.OdometerReading}</td>
               <td>{user.Action}</td>
            </tr>   

        )
    })

}
render(){
    const{users,isloading,isError}=this.state
    if(isloading){
        return<div>Loading...</div>
    }
    if(isError){
        return <div>Error..</div>
    }
    return users.length>0?(
        <table>
            <thead>
                <tr>
                    {this.renderTableHeader}
                </tr>
            </thead>
            <tbody>
                {this.renderTableRows}
            </tbody>
        </table>
    ):(
        <div>No users</div>
    )
}