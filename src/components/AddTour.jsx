import React, {useContext} from 'react';
import {Button, Form, Input, InputNumber, message, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {AuthContext} from '../contexts/AuthContext.jsx';


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const AddTour = () => {
    const {addedTour} = useContext(AuthContext);
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const endPoint = "http://localhost:8000/user/admin/added_tour/photo"
    const normFile = (e) => {
        console.log('Upload event:', e);
        return e;
    };

    const onFinish = async (values) => {
        const { name, location, description, price, photo } = values;
        try {
            const response = await addedTour(name, location, description, price, photo.fileList);
            message.success(response.message);
        } catch (error) {
            message.error(error.response.data.detail);
        }
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input tour name',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[
                    {
                        required: true,
                        message: 'Please input tour location',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input tour description',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label="Price"
                       name="price"
                       rules={[
                           {
                               required: true,
                               message: 'Please input tour price',
                           },
                       ]}
            >
            <span>
                <InputNumber min={0}/> $
        </span>
            </Form.Item>
            <Form.Item label="Photo">
                <Form.Item name="photo" valuePropName="file" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action={endPoint} headers={headers} multiple={true} listType="picture" showUploadList={{showRemoveIcon: false}} accept={".png,.jpeg"}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        )
}
export default AddTour;

