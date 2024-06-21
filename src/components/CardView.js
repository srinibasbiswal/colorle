import React from "react";
import { ReactSortable } from "react-sortablejs";
import { colorCardsData } from "../assets/data";
import { Card } from "react-bootstrap";

function CardView(){
    const [list, setList] = React.useState(colorCardsData);

  return (
    <div>
      <ReactSortable
        filter=".addImageButtonContainer"
        dragClass="sortableDrag"
        list={list}
        setList={setList}
        animation="200"
        easing="ease-out"
      >
        {list.map((item) => (
            <Card style={{ width: '18rem' }}  className="draggableItem">
            <Card.Body>
              <Card.Text>
              {item.colorName}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ReactSortable>
    </div>
  )
}

export default CardView;