import React from 'react';
import PersonList from './PersonList.js';
import PersonDetails from './PersonDetails.js';
import ErrorBoundary from './ErrorBoundary .js';
import EditDialog from './EditDialog.js';
import MenuBar from './MenuBar.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            activeIndex: 0,            
            showAddNewDialog: false,
            showUpdateDialog: false
        };
    }

    async componentDidMount() {
        // Load the person list from the server.
        await this.refresh();
    }   
    
    // Calling this method will (re)load the person list from the server.
    refresh = async () => {

        // The next line is needed to refresh the details component.
        this.setState({ data: [] }); 

        try {            

            const response = await fetch("http://localhost:8080/persons");
            let data = await response.json();
            this.setState({data: data});
            
        } catch (error) {
            alert(`Unable to read list of persons.\n${error}`);
        }
    }

    // Handler gets called when a new person is selected in the list.
    selectedIndexChangedHandler = (index) => {
        this.setState({activeIndex: index});
    };

    // The "Add" menu button was clicked.
    onClickMenuAdd = () => {        
        this.setState({
            showAddNewDialog: true
        });
    }

    // The "Update" menu button was clicked.
    onClickMenuUpdate = () => {
        this.setState({
            showUpdateDialog: true
        });
    }    

    // The "Delete" menu button was clicked.
    onClickMenuDelete = async () => {
        let contact = this.state.data[this.state.activeIndex];
        let result = window.confirm("Are you sure you want to permanently delete " + contact.FirstName + " " + contact.LastName + " ?");
        if (result) {
            try {
                await fetch("http://localhost:8080/person/" + contact.NationalNumber, { method: 'DELETE' });
            
                let newActiveIndex = this.state.activeIndex;
                if (newActiveIndex >= this.state.data.length) newActiveIndex = Math.max(this.state.data.length - 1, 0);
                this.setState({activeIndex: newActiveIndex});
                
                await this.refresh();
            } catch(error) {
                alert(`Unable to delete selected person.\n${error}`);
            }
        }
    }

    // Handler gets called when the "Add New Person" dialog window must be closed.
    closeAddNewDialog = () => {
        this.setState({ showAddNewDialog: false });        
    }

    // Handler gets called when the "Update Person" dialog window must be closed.
    closeUpdateDialog = () => {
        this.setState({ showUpdateDialog: false });        
    }

    // The method calls the appropriate webservice method to create a new person.
    // When this method is called, form validation has already been performed
    // and it succeeded.
    // p: person data
    // c: contact data
    addPerson = async (p, c) => {
        
        try {     

            let duplicates = this.state.data.filter((i) => i.NationalNumber === p.nationalNumber);
            if (duplicates.length > 0) {
                alert(`Could not create a new record!\nNational Number '${p.nationalNumber}' is already in use!`);
                return false;
            }

            await fetch("http://localhost:8080/person/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
            });            

            if (c.person === '') c.person = p.nationalNumber;

            await fetch("http://localhost:8080/contact/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(c)
            });

            await this.refresh();

        } catch (error) {            
            alert(`Unable to add new person: ${error}`);
        } 
        
        return true;
    }    

    // The method calls the appropriate webservice method to update a person.
    // When this method is called, form validation has already been performed
    // and it succeeded.
    // p: person data
    // c: contact data    
    updatePerson = async (p, c) => {

        try {                        
            await fetch("http://localhost:8080/person/", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
            });            

            // When updating, first check if the record already exists.
            // When it doesn't then insert it (instead of updating).
            const response = await fetch('http://localhost:8080/contact/' + c.person);
            let data = await response.json();             

            if (data.length > 0) {                
                
                // UPDATE

                await fetch("http://localhost:8080/contact/", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(c)
                });            
            }          
            else {
                
                // ADD
                
                if (c.person === '') c.person = p.nationalNumber;                
    
                await fetch("http://localhost:8080/contact/", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(c)
                });    
            }

            await this.refresh();        
        } catch(error) {            
            alert(`Unable to update selected person.\n${error}`);
        }

        return true;
    }

    render () {

        let details = '';        
        if (this.state.data.length > 0) details = <PersonDetails data={this.state.data} index={this.state.activeIndex} />;   
        
        let dialog = '';
        if (this.state.showAddNewDialog === true) dialog = <EditDialog show={true} title={'Add New Person'} onSaveChanges={this.addPerson} data={this.state.data} index={-1} onClickClose={this.closeAddNewDialog} />   
        else if (this.state.showUpdateDialog == true) dialog = <EditDialog show={true} title={'Update Person'} onSaveChanges={this.updatePerson} data={this.state.data} index={this.state.activeIndex} onClickClose={this.closeUpdateDialog} />   

        return (
            <div className="container-fluid">

                <nav className="navbar navbar-dark bg-dark" style={{textAlign: "right"}}>
                    <a class="navbar-brand" style={{marginLeft:"10px"}}>COVID-19 Contact Tracing</a>
                    <span class="navbar-text" style={{marginRight:"10px"}}>
                        ReactJS&nbsp;<img src="./logo192.png" width={32} height={32} />
                    </span>
                </nav>                

                <MenuBar onClickAdd={this.onClickMenuAdd} onClickDelete={this.onClickMenuDelete} onClickUpdate={this.onClickMenuUpdate} />

                <hr className="my-1" />

                <div className="row flex-nowrap">
                    <ErrorBoundary>
                        <PersonList persons={this.state.data} onSelectedIndexChanged={this.selectedIndexChangedHandler} />                        
                    </ErrorBoundary>
                    
                    <ErrorBoundary>
                        {details}                            
                    </ErrorBoundary> 

                    <ErrorBoundary>
                        {dialog}
                    </ErrorBoundary>
                </div>        
            </div>            
        );
    }
}

export default App;