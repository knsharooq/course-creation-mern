import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Input, Label, Row } from "reactstrap"
import { createPost, updatePost } from "../../actions/posts"
import './Form.css';

export const AddOrEditForm = ( {editId, setEditId = () => {} } ) => {
    const [formData, setFormData] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const dispatch = useDispatch();
    const post = useSelector((state)=> editId ? state.posts.find(item=>item._id===editId) : null);

    useEffect(()=>{
        if(post) setFormData(post);
    },[post])

    useEffect(()=>{
        if(isAdded){
            setTimeout(()=>{
                setIsAdded(false);
            },2000)
        } 
    },[isAdded])

    useEffect(()=>{
        if(isUpdated){
            setTimeout(()=>{
                setIsUpdated(false);
            },2000)
        } 
    },[isUpdated])

    const clearFields = () => {
        setEditId(0);
        setFormData({})
    }
    
    const onSubmitPost = () => {
        setIsEmpty(false)
        if(!formData?.title || !formData?.message || !formData?.creator ){
            setIsEmpty(true);
            return
        }
        if(editId) {
            dispatch(updatePost(editId,formData)) 
            setIsUpdated(true)
        } else {
            dispatch(createPost(formData))
            setIsAdded(true)
        }
        clearFields();
    }

    return (
        <Row className="d-flex justify-content-center form bg-white py-3">
            <Col sm={12} className="text-center"><h3>Add or Edit Memory</h3></Col>
            <Col sm={12} className="mt-3">
                <Label>Title:</Label>
                <Input className="mt-1" placeholder="Enter Title" value={formData?.title || ""} onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
            </Col>
            <Col sm={12} className="mt-3">
                <Label>Message:</Label>
                <Input type="textarea" className="mt-1" placeholder="Enter Message" value={formData?.message || ""} onChange={(e)=>setFormData({...formData,message:e.target.value})} />
            </Col>
            <Col sm={12} className="mt-3">
                <Label>Author:</Label>
                <Input className="mt-1" placeholder="Enter Your Name" value={formData?.creator || ""} onChange={(e)=>setFormData({...formData,creator:e.target.value})} />
            </Col>
            <Col sm={12} className="mt-4 text-center">
                <Button color="primary" className="button" onClick={onSubmitPost}>Submit</Button>
            </Col>
            {isEmpty &&
                <Col sm={12} className="mt-3 text-center">
                    <p className="text-danger">Please fill all the fields!</p>
                </Col>
            }
            {isAdded &&
                <Col sm={12} className="mt-3 text-center">
                    <p className="text-success">Memory Added!</p>
                </Col>
            }
            {isUpdated &&
                <Col sm={12} className="mt-3 text-center">
                    <p className="text-success">Memory Updated!</p>
                </Col>
            }
        </Row>
    )
 }