import React, { useState } from "react";
import supabase from "../supabase";
import { Modal, Table, Form, Input, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "antd/es/form/Form";
import { FaTrashAlt, FaEdit, FaEnvelope } from "react-icons/fa";
import { Chance } from "chance";
import { useNavigate } from "react-router-dom";

const ListMahasiswa = () => {
  const [selectedRowKey, setSelectedRowKey] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();

  const chance = new Chance();

  // Handle data palsu
  async function handleFakeData() {
    const fakeData = [];
    for (let i = 0; i < 10; i++) {
      const nama = chance.name();
      const nim = chance.integer({ min: 10000, max: 90000 });
      const alamat = chance.address();
      const phone = chance.phone();

      fakeData.push({
        nama: nama,
        nim: nim,
        alamat: alamat,
        phone: phone,
      });
    }
    try {
      const { error } = await supabase.from("mahasiswa").insert(fakeData);
      if (error) {
        console.error(error);
      } else {
        console.info("Data berhasil disimpan");
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Kolom tabel
  const column = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 50,
    },
    {
      title: "Nama Mahasiswa",
      dataIndex: "nama",
      align: "left",
      width: 200,
    },
    {
      title: "NIM",
      dataIndex: "nim",
      align: "center",
      width: 100,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      align: "left",
      width: 250,
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      align: "center",
      width: 150,
    },
    {
      title: "Action",
      render: (e) => {
        return (
          <div className="flex gap-3 justify-center">
            <FaEdit
              className="text-blue-500 cursor-pointer hover:scale-110"
              size={20}
              onClick={() => handleOpenModal(e)}
            />
            <FaTrashAlt
              className="text-red-500 cursor-pointer hover:scale-110"
              size={20}
              onClick={() => handleDelete(e.id)}
            />
            {e.messages?.length > 0 && (
              <FaEnvelope
                className="text-green-500 cursor-pointer hover:scale-110"
                size={20}
                onClick={() =>
                  navigate(`/detailMessage?id=${e.id}&nama=${e.nama}`)
                }
              />
            )}
          </div>
        );
      },
      align: "center",
      width: 150,
    },
  ];

  const rowSelected = {
    selectedRowKey,
    onChange: (select) => {
      setSelectedRowKey(select);
    },
  };

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["read_data"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("mahasiswa")
          .select("*, messages(*)", { count: "exact" })
          .order("id", { ascending: false });

        if (error) {
          throw error;
        }
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  // Fungsi hapus data
  async function handleDelete(id) {
    const conf = window.confirm("Yakin ingin menghapus data ini?");
    if (conf) {
      try {
        const { error } = await supabase.from("mahasiswa").delete().eq("id", id);
        if (error) console.error(error);
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Fungsi hapus data terpilih
  async function handleDeleteSelect() {
    const conf = window.confirm("Yakin ingin hapus data yang dipilih?");
    if (conf) {
      try {
        const { error } = await supabase
          .from("mahasiswa")
          .delete()
          .in("id", selectedRowKey);
        if (error) {
          console.error(error);
        } else {
          refetch();
          setSelectedRowKey([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Handle modal
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

  function handleSubmitEditData(newData) {
    if (dataEdit) {
      supabase
        .from("mahasiswa")
        .update(newData)
        .eq("id", dataEdit.id)
        .then((res) => {
          if (res.error) {
            console.error(res.error);
          } else {
            refetch();
            setIsOpenModal(false);
          }
        });
    } else {
      supabase
        .from("mahasiswa")
        .insert(newData)
        .then((res) => {
          if (res.error) {
            console.error(res.error);
          } else {
            refetch();
            setIsOpenModal(false);
          }
        });
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="select-none h-full mx-10">
      <Modal
        title={dataEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        open={isOpenModal}
        onCancel={handleCensel}
        footer={null}
      >
        <Form
          onFinish={handleSubmitEditData}
          className="grid grid-cols-1 gap-4"
          form={form}
        >
          <Form.Item
            name="nama"
            rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
          >
            <Input placeholder="Nama" />
          </Form.Item>

          <Form.Item
            name="nim"
            rules={[{ required: true, message: "NIM tidak boleh kosong" }]}
          >
            <Input placeholder="NIM" />
          </Form.Item>

          <Form.Item
            name="alamat"
            rules={[{ required: true, message: "Alamat tidak boleh kosong" }]}
          >
            <Input placeholder="Alamat" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Phone tidak boleh kosong" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <h1 className="text-4xl font-bold text-center mb-4">Daftar List Mahasiswa</h1>

      <div className="flex justify-between mb-4">
        <span className="flex gap-2">
          <Button onClick={handleFakeData} type="primary">
            Fake Data
          </Button>
          <Button
            onClick={handleDeleteSelect}
            className={`bg-red-500 ${
              selectedRowKey.length ? "block" : "hidden"
            } text-white`}
          >
            {`Delete ${
              selectedRowKey.length === data?.length
                ? "All"
                : selectedRowKey.length > 0
                ? selectedRowKey.length
                : ""
            } Data`}
          </Button>
        </span>
        <Button type="primary" onClick={() => handleOpenModal()}>
          Tambah Data
        </Button>
      </div>

      <div className="bg-white rounded-md " >
        <Table
          columns={column}
          rowKey={"id"}
          dataSource={data}
          rowSelection={rowSelected}
          pagination={{
            pageSize: 10,  
            showSizeChanger: false,
            position: ['bottomCenter'],
          }}
          className="custom-ant-table "
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default ListMahasiswa;
