import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import supabase from '../../supabase'
import { Button, Table, message, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const DetailMessage = () => {
    const [query] = useSearchParams()
    const user_id = query.get('id')

    // Fetching data
    const { data, refetch, isLoading, isError } = useQuery({
        queryKey: ['getMessage', user_id],
        queryFn: async ({ queryKey }) => {
            let user = queryKey[1]

            try {
                const { data } = await supabase.from('messages').select('*, mahasiswa(nama)').eq('user_id', user)
                return data
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    })

    // Handling delete
    function handleDelete(id) {
        supabase.from('messages').delete().eq('id', id)
            .then(res => {
                message.success('Pesan berhasil dihapus.')
                refetch()
            })
            .catch(error => {
                message.error('Terjadi kesalahan saat menghapus pesan.')
            })
    }

    // Column definitions for the table
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama Mahasiswa',
            dataIndex: 'nama',
            key: 'nama',
            render: (e, record) => {
                return <>{record.mahasiswa?.nama}</>
            }
        },
        {
            title: 'Pesan',
            dataIndex: 'message',
            key: 'message'
        },
        {
            title: 'Action',
            render: (e) => (
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(e.id)}
                >
                    Hapus
                </Button>
            )
        }
    ]

    // If loading, show a loading spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <span>Loading...</span>
            </div>
        )
    }

    // If error, show an error message
    if (isError) {
        return (
            <div className="flex justify-center items-center h-full">
                <span>Error loading data. Please try again later.</span>
            </div>
        )
    }

    return (
        <div className="p-6">
            <Card
                title="Daftar Pesan Mahasiswa"
                bordered={false}
                className="shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            >
                <Table
                    columns={columns}
                    dataSource={data || []}
                    rowKey="id"
                    className="custom-ant-table"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    )
}

export default DetailMessage
