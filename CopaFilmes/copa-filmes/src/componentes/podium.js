import React, {Component} from 'react';

export default class Podium extends Component{

    constructor(){
        super();
        this.LimparPodium = this.LimparPodium.bind(this);
    }

    LimparPodium(){
        this.props.callBackPodium(null);
    }

    render(){
        return (
            <div className='mb-5 ml-5 mrs-5 mt-0'>                
                <div className='row m-2'>
                    <div className='col-md-2 offset-10'>
                        <button type='button' className='btn btn-light border border-1' onClick={this.LimparPodium}>Voltar</button>
                    </div>

                </div>

                <div className='row m-0'>
                    <div className='col-md-1 bg-secondary pt-3 pb-3 '>
                        <p className='m-0 h1 text-white'>1º</p>
                    </div>
                    <div className='col-md-11 h4 bg-light p-3 text-left m-0'>
                        {this.props.podium.vencedor.titulo}
                    </div>
                </div>

                <div className='row m-0 mt-3'>
                    <div className='col-md-1 bg-secondary pt-3 pb-3'>
                        <p className='m-0 h1 text-white'>2º</p>
                    </div>
                    <div className='col-md-11 h4 bg-light p-3 text-left m-0'>
                        {this.props.podium.vice.titulo}
                    </div>
                </div>

            </div>
        );
    }

}