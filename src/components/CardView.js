import React, { useRef, useState } from "react";
import { colorCardsData } from "../assets/data";
  
function CardView(){
    const [people, setPeople] = useState(colorCardsData)
    
      const dragPerson = useRef(0)
      const draggedOverPerson = useRef(0)
    
      function handleSort() {
        const peopleClone = [...people]
        const temp = peopleClone[dragPerson.current]
        peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current]
        peopleClone[draggedOverPerson.current] = temp
        setPeople(peopleClone)
      }
    
      return (
        <div className={`uk-child-width-1-2@s uk-grid-match`} uk-grid={`true`}>
          {people.map((person, index) => (
            <div
                draggable
                onDragStart={() => (dragPerson.current = index)}
                onDragEnter={() => (draggedOverPerson.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className={`uk-card uk-card-default uk-card-body`} 
                >
                    {person.colorName}
                </div>
            </div>
          ))}
        </div>
      )
}


export default CardView;