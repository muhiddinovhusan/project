import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalContext } from './Students';

import { GlobalContext } from './stateManagmentStudents';

const AddStudent = () => {
  const { addModal, closeModal } = useContext(ModalContext);
  const { addStudent } = useContext(GlobalContext)
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    group: "",
    number: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [id]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    addStudent(student);
    console.log(student)
    closeModal();
    setStudent({
      firstName: '',
      lastName: '',
      group: '',
      number: ''
    });
  };


  function closeModalcancel() {
    closeModal();
    setStudent({
      firstName: '',
      lastName: '',
      group: '',
      number: ''
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
            value={student.firstName}
            onChange={handleInputChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor="lastName" className='form-label'>lastName</label>
          <input required type="text" className='form-control' id='lastName'
            value={student.lastName}
            onChange={handleInputChange} />
        </div>
        <div className='mb-3'>
        <label htmlFor='number' className='form-label'>
              number
            </label>
            <input
              type='text'
              className='form-control'
              id='number'
              value={student.number}
              onChange={handleInputChange}
            />

        </div>
        <div className='mb-3 form-check'>
          <label htmlFor="group" className='form-label'>group</label>
          <select required
              name='group'
              id='group'
              className='form-select w-auto'
              value={student.group}
              onChange={handleInputChange}
            >
              <option value=''>Select</option>
              <option value='React N35'>React N35</option>
              <option value='React N40 '>React N40</option>
              <option value='React N45'>React N45</option>
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

export default AddStudent