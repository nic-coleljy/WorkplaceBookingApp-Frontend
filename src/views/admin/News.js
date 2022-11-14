import React, { lazy, useState, useEffect } from 'react'
import Axios from 'axios';
import '../../assets/css/News.css';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CModalBody,
    CForm,
    CFormText,
    CFormLabel,
    CFormInput,
} from '@coreui/react'

const News = (props) => {

    const [newsRecords, setNews] = useState([])
    const [title, setTitle] = useState()
    const [date, setDate] = useState()
    const [content, setContent] = useState()
    const [newsId, setNewsId] = useState(null)
    const [visible, setVisible, validated] = useState(false)

    const yourConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authorization")
        }
    }
    useEffect(() => {
        const getNews = async () => {
            const tasksFromServer = await fetchNews()
            setNews(tasksFromServer)
        }
        getNews()
    }, [])
    var res;

    // Fetch Tasks
    const fetchNews = async () => {

        res = await fetch('http://localhost:8080/api/news/emp/', yourConfig)
        console.log(res)
        const data = await res.json()
        console.log(data)
        return data
    }

    const url2 = "http://localhost:8080/api/news/hr"


    function submit(e) {
        e.preventDefault();
        Axios.post(url2, {
            date: date,
            title: title,
            content: content,
        }, yourConfig)
            .then(res => {
                window.location.reload(false);
            })
            .catch((res) => {
                alert(res.response.data.message)
            })
    }

    function deleteNews(nid) {
        Axios.delete(`http://localhost:8080/api/news/hr/${nid}`, yourConfig)
            .then(res => {
                window.location.reload(false);
            })
            .catch((res) => {
                alert(res.response.data.message)
            })
    }

    function selectNews(indexNumber) {
        let newsRecord = newsRecords[indexNumber];
        setDate(newsRecord.date)
        setTitle(newsRecord.title)
        setContent(newsRecord.content)
        setNewsId(newsRecord.nid)
    }

    const url3 = "http://localhost:8080/api/news/hr/";
    function updateNews() {
        console.log(date);
        console.log(title);
        console.log(content);
        Axios.put(url3 + newsId, {
            date: date,
            title: title,
            content: content,
        }, yourConfig)
            .then(res => {
                window.location.reload(false);
            })
            .catch((res) => {
                alert(res.response.data.message)
            })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>News Records</strong>
                        <CButton onClick={() => setVisible(!visible)} style={{ float: "right" }} color="light">
                            Add News
                        </CButton>
                        <CModal className="modal-news" visible={visible}>
                            <CModalHeader>
                                <CModalTitle>News Description</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm noValidate validated={validated} onSubmit={(e) => submit(e)}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleDate">date</CFormLabel>
                                        <CFormInput type="date" id="exampleDate" onChange={event => setDate(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleTitle">Title</CFormLabel>
                                        <CFormInput type="title" id="exampleTitle" onChange={event => setTitle(event.target.value)} />
                                        <CFormText id="titleHelp">Title should not be null.</CFormText>
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleContent">Content</CFormLabel>
                                        <CFormInput type="content" id="exampleContent" onChange={event => setContent(event.target.value)} />
                                    </div>
                                    <CButton onClick={() => setVisible(false)} type="submit" color="primary">
                                        Submit
                                    </CButton>
                                    <CButton color="secondary" onClick={() => setVisible(false)}>
                                        Close
                                    </CButton>
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                            </CModalFooter>
                        </CModal>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">News ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Content</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {newsRecords.map((newsRecord, i) => (
                                    <CTableRow key={i}>
                                        <CTableHeaderCell scope="row">{newsRecord.nid}</CTableHeaderCell>
                                        <CTableDataCell>{newsRecord.date}</CTableDataCell>
                                        <CTableDataCell>{newsRecord.title}</CTableDataCell>
                                        <CTableDataCell>{newsRecord.content}</CTableDataCell>
                                        <CTableDataCell>
                                            <CCol xs={6}>
                                                <button className="btn btn-sm btn-danger btn-block"
                                                    onClick={() => deleteNews(newsRecord.nid)}>
                                                    Delete News
                                                </button>
                                            </CCol>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CCol xs={6}>
                                                <button className="btn btn-sm btn-primary btn-block"
                                                    onClick={() => selectNews(i)}>
                                                    Edit News
                                                </button>
                                            </CCol>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                        <div>
                            <CFormInput type="text" value={date} onChange={(e) => { setDate(e.target.value) }} /> <br /><br />
                            <CFormInput type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /> <br /><br />
                            <CFormInput type="text" value={content} onChange={(e) => { setContent(e.target.value) }} /> <br /><br />
                            <button onClick={updateNews} >Update News</button>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default News
