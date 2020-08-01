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
    if(typeof i === 'number'){
      return(
        <Tecla number={i} type={'number'} click={() => this.props.butao(i)}/>
      )
    } else if (i === '=') {
      return(
        <Tecla number={i} type={'number'} click={() => this.props.resolucaoCalculo()}/>
      )
    } else {
      return(
        <Tecla number={i} type={'operation'} click={() => this.props.operacao(operacao, i)}/>
      )
    }
  }

  render() {
    return(
      <div className='teclado'>
        <div className="rowCalc" >
          {this.renderTecla(7)}
          {this.renderTecla(8)}
          {this.renderTecla(9)}
          {this.renderTecla('/', 'divisao')}
        </div>
        <div className="rowCalc">
          {this.renderTecla(4)}
          {this.renderTecla(5)}
          {this.renderTecla(6)}
          {this.renderTecla('*', 'multiplicacao')}
        </div>
        <div className='rowCalc'>
          {this.renderTecla(1)}
          {this.renderTecla(2)}
          {this.renderTecla(3)}
          {this.renderTecla('-', 'substracao')}
        </div>
        <div className="rowCalc">
          {this.renderTecla(0)}
          {this.renderTecla(0)}
          {this.renderTecla('=')}
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
      numerosCalculados: ['', ''],
      operacaoSelecionada: '',
      soma(){
         return parseInt(this.numerosCalculados[0]) + parseInt(this.numerosCalculados[1])
        },
        substracao(){
         return parseInt(this.numerosCalculados[0]) - parseInt(this.numerosCalculados[1])
        },
        multiplicacao(){
         return parseInt(this.numerosCalculados[0]) * parseInt(this.numerosCalculados[1])
        },
        divisao(){
         return parseInt(this.numerosCalculados[0]) / parseInt(this.numerosCalculados[1])
        }
      }
  }

  butao(n) {
    console.log(`clicado em ${n}`)
    this.setState( {display: this.state.display+n })

    const primeiroFoiSetado = this.state.operacaoSelecionada.slice()
    const numeros = [ ...this.state.numerosCalculados ]

    if(primeiroFoiSetado){ 
      this.setState({ numerosCalculados: [ numeros[0], (numeros[1]+n) ], display: (this.state.display+n) })
    } else {
      this.setState({ numerosCalculados: [ (numeros[0]+n), numeros[1] ], display: (this.state.display+n) })
    }
  }

  operacao(ope, simbolo){
    if(this.state.numerosCalculados[0]){
      console.log(`Operação = ${simbolo} ${ope}`)
      this.setState( { operacaoSelecionada: ope, display: (this.state.display+simbolo) } )
    } else {
      console.log('Falta o primeiro numero')
    }
  }
  resolucaoCalculo(){
    if(this.state.operacaoSelecionada){
      const resultadoFinal = this.state[this.state.operacaoSelecionada]()

      console.log(`Resultado = ${resultadoFinal} | ${this.state.numerosCalculados}`)

      this.setState( { numerosCalculados: ['', ''], operacaoSelecionada: '' } )
      this.setState( { resultado: resultadoFinal })

      

    } else {
      console.log('Sem parametros')
    }
  }

  render() {
    const butao = (i) => this.butao(i)
    const operacao = (i, h) => this.operacao(i, h)
    const resolucaoCalculo = (i) => this.resolucaoCalculo(i)

    return(
      <div className="bodyCalc">
        <Display 
          calculo={this.state.display}
          resultado={this.state.resultado}
          />
        <Teclado 
          butao={butao} 
          operacao={operacao} 
          resolucaoCalculo={resolucaoCalculo} 
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Geral />,
  document.getElementById('root')
);
