import React, { Component } from 'react';

import { Pagination, Spin } from 'antd';

import SearchItem from '../search-item';

import styles from './index.module.scss';

export default class SearchList extends Component {
  render() {
    return (
      <div className={styles.searchContainer}>
        <Spin
          tip={'加载中'}
          delay={200}
          spinning={this.props.isLoading}
          wrapperClassName={styles.searchSpin}>
          <div className={styles.searchList}>
            {
              this.props.list.map((item, index) => {
                const link = `/file/${item.fileId}`;
                return (
                  <SearchItem
                    link={link}
                    key={`${index}`}
                    time={item.updateTime}
                    title={item.fileName}
                    description={item.introduce} />
                );
              })
            }
          </div>
        </Spin>
        <Pagination
          defaultCurrent={this.props.current}
          total={this.props.total}
          onChange={this.props.onPaginationChange} />
      </div>
    );
  }
}
