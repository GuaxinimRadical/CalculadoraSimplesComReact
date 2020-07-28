import React from 'react';
import ReactDOM from 'react-dom';

class Tecla extends React.Component {
  render() {
    return(
      // <div>
        <button onClick={this.props.click}>{this.props.number}</button>
      // </div>
    )
  }
}

class Teclado extends React.Component {

  renderTecla(i, operacao=null) {
    if(typeof i === 'number'){
      return(
        <Tecla number={i} click={() => this.props.butao(i)}/>
      )
    } else if (i === '=') {
      return(
        <Tecla number={i} click={() => this.props.resolucaoCalculo()}/>
      )
    } else {
      return(
        <Tecla number={i} click={() => this.props.operacao(operacao)}/>
      )
    }
  }

  render() {
    return(
      <div>
        <div>
          {this.renderTecla(9)}
          {this.renderTecla(8)}
          {this.renderTecla(7)}
          {this.renderTecla('+', 'soma')}

          {/* <Tecla number='9' click={() => this.handleClick()}/>
          <Tecla number='8' click={() => this.handleClick()}/>
          <Tecla number='7' click={() => this.handleClick()}/>
          <Tecla number='+' click={() => this.handleClick()}/> */}
        </div>
        <div>
          {this.renderTecla(6)}
          {this.renderTecla(5)}
          {this.renderTecla(4)}
          {this.renderTecla('-', 'substracao')}

          {/* <Tecla number='6' click={() => this.handleClick()}/>
          <Tecla number='5' click={() => this.handleClick()}/>
          <Tecla number='4' click={() => this.handleClick()}/>
          <Tecla number='-' click={() => this.handleClick()}/> */}
        </div>
        <div>
          {this.renderTecla(3)}
          {this.renderTecla(2)}
          {this.renderTecla(1)}
          {this.renderTecla('*', 'multiplicacao')}
          
          {/* <Tecla number='3' click={() => this.handleClick()}/>
          <Tecla number='2' click={() => this.handleClick()}/>
          <Tecla number='1' click={() => this.handleClick()}/>
          <Tecla number='*' click={() => this.handleClick()}/> */}
        </div>
        <div>
          {this.renderTecla(0)}
          {this.renderTecla('=')}
          {this.renderTecla('=')}
          {this.renderTecla('/', 'divisao')}

          {/* <Tecla number='0' click={() => this.handleClick()}/>
          <Tecla number='=' click={() => this.handleClick()}/>
          <Tecla number='=' click={() => this.handleClick()}/>
          <Tecla number='/' click={() => this.handleClick()}/> */}
        </div>
      </div>
    )
  }
}

class Display extends React.Component {
  render() {
    return(
      <div className='display'>
        <h1 className='resultado'>{this.props.valor}</h1>
      </div>
    )
  }
}

class Geral extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      display: 0,
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
    this.setState( {display: n })

    const primeiroSetado = this.state.operacaoSelecionada.slice()
    const numeros = [ ...this.state.numerosCalculados ]
    if(primeiroSetado){ 
      this.setState({ numerosCalculados: [ numeros[0], (numeros[1]+n) ], display: (numeros[1]+n) })
    } else {
      this.setState({ numerosCalculados: [ (numeros[0]+n), numeros[1] ], display: (numeros[0]+n) })
    }
  }

  operacao(ope){
    console.log(`Operação = ${ope}`)
    this.setState( { operacaoSelecionada: ope } )
  }
  resolucaoCalculo(){
    const resultadoFinal = this.state[this.state.operacaoSelecionada]()

    this.setState( { numerosCalculados: ['', ''], operacaoSelecionada: '' } )
    this.setState( { display: resultadoFinal, resultado: resultadoFinal })


    console.log(`Resultado = ${resultadoFinal}`)
  }

  render() {
    const butao = (i) => this.butao(i)
    const operacao = (i) => this.operacao(i)
    const resolucaoCalculo = (i) => this.resolucaoCalculo(i)

    return(
      <div>
        <Display valor={this.state.display}/>
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
