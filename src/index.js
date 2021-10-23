const content1 = require('./content1')
const content2 = require('./content2')

// 输入框
const inputDom = document.createElement('input')
document.body.appendChild(inputDom)

// div1
const div1Dom = document.createElement('div')
document.body.appendChild(div1Dom)

const setDiv1DomInnerHTML = () => {
  div1Dom.innerHTML = content1
}

setDiv1DomInnerHTML()

// div2
const div2Dom = document.createElement('div')
document.body.appendChild(div2Dom)

const setDiv2DomInnerHTML = () => {
  div2Dom.innerHTML = content2
}

setDiv2DomInnerHTML()