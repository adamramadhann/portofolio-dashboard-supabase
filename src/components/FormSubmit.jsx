import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import supabase from '../supabase'


const FormSubmit = ({isOpen, isCensel }) => {

  async function handleSubmit(e) {
    try {
      const {data} = await supabase.from('mahasiswa').insert([{
        nama : value.nama,
        nim : value.nim,
        almat : value.almat,
        phone : value.phone
      }])
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
        <Modal 
      title="Basic Modal" 
      open={isOpen}
      onCancel={isCensel}
      footer={null}
      >
        
        <Form onFinish={handleSubmit}  className='grid grid-cols-2'   >

            <Form.Item name='nama'   >
            <Input placeholder="Basic usage" value='nama' className='w-[220px]' />
            </Form.Item>

            <Form.Item name='nim' >
            <Input placeholder="Basic usage"  className='w-[220px]' />
            </Form.Item>

            <Form.Item name='alamat'>
            <Input placeholder="Basic usage" className='w-[220px]' />
            </Form.Item>

            <Form.Item name='phone' >
            <Input placeholder="Basic usage"  className='w-[220px]' />
            </Form.Item>
            <Button className='relative left-1/2 translate-x-1/2 w-[220px] ' type='primary' >Submit</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default FormSubmit
