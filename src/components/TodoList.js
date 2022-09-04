import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context'
import InputBox from './InputBox'
import TodoItem from './TodoItem'

function TodoList () {
  const { token } = useAuth()
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
  const [allItem, setAllItem] = useState([])

  const getTodoList = async () => {
    const url = 'https://todoo.5xcamp.us/todos'
    await axios.get(url, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      setAllItem(res.data.todos)
    })
    .catch(err => {
      console.log(err)
    })

  }

  const addItem = () => {
    const url = 'https://todoo.5xcamp.us/todos'
    const obj = {
      todo: {
        content: inputValue
      }
    }
    axios.post(url, obj, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      setInputValue('')
      getTodoList()
    })
    .catch(err => {
      console.log(err)
    })
  };

  const removeItem = (id) => {
    const url = `https://todoo.5xcamp.us/todos/${id}`
    axios.delete(url, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      getTodoList()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const removeAllFinished = () => {
    allItem.forEach((item) => {
      if (item.completed_at) {
        removeItem(item.id)
      }
    })
  }

  const changeItemState = (e, id) => {
    const url = `https://todoo.5xcamp.us/todos/${id}/toggle`
    axios.patch(url, '', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      getTodoList()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const changeTabState = (e) => {
    setTabState(
      tabState.map((item) => {
        item.active = item.text === e.target.innerHTML ? true : false
        return item
      })
    )
  }

  useEffect(() => {
    getTodoList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><Link to="/">ONLINE TODO LIST</Link></h1>
          <ul>
            <li><Link to="/" className="log-out-icon"><i className="fas fa-sign-out-alt"></i></Link></li>
          </ul>
        </nav>
        <div className="container todoListPage vhContainer">
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
                  <p> {allItem.filter((item) => !item.completed_at).length} 個待完成項目</p>
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
