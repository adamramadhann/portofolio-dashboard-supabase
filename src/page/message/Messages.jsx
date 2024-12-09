import { useQuery } from '@tanstack/react-query';
import { Button, Spin, Table, message } from 'antd';
import React from 'react';
import supabase from '../../supabase';
import dayjs from 'dayjs'; // Import dayjs untuk memformat tanggal

const Messages = () => {
  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["user_message"],
    queryFn: async () => {
      const { data, error } = await supabase.from('messages').select('*').order('id', { ascending: false });
      if (error) {
        console.error(error);
        return [];
      }
      return data;
    },
  });

  // Delete message handler
  function handleDelete(id) {
    const conf = window.confirm('Are you sure you want to delete this message?');
    if (conf) {
      supabase.from('messages').delete().eq('id', id)
        .then(res => {
          message.success('Message deleted successfully');
          refetch();
        })
        .catch(error => {
          message.error('Failed to delete message');
        });
    }
  }

  // Format the 'created_at' column to show only date (DD-MM-YYYY)
  const formatDate = (date) => dayjs(date).format('DD-MM-YYYY');

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{formatDate(text)}</span>, 
    },
    {
      title: "Action",
      render: (e) => (
        <Button
          type="primary"
          onClick={() => handleDelete(e.id)}
          danger
          className="w-28 mt-2 hover:scale-105 transition-all duration-300"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 rounded-lg w-full">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Messages</h2>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              position: ['bottomCenter'],
            }}
            className="custom-ant-table"
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
