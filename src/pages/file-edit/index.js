import React from 'react';
import { Spin, message } from 'antd';
import { connect } from 'dva';

import SearchLayout from 'components/search-layout';
// import { sleep } from 'utils';
import { uploadFile, getFileInfo, editFile } from '../../api/file';

import FileEditField from './field';

class FileManage extends React.Component {
  constructor(props) {
    super(props);

    this.feId = props.match.params.id;

    this.state = {
      data: null,
      uploading: false,
    };
  }

  onSubmit = async (values) => {
    if (this.feId) {
      // edit
      const { code } = await editFile(this.feId, {
        fileName: values.fileName,
        introduce: values.introduce,
        point: values.point
      });
      if (code !== 'A0000') {
        message.error('更新失败');
      } else {
        message.success('更新成功');
        this.props.dispatch({
          type: 'router/jmp',
          payload: {
            path: '/user/file'
          }
        });
      }
    } else {
      // create
      this.setState({ uploading: true });
      let formData = new FormData();
      formData.append('file', values.file.originFileObj);
      formData.append('fileName', values.fileName);
      formData.append('introduce', values.introduce);
      formData.append('point', values.point);
      const { code } = await uploadFile(formData);
      this.setState({ uploading: false });
      if (code === 'A0000') {
        message.success('上传成功');
        this.props.dispatch({
          type: 'user/appInit'
        });
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
      getFileInfo(feId).then(({ data }) => {
        this.setState({
          data: {
            fileName: data.fileName,
            description: data.introduce,
            points: `${data.point}`
          }
        });
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
    const { data, uploading } = this.state;
    return (
      <SearchLayout
        withWhiteBoard
        showSearch={false}>
        <Spin spinning={(this.feId != null && data == null) || uploading}>
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
