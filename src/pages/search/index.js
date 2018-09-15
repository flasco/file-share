import React from 'react';

import SearchLayout from 'components/search-layout';
import { getUrlQuery } from 'utils';

class Search extends React.Component {
  constructor(props) {
    super(props);
    const keyword = getUrlQuery('q');
    console.log(keyword);
  }

  render() {
    return (
      <SearchLayout>
        <div></div>
      </SearchLayout>
    );
  }
}

export default Search;
