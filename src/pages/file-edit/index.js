import React from 'react';
import { Spin, message } from 'antd';
import { connect } from 'dva';

import SearchLayout from 'components/search-layout';
// import { sleep } from 'utils';
import { uploadFile } from '../../api/file';

import FileEditField from './field';

class FileManage extends React.Component {
  constructor(props) {
    super(props);

    this.feId = props.match.params.id;

    this.state = {
      data: null
    };
  }

  onSubmit = async (values) => {
    if (this.feId) {
      // edit
    } else {
      // create
      let formData = new FormData();
      formData.append('file', values.file.originFileObj);
      formData.append('fileName', values.fileName);
      formData.append('introduce', values.introduce);
      formData.append('point', values.point);
      const { code } = await uploadFile(formData);
      if (code === 'A0000') {
        message.success('上传成功');
        this.props.dispatch({
          type: 'router/goBack'
        });
      } else {
        message.error('上传失败');
      }
    }
  }

  onFetch = (feId) => {
    if (feId != null) {
      this.setState({
        data: {
          fileName: `${feId}`,
          description: '测试简介',
          points: '4'
        }
      });
    }
  }

  goBack = () => {
    this.props.dispatch({
      type: 'router/goBack',
    });
  }

  componentDidMount() {
    this.onFetch(this.feId);
  }

  render() {
    return (
      <SearchLayout
        withWhiteBoard
        showSearch={false}>
        <Spin spinning={this.feId != null && this.state.data == null}>
          <FileEditField
            onSubmit={this.onSubmit}
            goBack={this.goBack}
            data={this.state.data} />
        </Spin>
      </SearchLayout>
    );
  }
}

function select() {
  return {};
}

export default connect(select)(FileManage);
