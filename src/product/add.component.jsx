import React, {Component} from 'react';

class Add extends Component {
   
constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      password: '',
      birthDate: '',
      country: '',
      gender: '',
      Football: false,
      Cricket: false,
      terms: false,
      image: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

   onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

   setGender(e) {
    this.setState({ gender : e.target.value });
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
    if(this.state.terms == true && this.state.firstName != '' 
            && this.state.email != '' && this.state.password != '' ){
            let formData = new FormData();
            console.log(this.state.image);
            formData.append("image", this.state.image);
            //Add other data
            formData.append('firstName', this.state.firstName);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('birthDate', this.state.birthDate);
            formData.append('country', this.state.country);
            formData.append('gender', this.state.gender);
            formData.append('terms', this.state.terms);

            formData.append('hobbyCricket', this.state.Cricket);
            formData.append('hobbyFootball', this.state.Football);

            console.log(JSON.stringify(formData));          
            let header = new Headers({
            });
            
            fetch('http://127.0.0.1:3500/api/user', {
                "method": "POST",
                "headers": header,
                "body": formData
            }).then((response) => {
                return response.json()
            }).then((json) => {
                if(json.user._id != '' && json.user._id != null){
                    alert('Added successfully.');
                }else{
                    alert(json.error);
                }
            }).catch(function(err) {
                    alert(err);
            });

    }else{
        alert('Please provide data or accept terms!');
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
            <label htmlFor="password" className="col-sm-3 control-label">Password</label>
            <div className="col-sm-9">
                <input type="password" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password" className="form-control" />
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
        <div className="form-group">
            <label className="control-label col-sm-3">Gender</label>
            <div className="col-sm-6">
                <div className="row">
                    <div className="col-sm-4">
                <label className="radio-inline">
                  <input type="radio" name="femaleRadio" value="Female"  onChange={this.setGender.bind(this)} checked={this.state.gender === 'Female'} />Female
                  </label>
                    </div>
                    <div className="col-sm-4">
                        <label className="radio-inline">
                  <input type="radio" name="maleRadio" value="Male" onChange={this.setGender.bind(this)} checked={this.state.gender === 'Male'}/>Male
                  </label>
                    </div>
                    <div className="col-sm-4">
                        <label className="radio-inline">
                  <input type="radio" name="uncknownRadio" value="Unknown" onChange={this.setGender.bind(this)} checked={this.state.gender === 'Unknown'} />Unknown
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
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3">
                <div className="checkbox">
                    <label>
               <input type="checkbox" name="terms" checked={this.state.terms} onChange={this.toggleChange} />I accept <a href="#">terms</a>
               </label>
                </div>
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
        </div>
    </form>
</div>
    )
    }
}

export default Add
