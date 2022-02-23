import React from 'react';

class EditContact extends React.Component {

    constructor(props) {
        super(props);

        let contactNationalNumber = '';
        if (props.positiveContacts.length > 0) contactNationalNumber = this.props.positiveContacts[0].NationalNumber;

        this.state = { 
            person: this.props.nationalNumber,
            contact: contactNationalNumber,
            contactDate: (new Date()).toISOString().split('T')[0],
            description: ''
        };         
    }    

    async componentDidMount() {

        // Load contact data for the person with the specified National Number.

        try {
            if (this.props.nationalNumber) {
                /* UPDATE */
                const response = await fetch('http://localhost:8080/contact/' + this.props.nationalNumber);
                let data = await response.json();
                if (data.length > 0) {
                    let c = data[0];
                    this.setState({
                        person: c.Person,
                        contact: c.Contact,
                        contactDate: (new Date(c.ContactDate)).toISOString().split('T')[0],
                        description: c.Description
                    });
                }
            }
            else { /* ADD  */}
        } catch (error) {
            console.error(error);
        }
    }   

    // The component state will act as the "single source of the truth"

    handleContactChange = (e) => this.setState({contact: e.target.value});
    handleContactDateChange = (e) => this.setState({contactDate: e.target.value});
    handleDescriptionChange = (e) => this.setState({description: e.target.value});

    render() {

        if (this.props.positiveContacts.length === 0) return <span style={{marginLeft: "20px"}}>NONE</span>

        let contactNationalNumber = this.state.contact;        

        return (
            <div className="col py-3">
                <div className="col-md-7 col-lg-8">                                        
                    <div className="row g-3">
                        
                        <div className="col-sm-6">
                            <label htmlFor='person_contact' className="form-label">Contact (positive)</label>
                            <select id="person_contact" className="form-select" style={{width: "250px"}} value={contactNationalNumber} onChange={this.handleContactChange}>
                            {
                                this.props.positiveContacts.map((p) => <option value={p.NationalNumber}>{p.FirstName} {p.LastName}</option>)
                            }                                
                            </select>                    
                        </div>
                        
                        <div className="col-sm-6">
                            <label htmlFor='contactDate' className="form-label">Date (yyyy-mm-dd)</label>
                            <input required pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" id="contactDate" class='form-control' style={{width: "10rem"}} type="text" value={this.state.contactDate} onChange={this.handleContactDateChange} />
                            <div className="invalid-feedback">
                                Please enter a date (format YYYY-MM-DD)
                            </div>                            
                        </div>
                        
                        <div className="col-12">
                            <label htmlFor='contactDescription' className="form-label">Description (optional)</label>
                            <textarea ignore id="contactDescription" class='form-control' rows='3' value={this.state.description} onChange={this.handleDescriptionChange}></textarea>                    
                        </div>                                                    
                    </div>
                </div>
            </div>
        );        
    }
}

export default EditContact;