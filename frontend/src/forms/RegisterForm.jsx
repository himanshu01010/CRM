import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';
import { countryList } from '@/utils/countryList';
import useRegister from '@/hooks/useRegister';

export default function RegisterForm({ userLocation }) {
  const translate = useLanguage();
  const { registerUser, isLoading } = useRegister();

  const onFinish = (values) => {
    registerUser(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="name"
        label={translate('name')}
        rules={[
          {
            required: true,
            message: translate('please_input_your_name'),
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" />
      </Form.Item>
      <Form.Item
        name="email"
        label={translate('email')}
        rules={[
          {
            required: true,
            message: translate('please_input_your_email'),
          },
          {
            type: 'email',
            message: translate('please_input_valid_email'),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={translate('password')}
        rules={[
          {
            required: true,
            message: translate('please_input_your_password'),
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label={translate('confirm_password')}
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: translate('please_confirm_your_password'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(translate('passwords_do_not_match')));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" />
      </Form.Item>
      <Form.Item
        label={translate('country')}
        name="country"
        rules={[
          {
            required: true,
            message: translate('please_select_your_country'),
          },
        ]}
        initialValue={userLocation}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
          }
          style={{
            width: '100%',
          }}
          size="large"
        >
          {countryList.map((country) => (
            <Select.Option
              key={country.value}
              value={country.value}
              label={translate(country.label)}
            >
              {country?.icon && country?.icon + ' '}
              {translate(country.label)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
          {translate('register')}
        </Button>
      </Form.Item>
    </Form>
  );
}