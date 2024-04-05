
import { createContext, useContext, useEffect, useReducer, useState, } from 'react';
import { ButtonGroup, PageItem } from 'react-bootstrap';

import { GlobalContext2 } from './teachStateManagment';
import '../scss/Teacher.scss'
import { Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import AddTeachers from './AddTeachers';
import EditTeachers from './EditTeachers';


const initialState = {
  addModal: false,
  editModal: false,
}
export const ModalContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {


    case "OPEN_MODAL":
      return {
        ...state,
        addModal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        addModal: false,
      };
    case "EDIT_MODAL":
      return {
        ...state,
        editModal: true,

      }
    case "CLOSE_EDIT_MODAL":
      return {
        ...state,
        editModal: false,
      };

    default:
      return state;
  }
};

const Teachers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    teachers,
    getTeachers, deleteTeachers
  } = useContext(GlobalContext2);

  useEffect(() => {
    getTeachers();
  }, []);

  const [filtered, setFiltered] = useState(teachers);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4)



  /////pagination//////
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currenPosts = filtered.slice(firstPostIndex, lastPostIndex);

  let pages = [];
  const totalPosts = teachers.length
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }
  const tot = Math.ceil(totalPosts / postsPerPage)

  const hasPrev = Boolean(currentPage > 1)
  const hasPrev2 = Boolean(currentPage < tot)

  const handleChange = (type) => {
    if (type === "prev") {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }



  ////search

  const handleProductSearch = (e) => {
    const text = e.target.value.trim().toLowerCase();
    setFiltered(
      teachers.filter(
        (product) =>
          product.lastName.toLowerCase().includes(text) ||
          product.firstName.toLowerCase().includes(text)
      )
    );
  };




  ////////filter//////
  const handleFilter = (e) => {
    setFilter(e.target.value);
    const filter = e.target.value;
    if (filter === "All") {
      setFiltered(teachers);
    } else {
      setFiltered(
        teachers.filter((product) => product.level === filter)
      );
    }
  };


  useEffect(() => {
    setFiltered(teachers);
  }, [teachers]);




  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const openEditModal = () => {
    dispatch({ type: "EDIT_MODAL" });

  };

  const closeEditModal = () => {
    dispatch({ type: "CLOSE_EDIT_MODAL" });

  }



  const [selectedTeachers, setSelectedTeachers] = useState(null);

  // ...

  const handleEdit = (teacher) => {
    setSelectedTeachers(teacher);
    console.log(setSelectedTeachers)
    openEditModal();

  }

  const columns = [
    {
      key: "1",
      title: 'No',
      dataIndex: 'id',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input autoFocus placeholder='Search'
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}

              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropDown: false});
              }}
            ></Input>
            <Button type="primary" onClick={() => {
              confirm();
            }}

            >Search</Button>
            <Button  style={{
              background:'red',
              color: 'white'
            }} type="error" onClick={() => {
              clearFilters();
            }}

            >Reset</Button>
          </>

        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return (
          record.firstName.toLowerCase().includes(value.toLowerCase()) ||
          record.lastName.toLowerCase().includes(value.toLowerCase())
        );
      }

    },
    {
      key: "id",
      title: 'firstName',
      dataIndex: 'firstName',
    },
    {
      key: "id",
      title: 'lastName',
      dataIndex: 'lastName',
    
    },
    {
      key: "id",
      title: 'groups',
      dataIndex: 'groups',
    },
    {
      key: "id",
      title: 'level',
      dataIndex: 'level',
      filters: [
        { text: 'All', value: '' },
        { text: 'Junior', value: 'Junior' },
        {text: 'Middle', value: 'Middle' },
        {text: 'Senior', value: 'Senior' },
      ],
      onFilter: (value, record) => {
        if (value === '') return true;
        return record.level === value;
      }
    }
    
    
    ,
   
    {
      key: "id",
      title: 'Action',
      render: (record) => {
        return (
          <div >
            <Button type='primary' onClick={() => handleEdit(record)}>Edit</Button>
            <Button style={{
              background:'red',
              color: 'white'
            }} onClick={() => deleteTeachers(record.id)}>Delete</Button>
          </div>
        )
      }

    },
  ]
  return (



   


    <div className='Teacher'>
      <div className='Teacher-head'>
        <button className='btn btn-outline-success w-auto' onClick={openModal}>Add</button>
      </div>
      <Table  className='Table' size='large' dataSource={teachers} columns={columns}
      pagination={{
        current :currentPage,
        pageSize:postsPerPage,
        onChange:(page , pageSize)=>{
          setCurrentPage(page);
          setPostsPerPage(pageSize);
        }
      }}>


      </Table>
      <ModalContext.Provider value={{
        addModal: state.addModal, openModal, closeModal,
        editModal: state.editModal, closeEditModal, openEditModal

      }}>

        <AddTeachers />
        {state.editModal && <EditTeachers student={selectedTeachers} />}

      </ModalContext.Provider>

    </div>

  );
};

export default Teachers;