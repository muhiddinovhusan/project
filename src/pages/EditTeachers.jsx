import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from './Teachers';
import { GlobalContext2 } from './teachStateManagment';



const EditTeachers = ({ student }) => {
  const { editModal, closeEditModal } = useContext(ModalContext);
  const { updateTeacher } = useContext(GlobalContext2);

  const [editedTeacher, setEditedTeacher] = useState(student);



  const handleInputChange = (e) => {
    setEditedTeacher({
      ...editedTeacher,
      [e.target.id]: e.target.value
    })
  }


  const handleUpdate = (e) => {
    e.preventDefault();
    updateTeacher(editedTeacher)
    closeEditModal();
    setEditedTeacher({
      firstName: '',
      lastName: '',
      groups : [],
    level:''
    });
  };

  return (
    <div>
      <Modal show={editModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>
                firstName
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                value={editedTeacher.firstName}
                onChange={handleInputChange}

              />
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>
                lastName
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                value={editedTeacher.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              {/* <select
                name='group'
                id='group'
                className='form-select w-auto'
                value={editedTeacher.groups}
                onChange={handleInputChange}
              >
                <option value='All'>Select</option>
                <option value='React N35'>React N35</option>
                <option value='React N40'>React N40</option>
                <option value='React N45'>React N45</option>
              </select> */}
                     <label htmlFor='groups' className='form-label'>
                groups
              </label>
              <input
                type='text'
                className='form-control'
                id='groups'
                value={editedTeacher.groups}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3 form-check'>
              {/* <label htmlFor='level' className='form-label'>
                groups */}
              {/* <input
                type='number'
                className='form-control'
                id='number'
                value={editedTeacher.level}
                onChange={handleInputChange}
              /> */}
                  <select
                name='level'
                id='level'
                className='form-select w-auto'
               
              >
                <option value='Junior'>Junior</option>
                <option value='Middle'>Middle</option>
                <option value='Senior'>Senior</option>
              </select>
              {/* <Box  width={250}>
              <TextField required  label='Select'  select fullWidth   value={editedTeacher.level}
                onChange={handleInputChange}  id="level" name='level'
              >

            
              <MenuItem value='Junior'>Junior</MenuItem>
              <MenuItem value='Middle'>Middle</MenuItem>
              <MenuItem value='Senior'>Senior</MenuItem>
              </TextField>
            </Box> */}
            </div>
            <Button type='submit' variant='primary'>
              Edit
            </Button>
            <Button variant='secondary' onClick={closeEditModal}>
              Cancel
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditTeachers;