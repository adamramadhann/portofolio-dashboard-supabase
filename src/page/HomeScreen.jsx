import React, { useState } from 'react';
import { Card, Button, Progress, notification, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';

const HomeScreen = () => {
  const [event, setEvent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNotification = () => {
    notification.info({
      message: 'Pengumuman',
      description: 'Hati-hati dalam mengisi data! Pastikan semua informasi sudah benar sebelum disimpan.',
      placement: 'topRight',
    });
  };

  return (
    <div className="p-6 h-full ">
      {/* Heading */}
      <h1 className="text-4xl my-10 font-semibold text-center mb-10 text-blue-800">
        Selamat Datang di Dashboard Mahasiswa
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Statistik Mahasiswa */}
        <Card
          title="Jumlah Mahasiswa"
          bordered={false}
          className="shadow-lg pb h-[300px] relative rounded-lg flex-1 hover:shadow-2xl transition-shadow duration-500 hover:bg-blue-50 hover:scale-105"
        >
          <div className="flex absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
            <UserOutlined className="text-[70px] text-green-500" />
          </div>
          <Button
            type="primary"
            className="w-[90%] py-5 absolute bottom-5  bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:bg-gradient-to-l transition-all duration-300"
            onClick={() => navigate('/list')}
          >
            Lihat Daftar Mahasiswa
          </Button>
        </Card>

        {/* Card Statistik Pesan */}
        <Card
          title="Pesan Baru"
          bordered={false}
          className="shadow-lg relative rounded-lg flex-1 hover:shadow-2xl transition-shadow duration-500 hover:bg-green-50 hover:scale-105"
        >
          <div className="flex absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
            <MessageOutlined className="text-[70px] text-green-500" />
          </div>
          <Button
            type="primary"
            className="w-[90%] py-5 absolute bottom-5 left-1/2 translate-x-[-50%] bg-gradient-to-r from-green-500 to-green-600 text-white hover:bg-gradient-to-l transition-all duration-300"
            onClick={() => navigate('/message')}
          >
            Lihat Pesan
          </Button>
        </Card>

        {/* Card Statistik Progress */}
        <Card
        onClick={() => handleOpenModal('Halman ini Sedang Maintance')}
          title="Progress Pengisian Data"
          bordered={false}
          className="shadow-lg relative rounded-lg flex-1 hover:shadow-2xl transition-shadow duration-500 hover:bg-yellow-50 hover:scale-105"
        >
          <Progress percent={60} strokeColor="#f59e0b" className="mb-4 w-[90%] absolute top-1/2 translate-y-[-50%] " />
          <Button
            type="primary"
            className="w-[90%] py-5 absolute bottom-5 left-1/2 translate-x-[-50%] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:bg-gradient-to-l transition-all duration-300"
          >
            Lihat Detail Progress
          </Button>
        </Card>
      </div>

      {/* Section Pengumuman */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Pengumuman</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pengumuman 1 */}
          <div
            onClick={() => handleOpenModal('Hati-hati dalam mengisi data! Pastikan informasi mahasiswa Anda akurat.')}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-all duration-300 bg-white cursor-pointer"
          >
            <p className="text-gray-700">
              🌟 Selamat datang di dashboard! Harap perbarui informasi mahasiswa Anda jika ada perubahan.
            </p>
          </div>
          
          {/* Pengumuman 2 */}
          <div
            onClick={() => handleOpenModal('Data yang sudah diisi akan diproses dalam 1x24 jam.')}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-all duration-300 bg-white cursor-pointer"
          >
            <p className="text-gray-700">
              📅 Pastikan untuk mengisi data dengan lengkap sebelum deadline.
            </p>
          </div>
          
          {/* Pengumuman 3 */}
          <div
            onClick={() => handleOpenModal('Jangan lupa untuk mengikuti ujian online minggu depan.')}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-all duration-300 bg-white cursor-pointer"
          >
            <p className="text-gray-700">
              📚 Ujian online akan dilaksanakan pada tanggal 15 Desember.
            </p>
          </div>
          
          {/* Pengumuman 4 */}
          <div
            onClick={() => handleOpenModal('Pastikan Anda sudah mengumpulkan tugas sebelum tanggal 12 Desember.')}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-all duration-300 bg-white cursor-pointer"
          >
            <p className="text-gray-700">
              📝 Tugas akhir semester harus dikumpulkan paling lambat 12 Desember.
            </p>
          </div>
          
          {/* Pengumuman 5 */}
          <div
            onClick={() => handleOpenModal('Akses ke perpustakaan online akan ditutup pada tanggal 20 Desember.')}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-all duration-300 bg-white cursor-pointer"
          >
            <p className="text-gray-700">
              📚 Perpustakaan online akan tutup sementara mulai 20 Desember.
            </p>
          </div>
          
          {/* Pengumuman 6 */}
          <div
            onClick={() => handleOpenModal('Cek hasil ujian semester di portal mahasiswa pada tanggal 25 Desember.')}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-all duration-300 bg-white cursor-pointer"
          >
            <p className="text-gray-700">
              🎓 Hasil ujian semester akan diumumkan pada tanggal 25 Desember.
            </p>
          </div>
        </div>
      </div>

      {/* Modal untuk Pengumuman */}
      <Modal
        title="Pengumuman"
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Tutup
          </Button>,
        ]}
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default HomeScreen;
