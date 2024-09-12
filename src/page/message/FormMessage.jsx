import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, message, Select } from 'antd'
import React, { useState } from 'react'
import supabase from '../../supabase'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'

const FormMessage = () => {

  const [valueSelect, setValueSelect] = useState("ALL")
  const [form] = useForm()


  const {isError, isLoading, data, refetch} = useQuery({
    queryKey : ['dataSelect'],
    queryFn : async () => {
      const { error, data} = await supabase.from('mahasiswa').select('*')
      if(error) {
        console.log(error)
      } else {
        return data
      }
    }
  })


    const optionSelect = [
      {
        label : "ALL",
        value : "ALL"
      }, 
        ...data ? data.map((e) => ({
          label : e.nama,
          value : e.id
        })) : []
    ]


    function handleSubmit(e) {
      if(valueSelect === "ALL") {
        const send_message = data.map((value) => ({
          user_id : value.id,
          message : e.message
        }))
        supabase.from('messages').insert(send_message)
        .then(res => {
          if(res.error) {
            console.error(res.error)
          } else {
            alert('pesan berhasil dikirim ')
            refetch()
            form.resetFields()
          }
        })
      } else {
        const send_message = {
          user_id : valueSelect,
          message : e.message
        }
        supabase.from('messages').insert(send_message)
        .then(res => {
          if(res.error) {
            console.error(res.error)
          } else {
            alert('pesan berhasil dikirim ')
            refetch()
            form.resetFields()
          }
      })
      }
    }
  



  return (
    <div className='w-[500px] '>
      <Form form={form} onFinish={handleSubmit}>
        <h1> Message Data Mahasiswa </h1>
        <Form.Item>
          <Select 
          showSearch
          optionFilterProp='label'
          options={optionSelect}
          defaultValue={valueSelect}
          onChange={(value) => setValueSelect(value)}
          />
        </Form.Item>
        <Form.Item className='flex flex-col' name={'message'}  >
          <TextArea size='large' placeholder='Message ' />
        </Form.Item>
        <Button type='primary' htmlType='submit' >Send Message</Button>
      </Form>
    </div>
  )
}

export default FormMessage
