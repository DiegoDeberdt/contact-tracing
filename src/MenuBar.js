import React from 'react';

class MenuBar extends React.Component {

    render() {

        const buttonStyle = {
            width: "70px",
            marginRight: "5px",            
            paddingTop: "7px",
            marginTop: "5px"
          };        

        return (
            <nav className="navbar">
            <div>
                <button style={{marginTop: "8px"}} onClick={this.props.onClickAdd} style={buttonStyle}>
                    <img src="./add-contact.png" alt="New" width="32" height="32" class="d-inline-block align-text-center" />
                        Add 
                </button>
                <button style={{marginTop: "8px"}} onClick={this.props.onClickUpdate} style={buttonStyle}>
                    <img src="./update.png" alt="Delete" width="32" height="32" class="d-inline-block align-text-center" />
                        Update
                </button>
                <button style={{marginTop: "8px"}} onClick={this.props.onClickDelete} style={buttonStyle}>
                    <img src="./delete.png" alt="Update" width="32" height="32" class="d-inline-block align-text-center" />
                        Delete
                </button>                                
            </div>
        </nav>             
        );        
    }
}

export default MenuBar;
