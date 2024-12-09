import { useQuery } from '@tanstack/react-query'
import { Button, Form, message, Select } from 'antd'
import React, { useState } from 'react'
import supabase from '../../supabase'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'

const FormMessage = () => {
  const [valueSelect, setValueSelect] = useState("ALL")
  const [form] = useForm()

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['dataSelect'],
    queryFn: async () => {
      const { error, data } = await supabase.from('mahasiswa').select('*')
      if (error) {
        console.log(error)
      } else {
        return data
      }
    }
  })

  const optionSelect = [
    {
      label: "ALL",
      value: "ALL"
    },
    ...data ? data.map((e) => ({
      label: e.nama,
      value: e.id
    })) : []
  ]

  function handleSubmit(e) {
    const send_message = valueSelect === "ALL" ? 
      data.map((value) => ({
        user_id: value.id,
        message: e.message
      })) : 
      [{
        user_id: valueSelect,
        message: e.message
      }]

    supabase.from('messages').insert(send_message)
      .then(res => {
        if (res.error) {
          console.error(res.error)
        } else {
          message.success('Pesan berhasil dikirim')
          refetch()
          form.resetFields()
        }
      })
  }

  return (
    <div className="w-[60%] mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Message Data Mahasiswa</h1>

      <Form form={form} onFinish={handleSubmit} className=' w-full' layout="vertical">
        {/* Select Mahasiswa */}
        <Form.Item 
          label="Pilih Mahasiswa" 
          name="user_id" 
          rules={[{ required: true, message: 'Pilih mahasiswa terlebih dahulu' }]}
        >
          <Select
            showSearch
            optionFilterProp="label"
            options={optionSelect}
            value={valueSelect}
            onChange={setValueSelect}
            className="w-full"
            placeholder="Pilih mahasiswa"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        {/* Message Field */}
        <Form.Item 
          label="Pesan" 
          name="message" 
          rules={[{ required: true, message: 'Pesan tidak boleh kosong' }]}
        >
          <TextArea
            size="large"
            placeholder="Tulis pesan di sini..."
            className="w-full rounded-lg"
            rows={4}
          />
        </Form.Item>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4 py-5 text-lg rounded-sm"
            loading={isLoading}
            disabled={isLoading}
            style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
          >
            {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FormMessage
