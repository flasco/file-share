import React, { Component } from 'react';
import { Form, Upload, Button, Input, Radio } from 'antd';


const FormItem = Form.Item;

class FileEdit extends Component {
  state = {
    FileCnt: 0,
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 开始上传文件
        this.props.onSubmit(values);
      }
    });
  }

  formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }

  normFile = (e) => {
    this.setState({
      FileCnt: e.fileList.length
    });
    this.props.form.setFieldsValue({
      fileName: e.fileList.length > 0 ? e.fileList[0].name : ''
    });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList[0];
  }

  isLt500M = (rule, value, callback) => {
    const isLt500M = value.size / 1024 / 1024 <= 500;
    const msg = isLt500M ? '' : '文件大小不能超过500MB';
    callback(msg);
  }

  renderUpload = (getFieldDecorator, file, isCreate = true) => {
    if (isCreate) {
      return (
        <FormItem
          wrapperCol={{ span: 14, offset: 6 }}>
          {getFieldDecorator('file', {
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: '请选择需要上传的文件', validator: this.isLt500M }],
          })(
            <Upload
              name="file"
              action="url"
              withCredentials
              beforeUpload={() => false}>
              <Button disabled={file != null}>
                选择文件
              </Button>
            </Upload>
          )}
        </FormItem>
      );
    }
    return null;
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const file = getFieldValue('file');
    const data = this.props.data || {
      fileName: '',
      description: '',
      points: '',
    };
    return (
      <Form onSubmit={this.onSubmit}>
        {this.renderUpload(getFieldDecorator, file, this.props.data == null)}
        <FormItem
          {...this.formItemLayout}
          label="文件名">
          {getFieldDecorator('fileName', {
            initialValue: data.fileName,
            rules: [{ required: true, message: '请填写文件名' }],
          })(
            <Input placeholder="文件名" style={{ width: 400 }} />
          )}
        </FormItem>
        <FormItem
          {...this.formItemLayout}
          label="简介">
          {getFieldDecorator('introduce', {
            initialValue: data.description,
            rules: [{ required: true, message: '请填写文件简介', max: 120 }],
          })(
            <Input.TextArea placeholder="这里是文件简介" style={{ height: 88, resize: 'none' }} />
          )}
        </FormItem>
        <FormItem
          {...this.formItemLayout}
          label="所需积分">
          {getFieldDecorator('point', {
            initialValue: data.points,
            rules: [{ required: true, message: '请选择所需积分' }],
          })(
            <Radio.Group>
              <Radio.Button value="1">3</Radio.Button>
              <Radio.Button value="2">5</Radio.Button>
              <Radio.Button value="3">7</Radio.Button>
              <Radio.Button value="4">10</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button style={{ marginLeft: 16 }} onClick={() => this.props.goBack()}>返回</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FileEdit);
