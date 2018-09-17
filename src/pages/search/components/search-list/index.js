import React, { Component } from 'react';

import { Pagination } from 'antd';

import SearchItem from '../search-item';

export default class SearchList extends Component {
  state = {
    current: 1,
    total: 40
  }

  onPaginationChange = () => {
  }

  render() {
    return (
      <div>
        {
          this.props.list.map((item, index) => {
            const link = `/search/${item.link}`;
            return (
              <SearchItem
                link={link}
                key={`${index}`}
                time={item.time}
                title={item.title}
                description={item.description} />
            );
          })
        }
        <Pagination
          defaultCurrent={6}
          total={500}
          onChange={this.onPaginationChange} />
      </div>
    );
  }
}
