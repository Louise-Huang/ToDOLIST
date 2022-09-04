import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBox from './InputBox';
import TodoItem from './TodoItem';

function TodoList () {
  const [inputValue, setInputValue] = useState('')
  const [tabState, setTabState] = useState([
    {
      id: 1,
      text: '全部',
      active: true
    },
    {
      id: 2,
      text: '待完成',
      active: false
    },
    {
      id: 3,
      text: '已完成',
      active: false
    }
  ])
  const [allItem, setAllItem] = useState([
    {
      id: 1,
      text: '把冰箱發霉的檸檬拿去丟',
      finished: false
    },
    {
      id: 2,
      text: '把冰箱發霉的檸檬拿去丟!!!',
      finished: true
    }
  ])

  const addItem = () => {
    if (inputValue) {
      const id = allItem[allItem.length-1].id + 1
      setAllItem([...allItem, {
        id: id,
        text: inputValue,
        finished: false
      }])
      setInputValue('')
    }
  };

  const removeItem = (id) => {
    setAllItem(
      allItem.filter((item)=>item.id!==id)
    )
  }

  const removeAllFinished = () => {
    setAllItem(
      allItem.filter((item)=>!item.finished)
    )
  }

  const changeItemState = (e) => {
    const { name, checked } = e.target
    setAllItem(
      allItem.map((item) =>
        item.id === name ? { ...item, finished: checked } : item
      )
    )
  };

  const changeTabState = (e) => {
    setTabState(
      tabState.map((item) => {
        item.active = item.text === e.target.innerHTML ? true : false
        return item
      })
    )
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><Link to="/">ONLINE TODO LIST</Link></h1>
          <ul>
            <li><Link to="/" className="log-out-icon"><i className="fas fa-sign-out-alt"></i></Link></li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <InputBox inputValue={inputValue} setInputValue={setInputValue} allItem={allItem} setAllItem={setAllItem} addItem={addItem}/>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                {
                  tabState.map((item)=>(
                    <li key={item.id+'_'}><button className={item.active ? 'active' : ''} onClick={(e)=>changeTabState(e)}>{item.text}</button></li>
                  ))
                }
              </ul>
              <div className="todoList_items">
                <TodoItem allItem={allItem} changeItemState={changeItemState} tabState={tabState} removeItem={removeItem}/>
                <div className="todoList_statistics">
                  <p> {allItem.filter((item) => item.finished).length} 個已完成項目</p>
                  <button onClick={removeAllFinished}>清除已完成項目</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList;
