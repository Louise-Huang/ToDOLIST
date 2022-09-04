
function TodoItem (props) {
  const { allItem, changeItemState, tabState, removeItem } = props
  let items = []
  const nowTab = tabState.filter((item)=>item.active)[0].text
  if (nowTab === '全部') {
    items = allItem
  } else if (nowTab === '待完成') {
    items = allItem.filter((item) => !item.finished)
  } else {
    items = allItem.filter((item) => item.finished)
  }
  return (
    <>
      <ul className="todoList_item">
        {
          items.map((item)=>(
            <li key={'_'+item.id}>
              <label className="todoList_label">
                <input checked={item.finished ? "checked" : ""} className="todoList_input" name={item.id} type="checkbox" onChange={changeItemState}/>
                <span>{item.text}</span>
              </label>
              <button onClick={()=>{removeItem(item.id)}}>
                <i className="fa fa-times"></i>
              </button>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default TodoItem;
