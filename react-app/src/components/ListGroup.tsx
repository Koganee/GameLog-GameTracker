import { Fragment } from "react";
import { useState } from "react";

//cd react-app
//npm run dev
interface Props
{
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}

function ListGroup({items, heading, onSelectItem}: Props) {
    
    const [selectedIndex, setSelectedIndex] = useState(-1);
    //const handleClick = (event: MouseEvent) => console.log(event)

    return (
        <Fragment>
            <h1>{heading}</h1>
            { items.length === 0 && <p>No item found</p>}
            <ul className="list-group">
            {items.map((item, index) => 
                <li 
                className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
                key = {item} 
                onClick = {() => { 
                    setSelectedIndex(index);
                    onSelectItem(item);
                }}
                >
                    
                {item}</li>)
            }
            </ul>
        </Fragment>
    );
}

export default ListGroup;