import React from 'react';
import ContactDetails from './ContactDetails';

class PersonDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            firstName: '',
            lastName: '',
            nationalNumber: '',
            email: '',
            phone: '',
            address: '',
            positive: null
        };        
    }    

    static getDerivedStateFromProps(props, state) {
        if (props.index === -1) {            
            return {            
                firstName: '',
                lastName: '',
                nationalNumber: '',
                email: '',
                phone: '',
                address: '',
                positive: null
            };
        } else {
            let person = props.data[props.index];
            return {            
                firstName: person.FirstName,
                lastName: person.LastName,
                nationalNumber: person.NationalNumber,
                email: person.Email,
                phone: person.Phone,
                address: person.Address,
                positive: person.Positive
            };
        }
    }    

    render() {

        let status = "Unknown";
        if (this.state.positive === 0) status = "Negative";
        else if (this.state.positive === 1) status = "Positive";

        let positiveBar = '';
        if (this.state.positive === 1) {
            positiveBar = (<div style={{backgroundColor: "red", color: "white", height: "40px", width: "550px", paddingTop:"7px"}}>
                            <span style={{fontWeight:"bold", marginLeft: "15px"}}>Positive</span>
                          </div>);      
        }          

        const labelStyle = {
            fontWeight: "bold",
            width: "10rem",
            textAlign: "right",
            marginRight: "20px"
        };        

        return (
            <div style={{width: "800px"}}>
            { positiveBar }

            <div style={{marginTop:"25px"}}>       
                <div>
                    <label htmlFor="firstName" style={labelStyle}>First name:&nbsp;</label>
                    <label className="form-label" id="firstName">{this.state.firstName}</label>
                </div>

                <div>
                    <label htmlFor="lastName" style={labelStyle}>Last name:&nbsp;</label>
                    <label className="form-label" id="lastName">{this.state.lastName}</label>
                </div>

                <div>
                    <label htmlFor="nationalNumber" style={labelStyle}>National Number:&nbsp;</label>
                    <label id="nationalNumber" className="form-label">{this.state.nationalNumber}</label>
                </div>

                <div>
                    <label htmlFor="email" style={labelStyle}>Email:&nbsp;</label>
                    <a href={ "mailto:" + this.state.email } className="form-label">{this.state.email}</a>
                </div>

                <div>
                    <label htmlFor="phone" style={labelStyle}>Phone:&nbsp;</label>
                    <label className="form-label">{this.state.phone}</label>
                </div>

                <div>
                    <label htmlFor="address" style={labelStyle}>Address:&nbsp;</label>
                    <label className="form-label">{this.state.address}</label>
                </div>

                <div>
                    <label htmlFor='status' style={labelStyle}>Covid-19 Status:&nbsp;</label>
                    <label className="form-label">{status}</label>
                </div>
            </div>

            <hr className="my-4" />

            <div className="title" style={{marginLeft: "20px", marginBottom: "15px"}}>
                <span className="fs-5 fw-semibold">Contact (Positive)</span>
            </div>

            <ContactDetails key={this.state.nationalNumber} nationalNumber={this.state.nationalNumber} />
            
        </div>
        );
    }
}

export default PersonDetails;