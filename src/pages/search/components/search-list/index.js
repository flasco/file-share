import React, { Component } from 'react';

import { Pagination, Spin } from 'antd';

import { sleep } from 'utils';

import SearchItem from '../search-item';

import styles from './index.module.scss';

export default class SearchList extends Component {
  state = {
    current: 1,
    total: 40,
    isLoading: false,
  }

  onPaginationChange = async (pageNumber, pageSize) => {
    this.setState({
      isLoading: true
    });
    await sleep(1000);
    this.setState({
      isLoading: false,
    });
    console.log(pageNumber);
    console.log(pageSize);
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <Spin
          tip={'加载中'}
          delay={200}
          spinning={this.state.isLoading}
          wrapperClassName={styles.searchSpin}>
          <div className={styles.searchList}>
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
          </div>
        </Spin>
        <Pagination
          defaultCurrent={this.state.current}
          total={this.state.total}
          onChange={this.onPaginationChange} />
      </div>
    );
  }
}
