import React,{useState, useEffect, useContext} from 'react'
import {FaPlusSquare} from "@react-icons/all-files/fa/FaPlusSquare";
import {FaMinusSquare} from "@react-icons/all-files/fa/FaMinusSquare";
import {getFirestore,  collection, query, getDocs } from "firebase/firestore";
import {TreeContext} from "./TreeContext";
const getData = async(path)=>{
    const db = getFirestore();
    const q = query(collection(db, path));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()})
    })
    return data
}

export const Node = ({id, path, name, root}) => {
    const [nodes, setNodes] = useState([]);
    const [expand, setExpand] = useState(false);
    const {selected, setSelected} = useContext(TreeContext);
    const clickHandler = ()=>{
        setSelected(`${path}/subcategory`)
    }
    useEffect(()=>{
        (async()=>{
            try {
                const col = root? `${root}` : `${path}/subcategory`;
                const data = await getData(col);
                if (data) {
                    setNodes(data)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [id, path, root])

    if (root) {
        return <div>
            <div>
                {nodes.length? 
                    <span    
                        className='mx-4'                   
                        onClick={()=>setExpand(prev=>!prev)} >
                        {expand?
                            <FaMinusSquare className={`inline`}/>:
                            <FaPlusSquare className={`inline`} />
                        }
                    </span>: 
                    <span className='p-2 mx-4 inline-block'></span>
                }
                <span 
                    onClick={()=>setSelected(root)} 
                    className={`${selected === `${root}` && "font-semibold text-white bg-sky-500"}`}
                >{root}</span>
            </div>
            {(expand && 
                <div className='p-2 border-l'>
                    {nodes.map(node=>{
                            return <Node 
                                id={node.id} 
                                name={node.name}
                                path={`/${root}/${node.id}`}
                            />
                        }
                    )}
                </div>
            )}
        </div>
    }
    
    return (
        <div>
            <div>
                {nodes.length? 
                    <span 
                        className='mx-4'                      
                        onClick={()=>setExpand(prev=>!prev)} >
                        {expand?
                            <FaMinusSquare className={`inline`}/>:
                            <FaPlusSquare className={`inline`} />
                        }
                    </span>: 
                    <span className='mx-4 p-2 inline-block'></span>
                }   
                <span onClick={()=>clickHandler(path)} 
                    className={`${selected === `${path}/subcategory` && "font-semibold text-white bg-sky-500"}`}
                >{name}</span>
            </div>
            {(expand && 
                <div className='p-2 border-l'>
                    {nodes.map(node=>{
                        return <Node 
                            id={node.id} 
                            name={node.name}
                            path={`${path}/subcategory/${node.id}`}/>
                    }
                    )}
                </div> 
            )}
        </div>
    )
}
