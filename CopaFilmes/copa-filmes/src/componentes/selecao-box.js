import React, {Component} from 'react';
import HeaderPage from './header-page.js';
import ListaFilmes from './lista-filmes.js';
import Podium from './podium.js';

export default class SelecaoBox extends Component{

    constructor(){
        super();
        this.state = {
            podium: null//{vencedor: {titulo: 'Jurassic World: Reino Ameaçado'}, vice: {titulo: 'Tomb Raider: A Origem'}}
        }

        this.CallBackPodium = this.CallBackPodium.bind(this);
    }

    CallBackPodium(newPodium){
        this.setState({podium: newPodium});
    }

    render(){
        let corpo;
        let tituloHeader = '';
        let msgHeader = '';

        if(this.state.podium != null){
            tituloHeader = 'Resultado Final';
            msgHeader = 'Veja o resultado final do Campeonato de filmes de forma simples e rápida';
            corpo = <Podium podium={this.state.podium} callBackPodium={this.CallBackPodium}/>
        }
        else{
            tituloHeader = 'Fase de Seleção';
            msgHeader = 'Selecione 8 filmes que você deseja que entrem na competição e depois pressione o botão Gerar Meu Campeonato para prosseguir.';
            corpo = <ListaFilmes callBackPodium={this.CallBackPodium}/>
        }

        return (
            <div>
                <HeaderPage tituloHeader={tituloHeader} msgHeader={msgHeader}/>                
                {corpo}
            </div>
        );
    }
}