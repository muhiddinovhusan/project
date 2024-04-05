import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'


import { ModalContext } from './Teachers';
import { GlobalContext2 } from './teachStateManagment';

const AddTeachers = () => {
  const { addModal, closeModal } = useContext(ModalContext);
  const { addTeacher } = useContext(GlobalContext2)
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    groups: [],
    level: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setTeacher((prevStudent) => ({
      ...prevStudent,
      [id]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    addTeacher(teacher);
    console.log(teacher);
  closeModal()
    setTeacher({
      firstName: '',
      lastName: '',
      groups: [],
      level: ''
    });
  };


  function closeModalcancel() {
    closeModal();
    setTeacher({
      firstName: '',
      lastName: '',
      groups: [],
      level: ''
    });
  }

  return (


    <div>   <Modal show={addModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title> Add student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} >
          <div className='mb-4'>
            <label htmlFor="firstName" className='form-label'>firstName</label>
            <input required type="text"

              className='form-control'
              id='firstName'
              value={teacher.firstName}
              onChange={handleInputChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor="lastName" className='form-label'>lastName</label>
            <input required type="text" className='form-control' id='lastName'
              value={teacher.lastName}
              onChange={handleInputChange} />
          </div>
          <div className='mb-3'>
          <label htmlFor='groups' className='form-label'>
                groups
              </label>
              <input
                type='text'
                className='form-control'
                id='groups'
                value={teacher.groups}
                onChange={handleInputChange}
              />

          </div>
          <div className='mb-3 form-check'>
            <label htmlFor="level" className='form-label'>level</label>
            <select required
                name='level'
                id='level'
                className='form-select w-auto'
                value={teacher.level}
                onChange={handleInputChange}
              >
                <option value=''>Select</option>
                <option value='Junior'>Junior</option>
                <option value='Middle'>Middle</option>
                <option value='Senior'>Senior</option>
              </select>
               
          </div>
          <Button type="submit" variant="primary">
            Add

          </Button>
          <Button variant="secondary" onClick={closeModalcancel}>
            Cancel
          </Button>
        </form>
      </Modal.Body>



    </Modal></div>
  )
}

export default AddTeachers