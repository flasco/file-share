import React from 'react';
import { Link } from 'dva/router';
import { formatDate } from 'utils';

export function getColumns() {
  return [
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      width: '48%',
      sorter: true,
      render: (text, rowData) => <Link to={`/file/${rowData.id}`}>{text}</Link>,
    }, {
      title: '大小',
      width: '16%',
      sorter: true,
      dataIndex: 'size',
      key: 'size',
      render: text => <span>{formatSize(text)}</span>,
    }, {
      title: '修改时间',
      dataIndex: 'updateTime',
      sorter: true,
      width: '20%',
      key: 'updateTime',
      render: text => <span>{formatDate(text)}</span>,
    }, {
      title: '操作',
      width: '10%',
      key: 'edit',
      render: (text, rowData) => {
        return (
          <Link to={`/file/edit/${rowData.id}`}>编辑</Link>
        );
      },
    }
  ];
}

function formatSize(bytes) {
  let kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  }
  if (kb < 1) kb = 1;
  return `${kb.toFixed(2)} KB`;
}
