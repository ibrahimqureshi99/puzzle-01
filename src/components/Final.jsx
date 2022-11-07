import React, { useState, useRef } from 'react'

export default function Final() {

    // Variable Definitions
    let gridValues = []

    //useRefs
    const dragItem = useRef();
    const dragOverItem = useRef();

    // UseStates
    const [userValue, setUserValue] = useState(0)
    const [gridArray, setGridArray] = useState(gridValues)

    // Draggable Items
    const dragStart = (e, idx) => {
        dragItem.current = idx;
    };

    const dragEnter = (e, idx) => {
        dragOverItem.current = idx;
    };

    const drop = (e) => {
        const copyListItems = [...gridArray];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setGridArray(copyListItems);
        let sorted = sortGridArr(gridArray)
        if (JSON.stringify(copyListItems) === JSON.stringify(sorted)) {
            console.log("Done")
        }
    };

    function sortGridArr(arr) {
        arr.sort(function (a, b) { return a - b });
        return arr
    }


    // Get value from input field
    const getInputValue = (event) => {
        let dup = event.target.value

        // set grid columns and create unique array
        if (dup) {
            // setUserValue passes to useState 
            setUserValue(dup)

            // create unique array of n x n elements
            setGridArray(createGridValues(dup * dup))

            // Sets number of columns and rows for grid
            document.documentElement.style.setProperty('--col-num', dup)
            document.documentElement.style.setProperty('--row-num', dup)
            console.log(gridArray.length)
        }
        else {
            setGridArray([])
        }
    }

    function createGridValues(cols) {
        for (let i = 0; i < cols; i++) {
            let num = Math.floor((Math.random() * cols)) + 1
            if (gridValues.includes(num)) {
                i = i - 1
            }
            else {
                gridValues.push(num);
            }
        }
        return gridValues
    }

    return (
        <div className="w-full h-screen p-6">
            <div className="flex flex-col gap-2 mx-auto w-full h-1/4 max-w-[500px] text-center justify-center items-center m-4">
                <h1>Evaluation Test</h1>
                <input
                    type="text"
                    onChange={getInputValue}
                    className="px-4 py-4 text-4 h-4 border border-black-200 rounded-full"
                    placeholder="Enter a number here"
                />
            </div>
            <div
                style={{ gridTemplateColumns: `repeat(${userValue}, 1fr` }}
                className={`max-w-[70%] mx-auto grid grid-cols-${userValue} grid-rows-${userValue} rounded-md border border-1-gray-900 m-4`}>
                {gridArray?.map((item, idx) => {
                    return (
                        <div key={idx * 1000 * Math.random()}
                            className="p-[20px] max-h-[88px] text-[#18181B] text-center border-b border-r"
                            onDragStart={(e) => dragStart(e, idx)}
                            onDragEnter={(e) => dragEnter(e, idx)}
                            onDragEnd={drop}
                            draggable>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
