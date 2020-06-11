import React from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'
import { FaMapMarkerAlt as IconOrigin } from 'react-icons/fa'
import { GiCheckeredFlag as IconDestination } from 'react-icons/gi'

const QuoteForm = ({ onCancel, onOk, visible }) => {
  const [form] = Form.useForm()

  const cancel = () => {
    form.resetFields()
    onCancel()
  }

  const onFinish = () => {
    const quote = form.getFieldsValue()
    form.resetFields()
    onOk(quote)
  }

  return (
    <Modal
      closable={false}
      footer={null}
      title='Request a new quote'
      visible={visible}
    >
      <Form
        colon={false}
        form={form}
        hideRequiredMark
        labelCol={{ span: 5 }}
        name='quote'
        onFinish={onFinish}
      >
        <Form.Item
          label='Origin'
          name='origin'
          rules={[
            {
              required: true,
              message: 'Please input a valid address'
            },
            {
              whitespace: true,
              message: 'Please input a valid address'
            }
          ]}
        >
          <Input placeholder='Address' prefix={<IconOrigin />} />
        </Form.Item>
        <Form.Item
          label='Destination'
          name='destination'
          rules={[
            {
              required: true,
              message: 'Please input a valid address'
            },
            {
              whitespace: true,
              message: 'Please input a valid address'
            }
          ]}
        >
          <Input placeholder='Address' prefix={<IconDestination />} />
        </Form.Item>
        <Form.Item
          label='Cargo details'
          name='details'
          rules={[
            {
              required: true,
              message: 'Please input a cargo description'
            },
            {
              whitespace: true,
              message: 'Please input a cargo description'
            }
          ]}
        >
          <Input.TextArea
            placeholder='Description together with volume and weigth'
            rows={4}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Space>
            <Button onClick={cancel}>Cancel</Button>
            <Button htmlType='submit' type='primary'>
              Request
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default QuoteForm
