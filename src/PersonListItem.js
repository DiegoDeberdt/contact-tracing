import React from 'react';

class PersonListItem extends React.Component { 

    constructor(props) {
        super(props);
        this.state = { isActive: false };
    }

    static getDerivedStateFromProps(props, state) {
        return { isActive: props.isActive };
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.onClick(this.props.index)
    }

    render() {

        let active = (this.state.isActive) ? 'active bg-dark' : '';        

        return (
        <a href="#" onClick={this.handleClick} className={'list-group-item list-group-item-action py-3 lh-tight ' + active} style={{borderRight: (this.props.person.Positive === 1) ? 'red 10px solid' : ''}}>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">{this.props.person.LastName.toUpperCase()} {this.props.person.FirstName}</strong>     
            </div>
            <div className="col-10 mb-1 small">{this.props.person.Address}</div>
        </a>);
    }
}

export default PersonListItem;