import React from 'react';
import { formatDate } from 'utils';

export function getColumns() {
  return [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      width: '48%',
      sorter: true,
      render: (text, rowData) => <a href={`/file/${rowData.id}`}>{text}</a>,
    }, {
      title: '大小',
      width: '16%',
      sorter: true,
      dataIndex: 'size',
      key: 'size',
    }, {
      title: '修改时间',
      dataIndex: 'changeAt',
      sorter: true,
      width: '20%',
      key: 'changeAt',
      render: text => <span>{formatDate(text)}</span>,
    }, {
      title: '操作',
      width: '10%',
      key: 'edit',
      render: (text, rowData) => {
        return (
          <a href={`/file/edit/${rowData.id}`}>编辑</a>
        );
      },
    }
  ];
}
