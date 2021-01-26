import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import './room.css'
import {Col, Row} from 'reactstrap'

function Filters() {
    const state = useContext(GlobalState)
    const [sort, setSort] = state.roomsAPI.sort
    const [search, setSearch] = state.roomsAPI.search
    const [isVacancy, setIsVacancy] = state.roomsAPI.isVacancy

    const hanleIsVacancy = e => {
        setIsVacancy(e.target.value)
        setSearch('')
    }

    return (
        <Row className="filter_menu">
            <Col xs='9'>
                <Row>
                    <div className="row">
                        <div>LỌC: </div>
                        <select name="isVacancy" value={isVacancy} onChange={hanleIsVacancy} >
                            <option value=''>TẤT CẢ</option>
                            <option value={`isVacancy=${true}`}>TRỐNG</option>
                            <option value={`isVacancy=${false}`}>KHÔNG</option>
                        </select>
                    </div>
                    <input type="text" value={search} placeholder="Enter your search!"
                    onChange={e => setSearch(e.target.value.toLowerCase())} />
                </Row>
            </Col>
            <Col xs='3' className='row_sort'>
                <div>CHỌN </div>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>MỚI</option>
                    <option value='sort=oldest'>CŨ</option>
                    <option value='sort=-price'>GIÁ: CAO-THẤP</option>
                    <option value='sort=price'>GIÁ: THẤP-CAO</option>
                </select>
            </Col>
        </Row>
    )
}

export default Filters