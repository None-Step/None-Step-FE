import React, { useEffect, useState } from 'react'
import { getMyPage } from '../apis/mypage'

const MyPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //mypage 정보를 불러오기
    //mypage api의 응답을 가져와서 data에 저장
    getMyPage().then((res) => {
      setData(res);
      // 데이터 불러오면 로딩 중단
      setLoading(false);
    });
  }, []);

  // 로딩중
  if (loading) return <div>로딩중 ...</div>;

  return (
    <div>MyPage
      <div>{data?.memberNickName}</div>
      <div>{data?.memberID}</div>
    </div>
  )
}

export default MyPage