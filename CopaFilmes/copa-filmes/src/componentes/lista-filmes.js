import React, {Component} from 'react';
import CardFilme from './card-filme.js';

export default class ListaFilmes extends Component{

    constructor(){
        super();
        this.state = {
            lista: [],
            btnCampeonatoVisible: false
        };
        this.totalFilmes = 8;

        this.CallBackSelecionarItem = this.CallBackSelecionarItem.bind(this);
        this.GerarCampeonatoClick = this.GerarCampeonatoClick.bind(this);
    }

    CallBackSelecionarItem(item, selecao){
        const itensSelecionados = this.state.lista.reduce((acum, item) => acum + (item.selecionado? 1: 0), 0);
        let btnVisible = false;
        let newList = this.state.lista;            

        if(selecao === true){
            if(itensSelecionados === this.totalFilmes){
                alert("Você já selecionou 8 filmes, inicie o campeonato.");
                return;
            }

            if(itensSelecionados === this.totalFilmes - 1){
                btnVisible = true;
            }
        }

        const indice = this.state.lista.findIndex(f => f.id === item.id);
        newList[indice].selecionado = selecao;

        this.setState({listaSelecionados: newList, btnCampeonatoVisible: btnVisible});
    }

    GerarCampeonatoClick(e){
        e.preventDefault();

        let dados = JSON.stringify(
            this.state.lista
                .filter(f => f.selecionado)
                .map(function(f){
                    return {Id: f.id, Titulo: f.titulo, Ano: f.ano, Nota: f.nota}
                })
        );
        fetch("https://localhost:44327/api/campeonato", {  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: dados
        })
        .then(response => {
            if(response.status === 200)
                return response.json();
            else
                return;
        })
        .then(data => {
            this.props.callBackPodium(data);
            
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });        
    }

    componentDidMount(){
        fetch('https://copadosfilmes.azurewebsites.net/api/filmes')
            .then(
                response => {
                    if (response.status !== 200) {
                        console.log('Ocorreu um problema ao carregar os filmes: ' +
                        response.status);
                        return;
                    }

                    response.json().then(data => {
                        this.setState(
                            {
                                lista: data.map(function(f) {
                                    return {id: f.id, titulo: f.titulo, ano: f.ano, nota: f.nota , selecionado: false};
                                })
                            });
                    });
                }
            )
    }

    render(){
        let btnCampeonato = '';

        if(this.state.btnCampeonatoVisible)
            btnCampeonato = <button type='button' onClick={this.GerarCampeonatoClick} className='btn btn-dark text-white text-center pl-5 pr-5 pt-3 pb-3'>GERAR MEU CAMPEONATO</button>

        return (
            <div className='p-3'>
                <div className='row'>                    
                    <div className='col-md-3 text-left'>
                        <p>Selecionados</p>
                        <p>{this.state.lista.reduce((acum, item) => acum + (item.selecionado? 1: 0), 0)} de {this.totalFilmes} Filmes</p>
                    </div>
                    <div className='col-md-3 offset-6'>
                        {btnCampeonato}
                    </div>
                </div>

                <div className='row'>
                    {this.state.lista.map(item => {                    
                        return (
                            <div className='col-md-3' key={item.id}>
                                <CardFilme dadosFilme={item} callBackSelecao={this.CallBackSelecionarItem} />
                            </div>                            
                        )                    
                    })
                    }
                </div>
            </div>
        );
    }
}