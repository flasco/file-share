import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import SearchLayout from 'components/search-layout';
import LoadingPage from 'components/loading-page';

import { getFileInfo, getFilePreview, getFileUserInfo, downloadFilesByIds } from '../../api/file';

import RightBoard from './components/right-board';
import LeftBoard from './components/left-board';

import './index.scss';

class SearchResult extends Component {
  feId = this.props.match.params.id;
  state = {
    title: '',
    contentArr: [],
    isInit: false,
    introduce: '',
    isPayed: false,
    ownerName: '',
    point: 0,
  }
  onDwnClick = () => {
    if (this.props.point > this.state.point) {
      message.success('测试！');
      downloadFilesByIds([this.feId]);
    } else {
      message.error('积分不足，无法下载！');
    }
  }

  getContent = (datas = '') => {
    if (Array.isArray(datas)) {
      return (
        <React.Fragment>
          {
            datas.map((item, index) => {
              return (
                <img
                  key={`${index}`}
                  className={'preview-img'}
                  src={`data:image/png;base64,${item}`}
                  alt={'预览图'} />
              );
            })
          }
          {datas.length === 3 && <p>仅展示前3页，更多内容请下载本文件</p>}
        </React.Fragment>
      );
    }
    return <p style={{ marginTop: '70px' }}>不支持的预览文件格式</p>;
  }

  getFileDetail = () => {
    if (this.feId == null) {
      message.error('找不到对应的文件');
    }
    Promise.all([getFileInfo(this.feId), getFileUserInfo(this.feId)]).then((result) => {
      const data1 = result[0].data;
      const data2 = result[1].data;
      this.setState({
        title: data1.fileName,
        introduce: data1.introduce,
        isPayed: data2.isPayed === 1,
        ownerName: data2.owner.userName,
        point: data1.point,
        isInit: data1.previewUri == null
      });

      if (data1.previewUri != null) {
        getFilePreview(this.feId).then(({ data }) => {
          this.setState({
            contentArr: data,
            isInit: true
          });
        });
      }
    });
  }

  componentDidMount() {
    this.getFileDetail();
  }

  render() {
    const { avatar } = this.props;
    const {
      title,
      introduce,
      isPayed,
      contentArr,
      isInit,
      ownerName,
      point,
    } = this.state;
    if (!isInit) return <LoadingPage />;
    const content = this.getContent(contentArr);
    return (
      <SearchLayout
        showSearch={false}>
        <div style={{ display: 'flex', maxWidth: 1000, margin: '0 auto', marginTop: 30 }}>
          <div style={{ flex: 5, background: '#fff', borderRadius: 6, minHeight: 560 }}>
            <LeftBoard
              title={title}
              isInit={isInit}
              content={content} />
          </div>
          <div style={{ flex: 2, marginLeft: 14 }}>
            <RightBoard
              avatar={avatar}
              accountName={ownerName}
              onClick={this.onDwnClick}
              isPayed={isPayed}
              description={introduce}
              needPoints={point} />
          </div>
        </div>
      </SearchLayout>
    );
  }
}

function select(state) {
  return {
    avatar: state.user.avatar,
    accountName: state.user.accountName,
    point: state.user.points,
  };
}

export default connect(select)(SearchResult);
