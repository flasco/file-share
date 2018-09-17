import React from 'react';

import { getUrlQuery } from 'utils';
import SearchLayout from 'components/search-layout';
import SearchItem from './components/search-item';

import styles from './index.module.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.keyword = getUrlQuery('q');
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
      description: '测试'.repeat(60),
      time: new Date().getTime(),
      link: 'fe1208'
    }];
    return (
      <SearchLayout>
        <p className={styles.timeTaking}>找到约 66,900,000 条结果（用时 0.33 秒）</p>
        <div className={styles.searchList}>
          {
            searchResult.map((item, index) => {
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
      </SearchLayout>
    );
  }
}

export default Search;
