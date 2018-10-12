import React from 'react';
import { Spin } from 'antd';

import './index.scss';

export default () => {
  return (
    <Spin
      spinning
      size={'large'}
      className={'spin-ccc'} />
  );
};
