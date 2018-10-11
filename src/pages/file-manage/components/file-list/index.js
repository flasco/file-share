import React from 'react';
import { Table, Button, Input } from 'antd';
import PropTypes from 'prop-types';

import { getColumns } from './util';
import { INIT_SEARCH_OPTION, ATTR_MAP } from './constants';

import styles from './index.module.scss';

class FileList extends React.Component {
  static propTypes = {
    total: PropTypes.number,
    dataset: PropTypes.array,
    isLoading: PropTypes.bool,
    downloadFileByIds: PropTypes.func,
    deleteFileByIds: PropTypes.func,
    fetchList: PropTypes.func
  }

  static defaultProps = {
    total: 10,
    dataset: [],
    downloadFileByIds: () => { },
    deleteFileByIds: () => { },
    fetchList: () => { },
  }

  state = {
    isSelected: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: this.props.total
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.total !== nextProps.total ||
      this.props.dataset !== nextProps.dataset ||
      this.props.isLoading !== nextProps.isLoading ||
      this.state !== nextState
    );
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.total !== state.pagination.total) {
      return {
        pagination: Object.assign({}, state.pagination, {
          total: nextProps.total
        })
      };
    }
    return null;
  }

  renderOperationLine = (deleteFileByIds, downloadFileByIds, createFile) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ height: '33px' }}>
          <Button.Group>
            <Button type="primary" onClick={() => createFile()}>上传</Button>
          </Button.Group>
          <Button.Group className={this.state.isSelected ? styles.operationContainer : styles.operationContainerHide}>
            <Button onClick={() => downloadFileByIds(this.selectedRowKeys)}>下载</Button>
            <Button onClick={() => deleteFileByIds(this.selectedRowKeys)}>删除</Button>
          </Button.Group>
        </div>
        <Input.Search
          placeholder="在此键入想搜索的文件"
          onSearch={this.onSearch}
          style={{ width: 200 }}
        />
      </div>
    );
  }

  onSearch = (keyword) => {
    this.keyword = keyword;
    this.fetchData(true);
  }

  handleTableChange = async (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
      current: pagination.current,
    };

    this.setState({
      pagination: pager,
    });

    if (sorter.order) {
      this.attr = ATTR_MAP[sorter.columnKey];
      this.order = sorter.order === 'ascend' ? 1 : 0;
    }
    this.fetchData(false, pagination.current);
  }

  fetchData = async (needClear = false, current = 1) => {
    const req = needClear ?
      Object.assign({}, INIT_SEARCH_OPTION, {
        keyword: this.keyword
      }) : {
        keyword: this.keyword || '',
        page: current,
        pageSize: 10,
        attr: this.attr,
        order: this.order,
      };

    this.props.fetchList(req);
  }

  rowSelection = {
    onChange: (selectedRowKeys) => {
      this.setState({ isSelected: selectedRowKeys.length > 0 });
      this.selectedRowKeys = selectedRowKeys;
      // console.log(`selectedRowKeys: ${selectedRowKeys}`);
      // console.log('selectedRows: ', selectedRows);
    }
  };

  render() {
    const { dataset, deleteFileByIds, isLoading, downloadFileByIds, createFile } = this.props;
    return (
      <React.Fragment>
        {this.renderOperationLine(deleteFileByIds, downloadFileByIds, createFile)}
        <Table
          onChange={this.handleTableChange}
          loading={isLoading}
          rowSelection={this.rowSelection}
          pagination={this.state.pagination}
          dataSource={dataset}
          columns={getColumns()}
          rowKey="fileId" />
      </React.Fragment>
    );
  }
}

export default FileList;
