import React from 'react';

class EditPerson extends React.Component {

    constructor(props) {
        super(props);

        if (props.index === -1) this.initAdd(props);
        else this.initUpdate(props);
        
        console.log("[EditPerson] constructor");
    } 
    
    // Component state initializer for the "Add New" dialog window.
    initAdd = (props) => {
        this.state = {
            firstName: '',
            lastName: '',
            nationalNumber: '',
            email: '',
            phone: '',
            address: '',
            positive: 0
        };     
    }

    // Component state initializer for the "Update" dialog window.
    initUpdate = (props) => {
        let person = props.data[props.index];
        this.state = {            
            firstName: person.FirstName,
            lastName: person.LastName,
            nationalNumber: person.NationalNumber,
            email: person.Email,
            phone: person.Phone,
            address: person.Address,
            positive: person.Positive
        };
    }

    // The component state will act as the "single source of the truth"

    handleFirstNameChange = (e) => this.setState({firstName: e.target.value});
    handleLastNameChange = (e) =>  this.setState({lastName: e.target.value});
    handleNationalNumberChange = (e) => this.setState({nationalNumber: e.target.value});
    handleEmailChange = (e) => this.setState({email: e.target.value});
    handlePhoneChange = (e) => this.setState({phone: e.target.value});
    handleAddressChange = (e) => this.setState({address: e.target.value});
    handlePositiveChange = (e) => this.setState({positive: e.target.value});

    render () {   

        return (            
            <div className="col py-3">
                <div className="col-md-7 col-lg-8">                    
                        
                        <div className="row g-3">
                            
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input required type="text" className="form-control" id="firstName" name="firstName" placeholder='' value={this.state.firstName} onChange={this.handleFirstNameChange} />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>                                        
                            </div>                            
                            
                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input required type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}></input>
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                            
                            <div className="col-12">
                                <label htmlFor="national_number" className="form-label">National Number</label>
                                <input readOnly={this.props.index > -1} required pattern=".{5,5}" type="text" className="form-control" id="national_number" value={this.state.nationalNumber} onChange={this.handleNationalNumberChange}></input>            
                                <div className="invalid-feedback">
                                    A National Number is required (exactly 5 characters).
                                </div>
                            </div>
                            
                            <div className="col-sm-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input required type="email" className="form-control" id="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleEmailChange}></input>
                                <div className="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>
                            
                            <div className="col-sm-6">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input required type="phone" className="form-control" id="phone" value={this.state.phone} onChange={this.handlePhoneChange}></input>
                                <div className="invalid-feedback">
                                    Please enter a valid phone number.
                                </div>                                        
                            </div>                            
                            
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input required type="text" className="form-control" id="address" value={this.state.address} onChange={this.handleAddressChange}></input>
                                <div className="invalid-feedback">
                                    Please enter the person's address.
                                </div>
                            </div>                    

                            <div className="col-12">
                                <label htmlFor='status' className="form-label">Covid-19 Status</label>
                                <select id="status" className="form-select" style={{width: "50%"}} value={this.state.positive} onChange={this.handlePositiveChange}>
                                    <option value='0'>Negative</option>
                                    <option value='1'>Positive</option>
                                </select>
                            </div>                   
                        </div>                    
                </div>
            </div>                        
        );
    }
}

export default EditPerson;
