import React from 'react';
import { Link } from 'dva/router';

import { getSearchDate } from 'utils';

import styles from './index.module.scss';

class SearchItem extends React.Component {
  render() {
    const {
      link,
      title,
      description,
      time
    } = this.props;
    return (
      <div
        className={styles.searchList_item}>
        <h3 className={styles.title}>
          <Link to={link}>{title}</Link>
        </h3>
        <p className={styles.desc}>
          <span className={styles.desc_time}>{`${getSearchDate(time)} - `}</span>
          {description}
        </p>
        <cite>{link}</cite>
      </div>
    );
  }
}

export default SearchItem;
