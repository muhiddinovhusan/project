import React, { useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from './Teachers';
import { GlobalContext2 } from './teachStateManagment';
import { useForm } from 'react-hook-form';

const EditTeachers = ({ student }) => {
  const { editModal, closeEditModal } = useContext(ModalContext);
  const { updateTeacher } = useContext(GlobalContext2);

  const { register, handleSubmit, formState: { errors, isValid }, setValue, trigger } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    setValue('firstName', student.firstName);
    setValue('lastName', student.lastName);
    setValue('groups', student.groups);
    setValue('level', student.level);
  }, [student, setValue]);

  const onSubmit = (data) => {
    updateTeacher(data);
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
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <span style={{
                color: 'red'
              }}>Teacher's firstName is required</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <span style={{
                color: 'red'
              }}>Teacher's lastName is required</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='groups' className='form-label'>
                Groups
              </label>
              <input
                type='text'
                className='form-control'
                id='groups'
                {...register('groups', { required: true })}
              />
              {errors.groups && <span style={{
                color: 'red'
              }}>Teacher's group/groups is/are required</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='level' className='form-label'>
                Level
              </label>
              <select
                name='level'
                id='level'
                className='form-select'
                {...register('level', { required: true })}
              >
                <option value='Junior'>Junior</option>
                <option value='Middle'>Middle</option>
                <option value='Senior'>Senior</option>
              </select>
              {errors.level && <span style={{
                color: 'red'
              }}>Teacher's level is required</span>}
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

export default EditTeachers;