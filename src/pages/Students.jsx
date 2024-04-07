
import { createContext, useContext, useEffect, useReducer, useState, } from 'react';
import { ButtonGroup, PageItem } from 'react-bootstrap';
import { GlobalContext, GlobalProvider } from './stateManagmentStudents';
import { Input,Button, Table } from 'antd';
import '../scss/Student.scss'
// import { Box, Button, MenuItem, TextField } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

import { SearchOutlined } from '@ant-design/icons';


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

const Students = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    students,
    getStudents,
    deleteStudent, } = useContext(GlobalContext);

  useEffect(() => {
    getStudents();
  }, []);

  // const [filtered, setFiltered] = useState(students);
  // const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4)



  /////pagination//////
  // const lastPostIndex = currentPage * postsPerPage;
  // const firstPostIndex = lastPostIndex - postsPerPage;
  // const currenPosts = filtered.slice(firstPostIndex, lastPostIndex);

  // let pages = [];
  // const totalPosts = students.length
  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pages.push(i)
  // }
  // const tot = Math.ceil(totalPosts / postsPerPage)

  // const hasPrev = Boolean(currentPage > 1)
  // const hasPrev2 = Boolean(currentPage < tot)

  // const handleChange = (type) => {
  //   if (type === "prev") {
  //     setCurrentPage(currentPage - 1)
  //   } else {
  //     setCurrentPage(currentPage + 1)
  //   }
  // }



  ////search

  // const handleProductSearch = (e) => {
  //   const text = e.target.value.trim().toLowerCase();
  //   setFiltered(
  //     students.filter(
  //       (product) =>
  //         product.lastName.toLowerCase().includes(text) ||
  //         product.firstName.toLowerCase().includes(text)
  //     )
  //   );
  // };




  ////////filter//////
  // const handleFilter = (e) => {
  //   setFilter(e.target.value);
  //   const filter = e.target.value;
  //   if (filter === "All") {
  //     setFiltered(students);
  //   } else {
  //     setFiltered(
  //       students.filter((product) => product.group === filter)
  //     );
  //   }
  // };


  // useEffect(() => {
  //   setFiltered(students);
  // }, [students]);




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



  const [selectedStudent, setSelectedStudent] = useState(null);

  // ...

  const handleEdit = (student) => {
    setSelectedStudent(student);
    console.log(setSelectedStudent)
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
          record.lastName.toLowerCase().includes(value.toLowerCase()) ||
          record.firstName.toLowerCase().includes(value.toLowerCase())
        
        )
         
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
      title: 'group',
      dataIndex: 'group',
      filters: [
        { text: 'All', value: '' },
        { text: 'React N35', value: 'React N35' },
        {text: 'React N40', value: 'React N40' },
        {text: 'React N45', value: 'React N45' },
      ],
      onFilter: (value, record) => {
        if (value === '') return true;
        return record.group === value;
      }
   
    },
    {
      key: "id",
      title: 'Number',
      dataIndex: 'number',
      sorter:(record1 , record2)=>{
        return record1.number - record2.number
      }
    },
    {
      key: "id",
      title: 'Action',
      render: (record) => {
        return (
          <div >
            <Button  type='primary' onClick={()=>handleEdit(record)}>Edit</Button>
            <Button  style={{
              background:'red',
              color: 'white'
            }} onClick={() => deleteStudent(record.id)}>Delete</Button>
          </div>
        )
      }

    },
  ]


  return (

    <div className='Student'>
  <div className='Student-head'>
  <button className='btn btn-outline-success w-auto' onClick={openModal}>Add</button>
  </div>
      <Table className='Table' size='large'  dataSource={students} columns={columns} pagination={{
        current :currentPage,
        pageSize:postsPerPage,
        onChange:(page , pageSize)=>{
          setCurrentPage(page);
          setPostsPerPage(pageSize);
        }
      }}
      >


      </Table>
     <div>
     <ModalContext.Provider value={{
        addModal: state.addModal, openModal, closeModal,
        editModal: state.editModal, closeEditModal, openEditModal
        
      }}>

        <AddStudent />
        {state.editModal && <EditStudent student={selectedStudent} />}

      </ModalContext.Provider>

     </div>
     
        </div>

  
     
   
  );
};

export default Students;