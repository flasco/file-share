import React from 'react';
import { connect } from 'dva';

import SearchLayout from 'components/search-layout';
import { sleep } from 'utils';

import FileList from './components/file-list';

import { fileEditPreload } from '../router';

class FileManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataset: [{
        id: 'fe6472',
        name: 'ceshi.mp4',
        type: 'mp4',
        changeAt: '201231230',
        size: '45.18 MB'
      }, {
        id: 'fe6473',
        name: 'ceshi2.mp4',
        type: 'mp4',
        changeAt: '201231230',
        size: '45.18 MB'
      }],
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
    const dataset = this.state.dataset.filter(item => ids.indexOf(item.id) < 0);

    this.setState({
      dataset
    });
  }

  downloadFileByIds = (ids) => {
    // 调用接口下载
    console.log(ids);
  }

  fetchList = async (req) => {
    console.log(req);
    this.setState({
      isLoading: true
    });
    await sleep(1000);
    this.setState({
      isLoading: false,
      total: 100
      // dataset: [...this.state.dataset, ...this.state.dataset]
    });
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
