// console.log('this is bundle')
const Compiler = require('./compiler')


function bootstrap() {
  const input = document.getElementById('queryInput')
  const enterQueryBtn = document.getElementById('enterBtn')
  const treeView = document.getElementById('tree')
  const resultView = document.getElementById('result')
  const errorView = document.getElementById('error')

  const compiler = new Compiler();

  enterQueryBtn.addEventListener('click', () => {
    const queryValue = input.value

    compiler.compile(queryValue)
  })

  // compiler.on('tokens', tokens => {
  // })

  compiler.on('ast', ast => {
    treeView.innerHTML = ''
    var json = JSON.stringify(ast, null, 2)

    const fragment = document.createDocumentFragment()
    const pre = document.createElement('pre')
    pre.textContent = json
    fragment.appendChild(pre)
    treeView.appendChild(fragment)
  })

  compiler.on('compiled', resultHtml => {
    resultView.innerHTML = resultHtml;
    errorView.innerHTML = '';
  })

  compiler.on('error', err => {
    errorView.textContent = err.stack
  })
}

window.bootstrap = bootstrap