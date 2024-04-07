import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from './Students';
import { useForm } from 'react-hook-form';

import { GlobalContext } from './stateManagmentStudents';

const EditStudent = ({ student }) => {
  const { editModal, closeEditModal } = useContext(ModalContext);
  const { updateStudent } = useContext(GlobalContext);

  const { register, handleSubmit, formState: { errors, isValid }, setValue, trigger } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    setValue('firstName', student.firstName);
    setValue('lastName', student.lastName);
    setValue('group', student.group);
    setValue('number', student.number);
  }, [student, setValue]);

  const onSubmit = (data) => {
    updateStudent(data);
    closeEditModal();
  };

  const handleFormSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };


  return (
    <div>
      <Modal show={editModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>
                firstName
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <span style={{
                color: 'red'
              }}>Student's firstName is required</span>}

            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>
                lastName
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <span style={{
                color: 'red'
              }}>Student's lastName is required</span>}
            </div>
            <div className='mb-3'>
              <select
                name='group'
                id='group'
                className='form-select w-auto'
                {...register('group', { required: true })}
              >

                <option value='React N35'>React N35</option>
                <option value='React N40'>React N40</option>
                <option value='React N45'>React N45</option>
              </select>
              {errors.group && <span style={{
                color: 'red'
              }}>Student's group is required</span>}
            </div>
            <div className='mb-3 form-check'>
              <label htmlFor='number' className='form-label'>
                number
              </label>
              <input
                type='number'
                className='form-control'
                id='number'
                {...register('number', { required: true })}
              />
              {errors.number && <span style={{
                color: 'red'
              }}>Students' number is required</span>}


            </div>
            <Button type='submit' variant='primary' disabled={!isValid}>
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

export default EditStudent;