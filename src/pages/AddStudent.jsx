import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from './Students';
import { GlobalContext } from './stateManagmentStudents';
import { useForm } from 'react-hook-form';

const AddStudent = () => {
  const { addModal, closeModal } = useContext(ModalContext);
  const { addStudent } = useContext(GlobalContext);

  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm(); 

  const onSubmit = (data) => {
    addStudent(data);
    closeModal();
    reset();
  };

  const handleCloseModal = () => {
    closeModal();
    reset();
  };

  return (
    <Modal show={addModal} onHide={handleCloseModal} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <label htmlFor="firstName" className='form-label'>First Name</label>
            <input type="text" className='form-control' id='firstName' {...register('firstName', { required: true })} onBlur={() => trigger('firstName')} />
            {errors.firstName && <span className="text-danger">Firstname is required</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="lastName" className='form-label'>Last Name</label>
            <input type="text" className='form-control' id='lastName' {...register('lastName', { required: true })} onBlur={() => trigger('lastName')} />
            {errors.lastName && <span className="text-danger">Lastname is required</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='number' className='form-label'>Number</label>
            <input type='text' className='form-control' id='number' {...register('number', { required: true })} onBlur={() => trigger('number')} />
            {errors.number && <span className="text-danger">Number is required</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="group" className='form-label'>Group</label>
            <select className='form-select' id='group' {...register('group', { required: true })} onBlur={() => trigger('group')}>
              <option value=''>Select</option>
              <option value='React N35'>React N35</option>
              <option value='React N40'>React N40</option>
              <option value='React N45'>React N45</option>
            </select>
            {errors.group && <span className="text-danger">Group is required</span>}
          </div>
          <Button type="submit" variant="primary">Add</Button>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudent;
