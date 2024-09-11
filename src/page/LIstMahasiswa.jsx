import React, { useState } from 'react'
import supabase from '../supabase'
import { Button, Form, Input, Modal, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'antd/es/form/Form'
import { Chance } from 'chance'
import FormSubmit from '../components/FormSubmit'

const LIstMahasiswa = () => {

    const [selectedRowKey,setSelectedRowKey ] = useState([])
    const [dataEdit, setDataEdit] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [form] = useForm()


    const chance = new Chance()
    
    async function handleFakeData() {
        const fakeData = []
        for(let i = 0; i < 10; i++) {
            const nama = chance.name()
            const nim = chance.integer({min: 10000, max : 90000})
            const alamat = chance.address()
            const phone = chance.phone()

            fakeData.push({
                nama : nama,
                nim : nim,
                alamat : alamat,
                phone : phone
            })
        }
        try {
            const { error } = await supabase.from('mahasiswa').insert(fakeData)
            if(error) {
                console.info(error)
            } else {
                console.info('data berhasil disimpan')
                refetch()
            }
        } catch (error) {
            console.error(error)
        }
    }

    
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
                    <Button type='primary' htmlType='submit' onClick={() => handleOpenModal(e)} >Edit</Button>
                    <Button type='secondary' className='bg-red-500 text-white' onClick={() => handleDelete(e.id)} >Delete</Button>
                </div>
            )
        }
    },
]


function handleDeleteSelect() {
    const conf = window.confirm('Yakin ingin hapus data ini?')
    if (conf) {
      if (selectedRowKey.length === data?.length) {
        // Menghapus semua data
        supabase
          .from('mahasiswa')
          .delete()
          .then(({ error }) => {
            if (error) {
              console.error(error)
            } else {
              refetch()
              setSelectedRowKey([])
            }
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        // Menghapus data yang dipilih
        supabase
          .from('mahasiswa')
          .delete()
          .in('id', selectedRowKey)
          .then(({ error }) => {
            if (error) {
              console.error(error)
            } else {
              refetch()
              setSelectedRowKey([])
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }

     function handleSubmitEditData(newData) {
        if(dataEdit){
            supabase.from('mahasiswa').update(newData).eq("id", dataEdit.id)
       .then(res => {
            if(res.error) {
                console.error(res.error)
            } else {
                refetch()
                setIsOpenModal(false)
            }
        })
       } else {
        supabase.from('mahasiswa').insert(newData)
        .then(res => {
            if(res.error) {
                console.log(res.error)
            } else {
                refetch()
                setIsOpenModal(false)
            }
        })
       }
     }
        



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

    function handleOpenModal(e = null) {
        if (e) {
            setDataEdit(e);
            form.setFieldsValue(e);
        } else {
            setDataEdit(null);
            form.resetFields();
        }
        setIsOpenModal(true);
    }

    function handleCensel() {
        setIsOpenModal(false);
    }


 

  return (
    <div className='select-none p-4'>
    <Modal
      title={dataEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
      open={isOpenModal}
      onCancel={handleCensel}
      footer={null}
    >
      <Form onFinish={handleSubmitEditData} className='grid grid-cols-1 gap-4' form={form}>
        <Form.Item
          name='nama'
          rules={[{ required: true, message: 'Nama tidak boleh kosong' }]}
        >
          <Input placeholder='Nama' />
        </Form.Item>

        <Form.Item
          name='nim'
          rules={[{ required: true, message: 'NIM tidak boleh kosong' }]}
        >
          <Input placeholder='NIM' />
        </Form.Item>

        <Form.Item
          name='alamat'
          rules={[{ required: true, message: 'Alamat tidak boleh kosong' }]}
        >
          <Input placeholder='Alamat' />
        </Form.Item>

        <Form.Item
          name='phone'
          rules={[{ required: true, message: 'Phone tidak boleh kosong' }]}
        >
          <Input placeholder='Phone' />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='w-full'
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    <h1 className='text-2xl font-bold mb-4'>Daftar List Mahasiswa</h1>

    <div className='flex justify-between mb-4'>
      <span className='flex gap-2'>
        <Button onClick={handleFakeData} type='primary'>
          Fake Data
        </Button>
        <Button
          onClick={handleDeleteSelect}
          className={`bg-red-500 ${selectedRowKey.length ? 'block' : 'hidden'} text-white`}
        >
          {`Delete ${
            selectedRowKey.length === data?.length
              ? 'All'
              : selectedRowKey.length > 0
                ? selectedRowKey.length
                : ''
          } Data`}
        </Button>
      </span>
      <Button type='primary' onClick={() => handleOpenModal()}>
        Tambah Data
      </Button>
    </div>

    <Table
      columns={column}
      rowKey={'id'}
      dataSource={data}
      rowSelection={rowSelected}
      pagination={{ pageSize: 10 }}
    />
  </div>
  )}

export default LIstMahasiswa
