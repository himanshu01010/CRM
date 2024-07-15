import React from 'react';
import { Form, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';

const { Option } = Select;

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  // Add more currencies as needed
];

const SelectCurrency = () => {
  const translate = useLanguage();

  return (
    <Form.Item
      name="currency"
      label={translate('Currency')}
      rules={[
        {
          required: true,
          message: translate('Please select a currency'),
        },
      ]}
    >
      <Select
        showSearch
        placeholder={translate('Select a currency')}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {currencies.map((currency) => (
          <Option key={currency.code} value={currency.code}>
            {`${currency.code} - ${currency.symbol} - ${currency.name}`}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectCurrency;