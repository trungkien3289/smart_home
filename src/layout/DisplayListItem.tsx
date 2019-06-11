import * as React from 'react';
import './DisplayListItem.scss'

interface OwnProps {
    toolbar: any,
    listItems: any
}

interface OwnStates {

}

export default class LayoutDisplayListItem extends React.Component<OwnProps, OwnStates>{
    render(){
        return (
            <div className="container">
            <div className="toolbar-panel">
                {this.props.toolbar}
            </div>
            <div className="content-panel">
                {this.props.listItems}
            </div>
            </div>

        );
    }
}