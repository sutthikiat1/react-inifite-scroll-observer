import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LoadingText = styled.div`
  margin : 0 auto;
  text-align : center;
  font-size : 25px;
  font-weight : bold;
`

function Loadmore(props) {
    const {display , setDisplay , data } = props;
    const [observedEl, setObservedEl] = useState(null);

    const loadMore = () => { //3.Set LoadingMore || ทำการ slice data เพิ่มเข้าไปใน display
        setTimeout(() => { // หน่วงเวลา
            setDisplay([...display, ...data.slice(display.length, data.length > display.length + 10 ? display.length + 10 : data.length)]) //เช็ค ถ้า Data มากกว่าข้อมูลที่แสดง ให้เพิ่ม Data + 10 ใน display แต่ถ้าไม่ใช่ ให้เอา data ทั้งหมดมา
        }, 500)
    }

    const observer = new IntersectionObserver((items) => { //2.Check Observer Targer || ถ้าหน้าจอ focus element ที่ต้องการแล้วให้ Load data
        if (items[0].isIntersecting) {
            loadMore();
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
            {data.length > display.length &&
                <LoadingText>
                    <p ref={setObservedEl}>Loading more...</p> 
                </LoadingText>
            }
        </div>
    )
}

export default Loadmore
