import React from 'react';
import { Card, Descriptions, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
  // Placeholder data kosong
  const user = {
    nama: 'Nama Pengguna',
    email: 'user@example.com',
    phone: '08XXXXXXXXXX',
    address: 'Alamat belum diatur',
    dob: 'Tanggal lahir belum diatur',
  };

  return (
    <div className="p-6 h-full">
      {/* Card Profil */}
      <Card
        className="max-w-6xl relative mx-auto h-[60%] shadow-lg rounded-lg p-6 bg-white"
        title={
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-4xl mt-10 font-bold text-blue-600 text-center">
              Profil Pengguna
            </h1>
          </div>
        }
        extra={
          <Button type="primary" className="bg-blue-600 absolute right-3 top-3 text-white">
            <NavLink to="/" className="text-white">
              Home
            </NavLink>
          </Button>
        }
      >
        {/* Descriptions */}
        <Descriptions bordered column={1} className="mt-10 ">
          <Descriptions.Item className='' label="Nama">
            <span className="text-lg  font-semibold">{user.nama}</span>
          </Descriptions.Item>
          <Descriptions.Item className='' label="Email">
            <span className="text-lg ">{user.email}</span>
          </Descriptions.Item>
          <Descriptions.Item className='' label="Nomor Telepon">
            <span className="text-lg ">{user.phone}</span>
          </Descriptions.Item>
          <Descriptions.Item className='' label="Alamat">
            <span className="text-lg ">{user.address}</span>
          </Descriptions.Item>
          <Descriptions.Item className='' label="Tanggal Lahir">
            <span className="text-lg ">{user.dob}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Sistem Informasi Mahasiswa. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
