import React from 'react';
import { Button } from 'antd';


export default ({ avatar, accountName, onClick, isPayed = false, needPoints = '默认', description }) => {
  const btnText = isPayed ? '直接下载' : `下载本资源需要 ${needPoints} 积分`;
  return (
    <div style={{ textAlign: 'center', padding: 30, width: '100%', background: '#fff', borderRadius: 6 }}>
      <img src={avatar} style={{ height: 72, width: 72, borderRadius: 36 }} alt={accountName} />
      <p style={{ marginTop: 10 }}>{accountName}</p>
      <p style={{ textAlign: 'justify', textIndent: '2em' }}>{description}</p>
      <Button style={{ marginTop: 10 }} onClick={onClick}>{btnText}</Button>
    </div>
  );
};
