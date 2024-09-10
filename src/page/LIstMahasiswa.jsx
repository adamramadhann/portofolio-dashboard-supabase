import React, { useState } from 'react'
import supabase from '../supabase'
import { Button, Form, Input, Modal, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'antd/es/form/Form'

const LIstMahasiswa = () => {

    const [selectedRowKey,setSelectedRowKey ] = useState([])
    const [edit, setEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const [form] = useForm()

  
  const column = [
    {
        title : "id",
        dataIndex : "id"
    },
    {
        title : "Nama Mahasiswa",
        dataIndex : "nama"
    },
    {
        title : "Nim",
        dataIndex : "nim"
    },
    {
        title : "Alamat",
        dataIndex : "alamat"
    },
    {
        title : "Telephone",
        dataIndex : "phone"
    },
    {
        title : "Action",
        render : (e) => {
            return (
                <div className=' flex gap-3 '>
                    <Button type='primary' onClick={() => handleOpenModal(e)} >Edit</Button>
                    <Button type='secondary' className='bg-red-500 text-white' onClick={() => handleDelete(e.id)} >Delete</Button>
                </div>
            )
        }
    },
]



    const {data, isError, isLoading, refetch} = useQuery({
        queryKey : ['read_data'],
        queryFn : async () => {
            try {
                const {data, error} = await supabase.from('mahasiswa').select('*').order('id', { ascending : false })
                if(error) {
                    return Response.status(500)
                }
                return data
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    })  


    async function handleDelete(id) {
        const conf = window.confirm('yakin ingin menghapus data ini ??')
        if(conf) {
        try {
            const { error } = await supabase.from('mahasiswa').delete().eq("id", id)
            if(error) return console.log(error)
            refetch()
        } catch (error) {
            console.log(error)
        }}
    }
 

    const rowSelected = {
        selectedRowKey, 
        onChange :(select) => {
            setSelectedRowKey(select)
            console.info(select)
        }
    }

    if(isLoading) {
        return (
            <div className='w-full h-full flex justify-center items-center' >
                LOADINNG....
            </div>
        )
    }

    function handleOpenModal(e) {
        setDataEdit(e)
        form.setFieldsValue(e)
        setIsModal(prev => prev = !prev)
    }
    function handleCensel() {
        setIsModal(prev => prev = !prev)
    }

 

  return (
    <div className='' >

      <Modal 
      title="Basic Modal" 
      open={isModal}  
      onCancel={handleCensel}
      footer={null}
      >
        <Form className='grid grid-cols-2' form={form}  >

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

        <h1>daftar List Mahasiswa</h1>
       <Table
      columns={column}
      rowKey={"id"}
      dataSource={data}
      rowSelection={rowSelected}
      />
    </div>
  )
}

export default LIstMahasiswa
