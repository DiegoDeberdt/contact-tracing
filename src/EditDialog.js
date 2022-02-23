import React from 'react';
import EditPerson from './EditPerson'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import EditContact from './EditContact';

class EditDialog extends React.Component {

    constructor(props) {      
      super(props);
      this.state = {visible: props.show}; 
      this.refEditPerson = React.createRef();   
      this.refEditContact  = React.createRef();
    }

    // The method gets called when the user clicks the "Save Changes" button.    
    saveChanges = async () => { 
      const personState = this.refEditPerson.current.state;
      const contactState = this.refEditContact.current.state;
      
      var form = document.getElementById("myform");
      if (form.checkValidity()) {        

        const result = this.props.onSaveChanges(personState, contactState);
        if (result) this.props.onClickClose();
        
      } else {
        //alert("Please fix the validation errors!");
        form.classList.add('was-validated');        
      }
    }

    // Handler that gets called when the dialog window must be closed.
    onClose = () => {
      this.props.onClickClose();
    }

    render() {

        let nn = '';
        if (this.props.index > -1) {
          let contact = this.props.data[this.props.index];
          nn = contact.NationalNumber;
        }

        let positiveContacts = this.props.data.filter((p) => p.Positive === 1);

        return (          
          <Modal show={this.state.visible} onHide={this.onClose} backdrop="static" size="lg" keyboard="true">
            
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>  

              <Form id="myform">
                <EditPerson ref={this.refEditPerson} data={this.props.data} index={this.props.index} />              
                
                <hr className="my-4" />

                <EditContact ref={this.refEditContact} positiveContacts={positiveContacts} nationalNumber={nn} />                
              </Form>            

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.onClose}>
                Close
              </Button>              
              <Button className="bg-dark" variant="primary" onClick={this.saveChanges}>
                Save Changes
              </Button>              
            </Modal.Footer>
          </Modal>
        );
    }
}

export default EditDialog;