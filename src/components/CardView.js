import React from "react";
import { colorCardsData } from "../assets/data";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styles from "../stylesheets/style.module.css";


function getStyle(style, snapshot) {
  if (!snapshot.isDragging) return {};
  if (!snapshot.isDropAnimating) {
    return style;
  }
  if (snapshot.isDragging) return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`
  };

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`
  };
}

function CardView(){

  const [colorList, setColorList] = React.useState(colorCardsData);

  const handleDragEnd = (result) => {
    if(!result.destination) return; 

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    let reorderedColorList = [...colorList]
    reorderedColorList[sourceIndex] = reorderedColorList.splice(destinationIndex, 1, reorderedColorList[sourceIndex])[0];
    setColorList(reorderedColorList)
  }

  const handleDragStart = (result) => {
    console.log(result)
    return
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="colorlist">
          {(droppableProvider) => (
            <div
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
              className={`uk-child-width-1-1@s uk-grid-match`} uk-grid={`true`}
            >
              {colorList.map((color, index) => (
                <Draggable
                  index={index}
                  key={color.id}
                  draggableId={`${color.id}`}
                >
                  {(draggableProvider, snapshot) => (
                    <>
                      <div
                        className={`uk-card uk-card-default uk-card-body ${styles[color.colorClass]}`}
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.draggableProps}
                        {...draggableProvider.dragHandleProps}
                        style={getStyle(draggableProvider.draggableProps.style, snapshot)}
                      >
                        {color.colorName}
                      </div>
                      {
                        snapshot.isDragging 
                        ? <div
                        className={`uk-card uk-card-default uk-card-body ${styles.dndCopy} ${styles[color.colorClass]}`}
                        
                      >
                        {color.colorName}
                      </div>
                        : null
                      }
                    </>
                  )}
                </Draggable>
              ))}
              {droppableProvider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>

  )

}

export default CardView;