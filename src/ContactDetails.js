import React from 'react';

class ContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contact_data: [] };
    }    
    
    async componentDidMount() {

        // Load contact data for the user with the specified National Number.

        try {            
            const response = await fetch('http://localhost:8080/contact/' + this.props.nationalNumber);
            let data = await response.json();
            this.setState({contact_data: data});
        } catch (error) {
            console.error(error);
        }
    }            

    render() {

        if (this.state.contact_data.length === 0) return <span style={{marginLeft: "20px"}}>NONE</span>;
        
        let contact = this.state.contact_data[0];
        let d = new Date(contact.ContactDate);

        const labelStyle = {
            fontWeight: "bold",
            width: "10rem",
            textAlign: "right",
            marginRight: "20px"
        };        

        return (
            <>
                <div>
                    <label htmlFor="firstName" style={labelStyle}>First name:&nbsp;</label>
                    <label className="form-label" id="firstName">{contact.FirstName}</label>
                </div>

                <div>
                    <label htmlFor="lastName" style={labelStyle}>Last name:&nbsp;</label>
                    <label className="form-label" id="lastName">{contact.LastName}</label>
                </div>

                <div className="col-sm-6">
                    <label htmlFor='contactDate' style={labelStyle}>Date:&nbsp;</label>
                    <label className="form-label" id="contactDate">{d.toISOString().split('T')[0]}</label>
                </div>
                <div>
                    <label htmlFor='contactDescription' style={labelStyle}>Description:&nbsp;</label>
                    <label id="contactDescription">{contact.Description}</label>
                </div>                                                    
            </>
        );        
    }    
}

export default ContactDetails;