import React from 'react';
import { connect } from 'dva';

import { getUrlQuery } from 'utils';
import SearchLayout from 'components/search-layout';
import SearchList from './components/search-list';

import { searchResultPreload } from '../router';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.keyword = getUrlQuery('q');

    // 预加载
    searchResultPreload.preload();
  }

  onSearch = (keyword) => {
    console.log(keyword);
    this.props.dispatch({
      type: 'router/jmp',
      payload: {
        path: `/search?q=${keyword}`
      }
    });
  }

  render() {
    // title 经测试 google的省略号是通过后台传递数据裁剪的，
    // 而不是css生成的样式
    const searchResult = [{
      title: '这是一个测试的数据',
      description: '测试'.repeat(6),
      time: new Date().getTime(),
      link: 'fe1204'
    },
    {
      title: '这是一个测试的数据',
      description: '测试'.repeat(20),
      time: new Date().getTime(),
      link: 'fe1208'
    }];
    return (
      <SearchLayout
        onSearch={this.onSearch}
        keyword={this.keyword}>
        <SearchList
          list={searchResult} />
      </SearchLayout>
    );
  }
}

function select() { return {}; }

export default connect(select)(Search);
