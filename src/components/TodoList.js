import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context'
import InputBox from './InputBox'
import TodoItem from './TodoItem'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const $swal = withReactContent(Swal)

function TodoList () {
  let navigate = useNavigate()
  const { token, userName } = useAuth()
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

  const logout = () => {
    const url = `https://todoo.5xcamp.us/users/sign_out`
    axios.delete(url, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      $swal.fire({
        icon: 'success',
        title: 'Logout succeeded!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/')
      })
    })
    .catch(err => {
      console.log(err)
    })
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
            <li><span>{userName}'s Todo List</span>&ensp;&ensp;&ensp;</li>
            <li><button className="log-out-icon" onClick={logout}><i className="fas fa-sign-out-alt"></i></button></li>
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
