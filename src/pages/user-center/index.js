import React from 'react';

import SearchLayout from 'components/search-layout';

class UserCenter extends React.Component {
  render() {
    return (
      <SearchLayout showSearch={false}>
        <div>hello</div>
      </SearchLayout>
    );
  }
}

export default UserCenter;
