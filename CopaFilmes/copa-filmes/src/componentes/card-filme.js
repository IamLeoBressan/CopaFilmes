import React, {Component} from 'react';

export default class CardFilme extends Component{
    render(){
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-2'>
                            <input type='checkbox' className='form-control' checked={this.props.dadosFilme.selecionado} onChange={e => {this.props.callBackSelecao(this.props.dadosFilme, e.target.checked)}}/>
                        </div>
                        <div className='col-md-10'>
                            <h6 className="card-title">{this.props.dadosFilme.titulo}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.dadosFilme.ano}</h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}