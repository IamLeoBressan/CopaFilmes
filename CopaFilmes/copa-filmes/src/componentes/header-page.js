import React, {Component} from 'react';

export default class HeaderPage extends Component{
    render(){
        return (
            <div className="jumbotron ml-5 mr-5 mt-3 mb-2 bg-dark">
                <p className='font-weight-bold text-secondary'>CAMPEONATO DE FILMES</p>
                <h2 className="display-4 font-weight-bold text-light">{this.props.tituloHeader}</h2>
                <hr className="my-4 border-color-white"/>
                <p className="lead text-light">{this.props.msgHeader}</p>
            </div>    
        );
    }
}