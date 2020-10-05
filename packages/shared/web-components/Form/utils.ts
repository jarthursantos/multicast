export function getCaretPositionX(input: HTMLInputElement): number {
  const { offsetLeft: inputX, selectionStart, selectionEnd } = input

  if (selectionStart === selectionEnd) {
    return
  }

  const div = document.createElement('div')

  const copyStyle = getComputedStyle(input)

  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop]
  }

  const swap = '.'
  const inputValue =
    input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value
  const textContent = inputValue.substr(0, selectionStart)
  div.textContent = textContent

  if (input.tagName === 'TEXTAREA') div.style.height = 'auto'
  if (input.tagName === 'INPUT') div.style.width = 'auto'

  const span = document.createElement('span')
  span.textContent = inputValue.substr(selectionStart) || '.'
  div.appendChild(span)
  document.body.appendChild(div)

  const { offsetLeft: spanX } = span

  document.body.removeChild(div)

  const x = inputX + spanX

  return x < 0 ? 0 : x
}
