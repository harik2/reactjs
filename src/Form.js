import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Form = () => {
    const http = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com'
    });
    const [isUpdate,setIsUpdate]=useState(false);
    const [post, setPost] = useState({
        "userId": 1,
        "id": 1,
        "title": "titre",
        "body": "corps"
    });
    const [posts, setPosts] = useState([post]);
    useEffect(() => {
        console.log(posts)
        return () => {
            // cleanup
        };
    }, [posts]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    }
    const handleAdd = (e) => {

       
     if(!isUpdate) { const max = Date.now();
        let p = { ...post, id: max }
        setPosts([...posts, p]);
    }
    else {
            let p = { ...post }
            let copie =[...posts]
            let index=posts.findIndex((e)=>e.id===p.id)
            copie[index]=p;
            setPosts(copie);
            setIsUpdate(false)
        }
    }
    const handleDelete = (p) => {
        setPosts(posts.filter(x => x.id != p.id));
        console.log('id', p)
    }
    const handleEdit = (p) => {
        setPost(p)
        setIsUpdate(true)
        console.log('id', p)
    }
  

    return (
        <div>

            <div className="container col-md-4">
                {post.id}
                Libellé : <input type="text" name="title" className="form-control" value={post.title} onChange={handleChange} />
                Body : <textarea type="text" name="body" className="form-control" value={post.body} onChange={handleChange}  ></textarea>
                <button className="btn btn-sm btn-primary" onClick={handleAdd}>{isUpdate? 'Modifier':'Ajouter'}</button>
            </div>
            <hr></hr>
            <div className="container">
                <table className="table table-tripped">
                    <tr>
                        <td>id</td>
                        <td>Titre</td>
                        <td>Body</td>
                        <td>
                            actions
                        </td>

                    </tr>
                    {posts.map(p => <tr><td>{p.id}</td><td>{p.title}</td><td>{p.body}</td>
                        <td>
                            <button onClick={() => handleDelete(p)}>S</button>
                            <button onClick={() => handleEdit(p)}>E</button>

                        </td> </tr>)}
                </table>
            </div>
        </div>
    );
};

export default Form;