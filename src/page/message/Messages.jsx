import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'
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
            }
        }
    })



    const column = [
        {
            title : 'User Id',
            dataIndex : "user_id",
            key : 'user_id'
        },
        {
            title : 'Message',
            dataIndex : "message",
            key : 'message'
        },
    ]
  return (



    <div>
      <Table
        columns={column}
        dataSource={data}
        />
        

    </div>
  )
}

export default Messages
