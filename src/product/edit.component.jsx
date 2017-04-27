import React, {Component} from 'react';
const queryString = require('query-string');
class Edit extends Component {
   
constructor(props) {
 
    super(props);

    this.state = {
      firstName: '',
      email: '',
      birthDate: '',
      country: '',
      Gender: '',
      Football: false,
      Cricket: false,
      image: '',
      userId: '',
      imgName: ''
    }
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);

    this.getData();
  }

  getData(){
    let data = { _id : this.props.params.id};
    let fetchData = { 
        method: 'POST', 
        body: queryString.stringify(data),
        headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
        })
    }
    fetch('http://127.0.0.1:3500/api/user/getUsers', fetchData).then((response) => {
        return response.json()
    }).then((json) => {
        console.log('====' + JSON.stringify(json.data[0]));
        this.setState({ 'firstName':  json.data[0].firstName});
        this.setState({ 'email':  json.data[0].email});

        let userDate = json.data[0].birthDate;
        let dateString: string = userDate.toString();
        let days: number = parseInt(dateString.substring(8, 10));
        let months: number = parseInt(dateString.substring(5, 7));
        let years: number = parseInt(dateString.substring(0, 5));
        let goodDate: Date = new Date(years + "/" + months + "/" + days);
        goodDate.setDate(goodDate.getDate() + 2);
        let date = goodDate.toISOString().substring(0, 10);
        
        this.setState({ 'birthDate':  date});
        this.setState({ 'country':  json.data[0].country});
        if(json.data[0].gender == 'Female'){
            document.getElementById("femaleRadio").checked = true;
        }else if(json.data[0].gender == 'Male'){
            document.getElementById("maleRadio").checked = true;
        }else{
            document.getElementById("uncknownRadio").checked = true;
        }
        this.setState({ 'Cricket':  json.data[0].hobby.hobbyCricket});
        this.setState({ 'Football':  json.data[0].hobby.hobbyFootball});
        this.setState({ 'imgName':  json.data[0].imgName});
        this.setState({ 'userId':  json.data[0]._id});
        
    }).catch(function(err) {
            alert(err);
    });
    }

   onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

   setGender(e) {
    this.setState({ Gender : e.target.value });
  }

  toggleChange(e){
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file
      });
    }

    reader.readAsDataURL(file)
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.firstName != ''){
            let formData = new FormData();
            console.log(this.state.image);
            formData.append("image", this.state.image);
            formData.append('oldimgName', this.state.imgName);
            
            //Add other data
            formData.append('firstName', this.state.firstName);
            formData.append('email', this.state.email);
            
            formData.append('birthDate', this.state.birthDate);
            formData.append('country', this.state.country);
            formData.append('gender', this.state.gender);

            formData.append('hobbyCricket', this.state.Cricket);
            formData.append('hobbyFootball', this.state.Football);
            formData.append('_id', this.state.userId);

            let header = new Headers({ });
            fetch('http://127.0.0.1:3500/api/user/update', {
                "method": "POST",
                "headers": header,
                "body": formData
            }).then((response) => {
                return response.json()
            }).then((json) => {
                if(json != null && json != ''){
                     alert(json.message);
                     this.getData();
                }else{
                    alert('Something went wrong');
                }
            }).catch(function(err) {
                    alert(err);
            });

    }else{
        alert('Please provide daat!');
    }
    
  }

  render() {
    return ( 
    <div className="container">
    <form className="form-horizontal" encType="multipart/form-data" role="form" onSubmit={this.onSubmit}>

        <div className="form-group">
            <label htmlFor="Registration Form" className="col-sm-6 control-label"><h3>Registration Form</h3></label>
        </div>

        <div className="form-group">
            <label htmlFor="firstName" className="col-sm-3 control-label">Full Name</label>
            <div className="col-sm-9">
                <input type="text" name="firstName" onChange={this.onChange} value={this.state.firstName} placeholder="Full Name" defaultValue={this.state.firstName} value={this.state.firstName} className="form-control" autoFocus />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">Email</label>
            <div className="col-sm-9">
                <input type="email" name="email" onChange={this.onChange} value={this.state.email} placeholder="Email" className="form-control" />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="birthDate" className="col-sm-3 control-label">Date of Birth</label>
            <div className="col-sm-9">
                <input type="date" name="birthDate" onChange={this.onChange} value={this.state.birthDate} className="htmlForm-control" />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="country" className="col-sm-3 control-label">Country</label>
            <div className="col-sm-9">
                <select name="country" className="form-control" onChange={this.onChange} value={this.state.country} >
               <option>India</option>
               <option>USA</option>
               <option>UK</option>
               <option>Canada</option>
               <option>Ecuador</option>
               <option>Gabon</option>
               <option>Haiti</option>
            </select>
            </div>
        </div>
        <div className="form-group" onChange={this.setGender.bind(this)} >
            <label className="control-label col-sm-3">Gender</label>
            <div className="col-sm-6">
                <div className="row">
                    <div className="col-sm-4">
                <label className="radio-inline">
                  <input type="radio" name="femaleRadio" id="femaleRadio" value="Female" />Female
                  </label>
                    </div>
                    <div className="col-sm-4">
                        <label className="radio-inline">
                  <input type="radio" name="maleRadio" id="maleRadio" value="Male" />Male
                  </label>
                    </div>
                    <div className="col-sm-4">
                        <label className="radio-inline">
                  <input type="radio" name="uncknownRadio" id="uncknownRadio" value="Unknown" />Unknown
                  </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-group">
            <label className="control-label col-sm-3">Hobby</label>
            <div className="col-sm-9">
                <div className="checkbox">
                    <label>
               <input type="checkbox" id="Cricket" name="Cricket" checked={this.state.Cricket} onChange={this.toggleChange}  />Cricket</label>
                </div>
                <div className="checkbox">
                    <label>
               <input type="checkbox" id="Football" name="Football" checked={this.state.Football} onChange={this.toggleChange} />Football</label>
                </div>

            </div>
        </div>
        <div className="form-group">
            <label htmlFor="firstName" className="col-sm-3 control-label">Photo</label>
            <div className="col-sm-9">
                <input type="file" name="image" onChange={this._handleImageChange}  multiple placeholder="Upload file..." />
                <br/><br/>
                <img className="imgEdit" src={'http://127.0.0.1:3500/user_images/' + this.state.imgName} />
            
            </div>
                    
        </div>

        <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3">
                <button type="submit" className="btn btn-primary btn-block">Update</button>
            </div>
        </div>
    </form>
</div>
    )
    }
}

export default Edit
