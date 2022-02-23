import React from 'react';
import PersonListItem from './PersonListItem';

class PersonList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    handleClick = (index) => {                
        this.setState({ activeIndex: index });               
        this.props.onSelectedIndexChanged(index);
    }

    render() {
        return (                        
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{width: "360px"}}>
                <a href="#" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom" onClick={(e) => e.preventDefault()}>
                    <span className="fs-5 fw-semibold">Person List</span>
                </a>                
                <div className="list-group list-group-flush border-bottom overflow-auto">
                    {this.props.persons.map((p, index) => <PersonListItem person={p} isActive={this.state.activeIndex === index} index={index} onClick={this.handleClick}/>)}
                </div>        
            </div>
        );
    }
}

export default PersonList;