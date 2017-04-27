import React, {Component} from 'react';
import { Link } from 'react-router';
const queryString = require('query-string');
class List extends Component {

       constructor() {
        super();
        this.state = {
            data: []
        };
        this.getDataList();
       }

      getDataList(){
      fetch('http://127.0.0.1:3500/api/user/getUsers', {
            "method": "POST",
        }).then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({data: json.data});
        }).catch(function(err) {
             alert(err);
        });
      }

      doDelete(event){
        const {id} = event.target;
        let data = { _id : id};
        let fetchData = { 
            method: 'POST', 
            body: queryString.stringify(data),
            headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
            })
        }
        fetch('http://127.0.0.1:3500/api/user/delete', fetchData).then((response) => {
            return response.json()
        }).then((json) => {
              if(json != '' && json != null){
                alert('Delete successfully.');
                location.reload();
              }
        }).catch(function(err) {
                alert(err);
        });
      }

      render() {

        const productNode = this.state.data.map((d,i) => {
        return (
            <tr key={d._id}>
            <td>{i + 1}</td>
            <td>{d.firstName}</td>
            <td>{d.email}</td>
            <td>{d.birthDate}</td>
            <td>{d.gender}</td>
            <td>
            {(d.hobby.hobbyCricket == 'true') ? 'Cricket' : ''}
            &nbsp;&nbsp;
            {(d.hobby.hobbyFootball == 'true') ? 'Football' : ''}
            </td>
            <td> 
                <img className="imgCls" src={'http://127.0.0.1:3500/user_images/' + d.imgName} />
            </td>
            <td> 
             <Link to={"/edit/"+ d._id }  className="list-group-item">
                    Edit
             </Link>
             </td>
            <td> <span id={d._id} onClick={this.doDelete} className="list-group-item"> Delete </span> </td>
            </tr>
        )
    });
        return ( 
            <table className="table table-bordered">
            <thead>
            <tr>
                <th>No</th>
                <th>FirstName</th>
                <th>Email</th>
                <th>BirthDate</th>
                <th>Gender</th>
                <th>Hobby</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {productNode}
            </tbody>
        </table>
        )
      }
}
export default List