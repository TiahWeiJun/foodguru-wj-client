import React, { useState } from "react";
import { Modal, Form, Input, Select, Radio, Slider } from "antd";
import { useHomePageContext } from "../HomeContainer";
import { generalLocations, cuisines, types } from "./helpers";

const AddPostModal = ({ username }) => {
  const {
    addPostModal,
    setAddPostModal,
    uploadImage,
    file,
    setFile,
    createPost,
  } = useHomePageContext();

  const [fileError, setFileError] = useState(null);

  const [form] = Form.useForm();

  const { Option } = Select;

  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    if (image.type !== "image/png" && image.type !== "image/jpeg") {
      setFileError("Please upload an image file");
      return;
    }
    setFileError(null);
    setFile(image);
  };

  const handleUpload = async () => {
    if (!file) {
      setFileError("Please upload an image file");
      return null;
    }

    const res = await uploadImage({ variables: { file } });
    try {
      return res.data.uploadFile.url;
    } catch (err) {
      throw err;
    }
  };

  const handleAddPost = async () => {
    const values = await form.validateFields();
    const imageURL = await handleUpload();
    if (!imageURL) return;
    const postInput = {
      ...values,
      imageURL,
      username,
    };
    console.log(postInput);
    try {
      const response = await createPost({
        variables: postInput,
      });
      if (response.data.createPost.id) {
        form.resetFields();
        setAddPostModal(false);
        window.location.reload(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title="Add A New Food Post!"
      okText="Add"
      visible={addPostModal}
      onCancel={() => setAddPostModal(false)}
      onOk={handleAddPost}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="General Location"
          name="generalLocation"
          rules={[{ required: true, message: `Please fill this up.` }]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Select a general location"
            allowClear
          >
            {generalLocations.map((loc) => (
              <Option value={loc}>{loc}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: `Please enter an address.` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: `Please fill this up.` }]}
        >
          <Select
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Select the type of shop"
            allowClear
          >
            {types.map((type) => (
              <Option value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Shop Name"
          name="nameOfShop"
          rules={[
            {
              required: true,
              message: `Please enter the name of the Shop/Stall.`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Shopping Mall/Hawker Center (Optional)"
          name="nameOfHawkerCenter"
        >
          <Input placeholder="or any building name..." />
        </Form.Item>

        <Form.Item
          label="Cuisine"
          name="cuisine"
          rules={[{ required: true, message: `Please fill this up.` }]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Select a cuisine"
            mode="multiple"
            allowClear
          >
            {cuisines.map((cuisine) => (
              <Option value={cuisine}>{cuisine}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Recommended Food"
          name="nameOfFood"
          rules={[
            { required: true, message: `Please enter the name of the food` },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price of Food ($)"
          rules={[{ required: true, message: `Please fill this up` }]}
        >
          <Slider
            defaultValue={5}
            max={60}
            marks={{
              0: "0",
              10: "10",
              20: "20",
              30: "30",
              40: "40",
              50: "50",
              60: "60",
            }}
          />
        </Form.Item>

        <Form.Item label="Review of Food (Optional)" name="description">
          <Input.TextArea
            rows={4}
            placeholder="Opening Hours, Ambience, Waiting time, Other Reccomendations etc..."
          />
        </Form.Item>

        <div class="flex sm:justify-center justify-around">
          <div class="sm:mx-8 ">
            <Form.Item
              name="isHalal"
              label="Halal-Certified"
              initialValue={false}
            >
              <Radio.Group defaultValue={false}>
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>

          <div class="sm:mx-8 ">
            <Form.Item
              name="isAirCon"
              label="Air-Conditioning"
              initialValue={false}
            >
              <Radio.Group defaultValue={false}>
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <div>
          <h1>Upload Food Image</h1>
          <input type="file" onChange={handleFileChange} />
          {fileError ? <p style={{ color: "red" }}>{fileError}</p> : null}
        </div>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
