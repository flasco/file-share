import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import { getUrlQuery } from 'utils';
import SearchLayout from 'components/search-layout';
import SearchList from './components/search-list';

import { searchFile } from '../../api/file';

import { searchResultPreload } from '../router';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.keyword = getUrlQuery('q');
    this.state = {
      searchResult: [],
      isLoading: false,
      total: 1,
      current: 1,
    };
    // 预加载
    searchResultPreload.preload();
  }

  onSearch = (keyword, page = 1, pageSize = 10) => {
    console.log(keyword);
    searchFile(keyword, page, pageSize).then(({ data }) => {
      if (data == null) {
        message.error('获取信息失败');
      } else {
        this.setState({
          current: page,
          total: data.total,
          dataset: data.list
        });
      }
    }).catch((e) => {
      message.error(e);
    });
  }

  onPaginationChange = (pageNumber, pageSize = 10) => {
    this.onSearch(this.keyword, pageNumber, pageSize);
  }

  render() {
    const { searchResult, total, current, isLoading } = this.state;
    return (
      <SearchLayout
        onSearch={this.onSearch}
        keyword={this.keyword}>
        <SearchList
          total={total}
          current={current}
          list={searchResult}
          isLoading={isLoading}
          onSearch={this.onSearch}
          onPaginationChange={this.onPaginationChange} />
      </SearchLayout>
    );
  }
}

function select() { return {}; }

export default connect(select)(Search);
