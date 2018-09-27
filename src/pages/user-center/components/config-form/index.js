import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Upload, message } from 'antd';
import { connect } from 'dva';

import './index.scss';

const FormItem = Form.Item;

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can\'t upload without JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class ConfForm extends React.Component {
  static defaultProps = {
    submit: () => { },
    data: {}
  }

  static propTypes = {
    submit: PropTypes.func,
  }

  state = {
    upVisible: false,
  }

  handleCancel = () => {
    this.setState({ UpVisible: false });
  }

  showModal = () => {
    this.setState({
      UpVisible: true,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }

  handleChange = (info) => {
    if (info.file.response !== undefined) {
      console.log(info.file.response.path);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { data, icon } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="confForm-form" >
        <div style={{ position: 'relative' }}>
          <Upload
            name="icon"
            showUploadList={false}
            // action={`${serverIp}/files/icon`}
            onChange={this.handleChange}
            withCredentials // 允许携带cookie
            beforeUpload={beforeUpload}>
            <div className="confForm-img">
              <img src={icon} className="confForm-header" alt={data.accountName} />
              <a className="confForm-header-a" onClick={this.showModal}>Change</a>
            </div>
          </Upload>
          <FormItem
            {...formItemLayout}
            label="编号">
            <Input defaultValue={`${data.id}`} style={{ width: 200 }} disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="昵称">
            <Input defaultValue={`${data.accountName}`} style={{ width: 200 }} disabled />
          </FormItem>
        </div>
        <FormItem
          {...formItemLayout}
          label="性别">
          {getFieldDecorator('gender', {
            initialValue: `${data.gender}`,
          })(
            <Radio.Group >
              <Radio.Button value="1">男</Radio.Button>
              <Radio.Button value="2">女</Radio.Button>
              <Radio.Button value="3">保密</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="签名">
          {getFieldDecorator('description', {
            initialValue: data.description,
            rules: [{ max: 120 }]
          })(
            <Input.TextArea placeholder="这人很懒，都没写，哼~ ╭(╯^╰)╮" style={{ height: 88, resize: 'none' }} />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form >
    );
  }
}

const ConfFormWarpper = Form.create()(ConfForm);

function select(state) {
  return {
    icon: state.user.avatar
  };
}

export default connect(select)(ConfFormWarpper);
