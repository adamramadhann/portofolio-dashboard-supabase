import { useQuery } from '@tanstack/react-query'
import { Button, Table } from 'antd'
import React from 'react'
import supabase from '../../supabase'

const Messages = () => {

    const {isError, isLoading, data, refetch} = useQuery({
        queryKey : ["user_message"],
        queryFn : async () => {
            const {data , Error} = await supabase.from('messages').select('*').order('id', { ascending : false})
            try {
                console.log(data)
                return data
            } catch (error) {
                console.error(Error)
                console.log(data)
            }
        }
    })


    function handleDelete(e) {
        const conf = window.confirm('are you sure you want to delete this message? ')
        if(conf) {
            supabase.from('messages').delete().eq('id', e)
            .then(res => {
                console.log(res)
                refetch()
            })
        }
    }

    const column = [
        {
            title : 'User Id',
            dataIndex : "id",
            key : 'id'
        },
        {
            title : 'Message',
            dataIndex : "message",
            key : 'message'
        },
        {
            title : "Action",
            render : (e) => (
              <div>
                <Button type="primary" onClick={() => handleDelete(e.id)} danger>Delete</Button>

              </div>
            )
          }
    ]



  return (



    <div >
      <Table
      className='flex flex-col items-center w-full'
        columns={column}
        dataSource={data}
        />
    </div>
  )
}

export default Messages
