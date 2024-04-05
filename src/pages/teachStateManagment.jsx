import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  teachers: [],


};

export const GlobalContext2 = createContext(initialState);
const reducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
  
         teachers: [],
       
      };
    case "Success":
      return {
        ...state,
 
        teachers: action.payload,
      
      };
    case "Error":
      return {
        ...state,
      
        teachers: [],
        error: "Something went wrong",
      };
    case "ADD_STUDENT":
      return { ...state,
        
         teachers: [...state.teachers, action.payload] };
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
      case "DELETE_STUDENT":
        return {
          ...state,
          teachers: state.teachers.filter(
            (student) => student.id !== action.payload
          ),
        };
        case "UPDATE_STUDENT":
          return {
            ...state,
            teachers: state.teachers.map((student) => {
              return student.id == action.payload.id ? action.payload : student;
            }),
          };
    default:
      return state;
  }
};


export const GlobalProvider2 = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTeachers = async () => {
    dispatch({ type: "PENDING" });
    try {
      const res = await axios.get("http://localhost:3000/teachers");
      console.log(res.data);
      dispatch({ type: "Success", payload: res.data });
    } catch (error) {
      dispatch({ type: "Error" });
    }
  };
  




  const addTeacher= async (teacher) => {
    try {
      const res = await axios.post("http://localhost:3000/teachers", teacher);
      dispatch({ type: "ADD_STUDENT", payload: res.data });
    } catch (error) {
      dispatch({ type: "Error" });
    }
  };


  const deleteTeachers = async (id) => {
    const confirm = window.confirm('Are you sure you want to log out?');
    if (confirm) {

      await axios.delete(`http://localhost:3000/teachers/${id}`).then(() => {
        dispatch({ type: "DELETE_STUDENT", payload: id });
      });
    } else {
      alert('the action was cancelled')
    }
   
  };

  const updateTeacher= async (student) => {
    await axios
      .put(`http://localhost:3000/teachers/${student.id}`, student)
      .then((res) => {
        dispatch({ type: "UPDATE_STUDENT", payload: res.data });
      });
  };






  return (
    <GlobalContext2.Provider
      value={{
        teachers: state.teachers,
      getTeachers,
      addTeacher,
      deleteTeachers,
      updateTeacher,
      }}
    >
      {children}
      
    </GlobalContext2.Provider>
  );
};