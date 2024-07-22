import React, { useEffect, useState } from "react";
import { colorCardsData } from "../assets/data";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styles from "../stylesheets/style.module.css";
import UIkit from "uikit";


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

const CardView = ({initialData, finalData}) => {

  const [colorList, setColorList] = useState(initialData)
  const [isMatch, setIsMatch] = useState(false)
  const [matchingCards, setMatchingCards] = useState(0)


  useEffect(()=>{
    if (isMatch){
      console.log(isMatch)
      UIkit.modal('#modal-example').show();
    }
  },[isMatch])

  const handleDragEnd = (result) => {
    if(!result.destination) return; 

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    let reorderedColorList = [...colorList]
    reorderedColorList[sourceIndex] = reorderedColorList.splice(destinationIndex, 1, reorderedColorList[sourceIndex])[0];
    setColorList(reorderedColorList)
    compareResult(reorderedColorList)
  }

  const handleDragStart = (result) => {
    console.log(result)
    return
  }

  function compareResult(reorderedColorList){
    console.log(finalData)
    let matchedCards = 0
    for (var i = 0; i < reorderedColorList.length; i++){
      if (reorderedColorList[i].colorName == finalData[i].colorName){
        matchedCards++
      }
    }
    if (matchedCards == 4){
      setIsMatch(true)
    }else{
      setIsMatch(false)
    }
    setMatchingCards(matchedCards)
      
  }

  return (
    <div className={`uk-container`}>
      <div id="modal-example" data-uk-modal>
        <div className={`uk-modal-dialog uk-modal-body`}>
            <h2 className={`uk-modal-title`}>Headline</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className={`uk-text-right`}>
                <button className={`uk-button uk-button-default uk-modal-close`} type="button" data-uk-close>Cancel</button>
            </p>
        </div>
      </div>
      <div className={`uk-margin uk-align-center`}>
        {/* Cards components */}
        <div className={`uk-align-center`}>
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
                        <div>
                          <div
                            className={`uk-card uk-card-default uk-card-body uk-box-shadow-large uk-border-rounded uk-text-center ${styles[color.colorClass]}`}
                            ref={draggableProvider.innerRef}
                            {...draggableProvider.draggableProps}
                            {...draggableProvider.dragHandleProps}
                            style={getStyle(draggableProvider.draggableProps.style, snapshot)}
                          >
                            <p className={`uk-align-center uk-text-bolder ${styles.textWhite}`}>{color.colorName}</p>
                          </div>
                          {
                            snapshot.isDragging 
                            ? <div
                            className={`uk-card uk-card-default uk-card-body uk-text-center ${styles.dndCopy} ${styles[color.colorClass]}`}
                            
                          >
                            <p className={`uk-align-center uk-text-bolder ${styles.textWhite}`}>{color.colorName}</p>
                          </div>
                            : null
                          }
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvider.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {/* Result Component */}
        <div className={`uk-margin uk-width-1-2@m uk-align-center`}>
          <div className={`uk-card uk-card-default uk-card-body uk-width-1-1 uk-text-center uk-box-shadow-large uk-border-rounded`}>
            <p className={`uk-align-center`}>{matchingCards} cards are in their correct position.</p>
          </div>
        </div>
      </div>
    </div>

  )

}

export default CardView;