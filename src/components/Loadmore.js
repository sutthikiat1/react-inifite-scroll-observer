import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LoadingText = styled.div`
  margin : 0 auto;
  margin-top : 20px;
  text-align : center;
  font-size : 20px;
  font-weight : bold;

  color : white !important;
`

function Loadmore(props) {
    const { loadData } = props;
    const [observedEl, setObservedEl] = useState(null);
    const [displayPost, setDisplayPost] = useState([]);

    const loadMore = () => { //3.Set LoadingMore || ทำการ slice data เพิ่มเข้าไปใน display
        setTimeout(() => { // หน่วงเวลา
            loadData();
        }, 500)
    }

    const observer = new IntersectionObserver((items) => { //2.Check Observer Targer || ถ้าหน้าจอ focus element ที่ต้องการแล้วให้ Load data
        if (items[0].isIntersecting) {
            loadMore()
        }
    }, { threshold: 1 })


    useEffect(() => {
        if (observedEl) observer.observe(observedEl); //1.ถ้ามี element ให้ทำการติดตาม หรือ observe element นั้น ๆ

        return () => {
            if (observedEl) observer.unobserve(observedEl)
        }
    }, [observedEl, observer])


    return (
        <div>
            <LoadingText>
                <p ref={setObservedEl}>Loading more...</p>
            </LoadingText>
        </div>
    )
}

export default Loadmore
