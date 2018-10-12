import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import SearchLayout from 'components/search-layout';

import { getOwnFileList, downloadFilesByIds, deleteFileByIds } from '../../api/file';

import { INIT_SEARCH_OPTION } from './components/file-list/constants';

import FileList from './components/file-list';

import { fileEditPreload } from '../router';

class FileManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataset: [],
      total: 11,
    };

    // 编辑页面 preload
    fileEditPreload.preload();
  }

  createFile = () => {
    this.props.dispatch({
      type: 'router/jmp',
      payload: {
        path: '/file/create'
      }
    });
  }

  deleteFileByIds = (ids) => {
    deleteFileByIds(ids).then(({ code }) => {
      if (code !== 'A0000') {
        message.error('删除失败');
      } else {
        message.success('删除成功');
        this.fetchList(INIT_SEARCH_OPTION);
      }
    });
  }

  downloadFileByIds = (ids) => {
    // 调用接口下载
    downloadFilesByIds(ids);
  }

  fetchList = (req) => {
    this.setState({
      isLoading: true
    });
    getOwnFileList(req).then(({ data }) => {
      if (data == null) {
        message.error('没有登录');
        this.props.dispatch({
          type: 'router/jmp',
          payload: '/'
        });
      } else {
        this.setState({
          isLoading: false,
          total: data.total,
          dataset: data.list
        });
      }
    });
  }

  componentDidMount() {
    this.fetchList(INIT_SEARCH_OPTION);
  }

  render() {
    return (
      <SearchLayout
        withWhiteBoard
        showSearch={false}>
        <FileList
          fetchList={this.fetchList}
          total={this.state.total}
          isLoading={this.state.isLoading}
          createFile={this.createFile}
          downloadFileByIds={this.downloadFileByIds}
          deleteFileByIds={this.deleteFileByIds}
          dataset={this.state.dataset} />
      </SearchLayout>
    );
  }
}

function select() { return {}; }

export default connect(select)(FileManage);
