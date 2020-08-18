import React from 'react';
import ReactDOM from 'react-dom';

class Tecla extends React.Component {
  render() {
    return(
        <button className={`butao ${this.props.type}`} onClick={this.props.click}>{this.props.number}</button>
    )
  }
}

class Teclado extends React.Component {

  renderTecla(i, operacao=null) {
    if (i === '=') {
      return(
        <Tecla number={i} type={'number'} click={() => this.props.resolucaoCalculo()}/>
      )
    } else {
      return(
        <Tecla number={i} type={'operation'} click={() => this.props.verificadorTecla(i, operacao)}/>
      )
    }
  }

  render() {
    return(
      <div className='teclado'>
          {this.renderTecla(7)}
          {this.renderTecla(8)}
          {this.renderTecla(9)}
          {this.renderTecla(4)}
          {this.renderTecla(5)}
          {this.renderTecla(6)}
          {this.renderTecla(1)}
          {this.renderTecla(2)}
          {this.renderTecla(3)}
          {this.renderTecla(0)}
          {this.renderTecla(0)}
          {this.renderTecla('=')}
          <div className="colunaOperacoes">
            {this.renderTecla('/', 'divisao')}
            {this.renderTecla('x', 'multiplicacao')}
            {this.renderTecla('-', 'substracao')}
            {this.renderTecla('+', 'soma')}
          </div>
      </div>
    )
  }
}

class Display extends React.Component {
  render() {
    return(
      <div className='display'>
        <h1 className='calculo text'>{this.props.calculo}</h1>
        <h2 className='resultado text'>{this.props.resultado}</h2>
      </div>
    )
  }
}

class Geral extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      display: '',
      resultado: 0,
      numerosCalculados: [],
      operacoesSelecionadas: [],
      operador: '',
      operacaoFinalizada: false,
      soma(n1, n2){
         return n1 + n2
      },
      substracao(n1, n2){
        return n1 - n2
      },
      multiplicacao(n1, n2){
        return n1 * n2
      },
      divisao(n1, n2){
        return n1/n2
      }
    }
  }

  verificadorTecla(tecla, operacao=null) {
    console.log(`clicado em ${tecla}`)

    if(operacao){ //Se uma operação tiver sido setada
      this.operacaoSetada(operacao, tecla)
    }else {
      this.numeroSetado(tecla)
    }
  }

  numeroSetado(n) {

    const numeros = this.state.numerosCalculados.slice() //Retorna uma copia
    const indiceArrayAtual = this.state.operacoesSelecionadas.length

    if( numeros[indiceArrayAtual] ){
      //Se o valor setado agr já possuir valor, sendo necessário somar o valor do botao digitado a ele
      numeros[indiceArrayAtual] = (numeros[indiceArrayAtual]*10)+n
      this.setState({ 
        numerosCalculados: [ ...numeros ],
        display: (this.state.display+n)
      })
    } else{
      //Se caso o numero que sera setado ainda não possuir valor... (nesse caso, ele ainda não existe e será criado)

      if(n===0) return //Impede de criar o numero, já que numeros inteiros não devem começar com zeros 

      this.setState({ 
        numerosCalculados: [ ...numeros, n],
        display: (this.state.display+n)
       })
    }
    
    setTimeout( () => this.resolucaoRapida(), 1 )
  }

  operacaoSetada(ope, simbolo){
    const numeros = [ ...this.state.numerosCalculados.slice() ]
    const indiceArrayAtual = this.state.operacoesSelecionadas.length

    if( numeros[indiceArrayAtual]  ){
      console.log(`Operação = ${ope} | ${simbolo}`)
      this.setState( { 
        operacoesSelecionadas: [ ...this.state.operacoesSelecionadas, ope ], 
        display: (this.state.display+simbolo), 
        operador: simbolo // <---- APAGUE AFTER
      } )
    } else if( numeros[0] ) {
      console.log(`Operação redefinida = ${ope} | ${simbolo}`)
      this.setState( { 
        operacoesSelecionadas: [ ...this.state.operacoesSelecionadas.slice(0, indiceArrayAtual-1), ope ], 
        display: this.state.display.slice( 0, -1) + simbolo, //Substitui o ultimo char pelo q clicou
        operador: simbolo // <---- APAGUE AFTER
      } )
    } else {
      console.log('Sem parametros iniciais')
    }
  }

  resolucaoRapida() {
    if(!this.state.operacoesSelecionadas[0] || this.state.operacoesSelecionadas.length === this.state.numerosCalculados.length)
      return 'error'

    const operacoes = this.state.operacoesSelecionadas.slice()
    const numeros = this.state.numerosCalculados.slice() //Retorna uma copia
    let resultadoFinal = 0

    resultadoFinal = this.state[this.state.operacoesSelecionadas[0]](numeros[0], numeros[1])

    for( let i = 2; i < numeros.length; i++ ){
      resultadoFinal = this.state[this.state.operacoesSelecionadas[i-1]](resultadoFinal, numeros[i])
    }
    this.setState({ resultado: resultadoFinal })

    console.log(`ResultadoFINAL = ${resultadoFinal} | VALORES: ${numeros}`)
  }

  resolucaoCalculo(){

    if( this.resolucaoRapida() === 'error' )
      return

    this.setState({
      operacaoFinalizada: true,
      display: '',
      numerosCalculados: [],
      operacoesSelecionadas: []
    })
  }

  render() {
    const verificadorTecla = (i, h) => this.verificadorTecla(i, h)
    const resolucaoCalculo = (i) => this.resolucaoCalculo(i)

    return(
      <div className="bodyCalc">
        <Display 
          calculo={this.state.display}
          resultado={this.state.resultado}
          />
        <Teclado 
          resolucaoCalculo={resolucaoCalculo} 
          verificadorTecla={verificadorTecla}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Geral />,
  document.getElementById('root')
);
