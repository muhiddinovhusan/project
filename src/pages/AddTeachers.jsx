import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ModalContext } from './Teachers';
import { GlobalContext2 } from './teachStateManagment';

const AddTeachers = () => {
  const { addModal, closeModal } = useContext(ModalContext);
  const { addTeacher } = useContext(GlobalContext2);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    addTeacher(data);
    console.log(data);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Modal show={addModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Teacher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor="firstName" className='form-label'>First Name</label>
            <input
              type="text"
              className='form-control'
              id='firstName'
              {...register('firstName', { required: true })}
              onBlur={() => trigger('firstName')}
            />
            {errors.firstName && <span className="text-danger">FIrstName is required</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="lastName" className='form-label'>Last Name</label>
            <input
              type="text"
              className='form-control'
              id='lastName'
              {...register('lastName', { required: true })}
              onBlur={() => trigger('lastName')}
            />
            {errors.lastName && <span className="text-danger">LastName is required</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='groups' className='form-label'>Groups</label>
            <input
              type='text'
              className='form-control'
              id='groups'
              {...register('groups', { required: true })}
              onBlur={() => trigger('groups')}
            />
            {errors.groups && <span className="text-danger">Groups is required</span>}
          </div>
          <div className='mb-3 form-check'>
            <label htmlFor="level" className='form-label'>Level</label>
            <select
              className='form-select w-auto'
              id='level'
              {...register('level', { required: true })}
              onBlur={() => trigger('level')}
            >
              <option value=''>Select</option>
              <option value='Junior'>Junior</option>
              <option value='Middle'>Middle</option>
              <option value='Senior'>Senior</option>
            </select>
            {errors.level && <span className="text-danger">Level is required</span>}
          </div>
          <div className='d-flex justify-content-end'>
            <Button type="submit" variant="primary" className='me-2'>Add</Button>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTeachers;
