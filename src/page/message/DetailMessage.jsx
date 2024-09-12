import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import supabase from '../../supabase'
import { Button, Table } from 'antd'



const DetailMessage = () => {

    const [query] = useSearchParams()
    const user_id = query.get('id')

    const { data, refetch } = useQuery({
        queryKey : ['getMessage', user_id],
        queryFn : async ({queryKey}) => {
            let user = queryKey[1]

            try {
                const {data} = await supabase.from('messages').select('*, mahasiswa(nama)').eq('user_id', user)
                console.info(data)
                return data
                
            } catch (error) {
                console.error(error)
            }
        }
    })

    function handleDelete(id) {
        supabase.from('messages').delete().eq('id', id)
        .then(res => {
            console.info(res)
            alert('pesan berhasil dihapus ')
            refetch()
        })
    }

    const column = [
        {
            title : 'id',
            dataIndex : 'id',
            key : 'id'
        },
        {
            title : 'Nama Mahasiswa', 
            dataIndex : 'nama',
            key : 'nama',
            render : (e, record) => {
                return <>{record.mahasiswa.nama}</>
            } 
        },
        {
            title : 'Messages',
            dataIndex : 'message',
            key : 'message'
        },
        {
            title : "Action",
            render : (e) => (
                <Button type='primary' danger onClick={() => handleDelete(e.id)}  >delete</Button>
            )
        }
    ]


  return (
    <div>
        <Table
            columns={column}
            dataSource={data || []}
            rowKey='id'
        />
    </div>
  )
}

export default DetailMessage
