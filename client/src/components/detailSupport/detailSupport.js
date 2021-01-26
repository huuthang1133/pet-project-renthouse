import React, {useContext } from 'react'
import {GlobalState} from '../../GlobalState'
import {Table, Container} from 'reactstrap'
import SupportList from './SupportList'


export default function DetailSupport() {
    const state = useContext(GlobalState)
    const [supports] = state.supports
    const [isAdmin] = state.userAPI.isAdmin

    if(!supports.length) return <h2>BẠN CHƯA TẠO YÊU CẦU HỖ TRỢ</h2>
    return (
        <Container>
            <h2>DANH SÁCH CÁC YÊU CẦU CẦN ĐƯỢC HỖ TRỢ</h2>
            <Table bordered>
                <tr>
                    <th>PHÒNG TRỌ</th>
                    <th>NGƯỜI THUÊ</th>
                    <th>YÊU CẦU</th>
                    <th>TRẠNG THÁI</th>
                    {isAdmin ? <th>XỬ LÝ</th>: ""}
                </tr>
                <tbody>
                    {supports.map(support => <SupportList support={support} key={support._id}/>)}
                </tbody>
            </Table>
        </Container>
    )
}