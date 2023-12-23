import React, { useEffect, useState } from 'react';
import './style.css';
import { MdDeleteForever } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';

export default function App() {
  const [data, setData] = useState({
    task: '',
    description: '',
  });

  const [list, setList] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [editId, setEditId] = useState(null);
  const [hideList, setHideList] = useState(true);

  useEffect(() => {
    const locData = JSON.parse(localStorage.getItem('tasklist'));

    if (locData) {
      setList(locData);
    }
  }, []);

  // let locData = JSON.parse(localStorage.getItem("tasklist"))
  // console.log(locData, "local data")
  // const locData1 = JSON.parse(localStorage.getItem('tasklist1'));
  // console.log(locData1,  "local1 ")


  const { task, description } = data;

  const handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data, 'data');
    if (!data.task || !data.description) {
      alert(' please fill the inputs...');
    } else if (data && toggleBtn) {
      let editedData = list.map((val) => {
        if (val.id === editId) {
          return {
            ...val,
            Task: data.task,
            Descrip: data.description,
          };
        }
        return val;
      });
      localStorage.setItem('tasklist', JSON.stringify(editedData));
      setList(editedData);

      setEditId(null);
      setToggleBtn(false);
      // console.log(editedData, 'edit');
    } else {
      let isNew = true;

      list.forEach((obj) => {
        if (obj.Task === data.task) {
          isNew = false;
        }
      });

      let newItem = {
        id: new Date().getTime().toString(),
        Task: data.task,
        Descrip: data.description,
      };

      if (isNew) {
        let listData = [...list];
        listData.push(newItem);
        setList(listData);
       // localStorage.setItem('tasklist', JSON.stringify(listData));
         localStorage.setItem('tasklist1', JSON.stringify(list));
      } else {
        alert('Task is already exist...');
      }
    }

    setData({
      task: '',
      description: '',
    });

    // console.log(list, 'list');
  };

  const DeleteItem = (getid) => {
    // console.log(getid, 'deleteid');
    let deleted = list.filter((item) => item.id !== getid);
    // console.log(deleted, 'delitem');
    localStorage.setItem('tasklist', JSON.stringify(deleted));
    setList(deleted);
  };

  const EditItem = (getid) => {
    // console.log(getid, 'editid');
    setToggleBtn(true);
    setEditId(getid);

    let editeditem = list.find((item) => item.id === getid);
    // console.log(editeditem, 'editeditem');
    setData({
      task: editeditem.Task,
      description: editeditem.Descrip,
    });
  };

  const closeList = (e) => {
    e.preventDefault();
    setHideList(!hideList);
  };

  return (
    <div className="main">
      <div className="form">
        <h3 className="Header"> Todo List </h3>
        <form className="form-container">
          <div className="input-container">
            <label> Task : </label>
            <input
              type="text"
              placeholder="enter the task "
              name="task"
              value={task}
              onChange={handelChange}
            />
          </div>
          <div className="input-container">
            <label> Description : </label>
            <input
              type="text"
              placeholder="enter the task "
              name="description"
              value={description}
              onChange={handelChange}
            />
          </div>
          <div className="submitbtn">
            <button type="submit" onClick={handleSubmit}>
              {toggleBtn ? 'Update ' : 'Submit '}
            </button>
            <button
              type="closelist"
              className={hideList ? 'hidelist ' : 'showlist'}
              onClick={closeList}
            >
              {' '}
              {hideList ? ' Hide List ' : ' Show List '}{' '}
            </button>
          </div>
        </form>
      </div>
      <div className="mappingList">
        {hideList && (
          <div className="listmap">
            {list.map((item) => (
              <div key={item.id} className="listdata">
                <div className="todo-content">
                  <h3 className="todohead"> {item.Task} </h3>
                  <p className="desp"> {item.Descrip}</p>{' '}
                </div>
                <div className="buttonlist">
                  <div className="editbtn">
                    <button type="edit" onClick={() => EditItem(item.id)}>
                      <AiTwotoneEdit className="editicon" />
                    </button>
                  </div>

                  <div className="deletebtn">
                    <button type="clear" onClick={() => DeleteItem(item.id)}>
                      <MdDeleteForever className="delicon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
