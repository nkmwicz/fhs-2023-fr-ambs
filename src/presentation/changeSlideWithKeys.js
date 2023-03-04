const changeSlideWithKeys = (
  handleNextClick, handlePrevClick
) => {
  const click = (e) => {
    if (e.keyCode === 37) {
      e.preventDefault()
      // left arrow
      handlePrevClick
      console.log(e.keyCode)
    }
    if (e.keyCode === 39) {
      e.preventDefault()
      //right arrow
      handleNextClick
      console.log(handleNextClick)
    }
  }
  window.addEventListener('keyup', click, false);
  return function cleanup() {
    window.removeEventListener('keyup', click, false);
  }
}

export default changeSlideWithKeys;
