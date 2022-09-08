function InputBox (props) {
  const { inputValue, setInputValue, addItem } = props
  return (
    <>
      <input type="text" placeholder="Add Task" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
      <button onClick={addItem}>
        <i className="fa fa-plus"></i>
      </button>
    </>
  )
}

export default InputBox;
