import React, { useState, useRef } from 'react'

export default function Final() {

    // Variable Definitions
    let gridValues = []

    //useRefs
    const dragItem = useRef()
    const dragOverItem = useRef()
    // const dragItemResp = useRef()
    // const dragItemRespTwo = useRef()
    // const dragOverItemResp = useRef()
    // const dragOverItemEnd = useRef()
    const firstValue = useRef()
    const secondValue = useRef()

    // UseStates
    const [userValue, setUserValue] = useState(0)
    const [gridArray, setGridArray] = useState(gridValues)
    const [cardBG, setCardBG] = useState("inherit")

    // Draggable Items on desktop
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
            alert("Welcome to the team!")
        }
    };

    function handleStart(e, idx) {
        if (firstValue.current) {
            secondValue.current = idx;
            console.log("Second selected value index: ", secondValue.current)
            const copyListItemsResp = [...gridArray];
            console.log("Copy list: ", copyListItemsResp)
            console.log("Copy list: ", copyListItemsResp)
            console.log("First selected value: ", firstValue.current)
            const dragItemContentRespOne = copyListItemsResp[firstValue.current];
            const dragItemContentRespTwo = copyListItemsResp[secondValue.current];
            console.log("First selected value index: ", firstValue.current)
            // console.log("First selected value content: ", dragItemContentResp)
            copyListItemsResp.splice(firstValue.current, 1)
            copyListItemsResp.splice(firstValue.current, 0, dragItemContentRespTwo)
            copyListItemsResp.splice(secondValue.current, 1)
            copyListItemsResp.splice(secondValue.current, 0, dragItemContentRespOne)
            // console.log("Copy list after 1st splice: ", copyListItemsResp)
            // console.log("Copy list after 2nd splice: ", copyListItemsResp)
            firstValue.current = null
            secondValue.current = null
            setCardBG("inherit")
            console.log("firstValue: ", firstValue.current)
            console.log("secondValue: " ,secondValue.current)
            setGridArray(copyListItemsResp);
            let sorted = sortGridArr(gridArray)
            if (JSON.stringify(copyListItemsResp) === JSON.stringify(sorted)) {
                alert("Welcome to the team!")
            }
        }
        else {
            firstValue.current = idx
            setCardBG("zinc-200")
            // console.log("First selected value: ", firstValue.current )
        }
    }

    // function handleMove(e, idx) {
    //     dragItemRespTwo.current = idx;
    //     console.log("On Handle Move: ", dragItemRespTwo.current)
    // }

    // function handleCancel(e, idx) {
    //     dragOverItemResp.current = idx;
    //     console.log("On Handle Cancel: ", dragOverItemResp.current)
    // }


    // function dropResp (e, idx) {
    //     dragOverItemEnd.current = idx;
    //     console.log("On Handle End: ", dragOverItemEnd.current)
    //     // const copyListItemsResp = [...gridArray];
    //     // console.log("copyListItems" ,copyListItemsResp)
    //     // const dragItemContentResp = copyListItemsResp[dragItemResp.current];
    //     // console.log("dragItemContent: ", dragItemContentResp)
    //     // copyListItemsResp.splice(dragItemResp.current, 1);
    //     // console.log("copyListItemsResp after 1st splice: ", copyListItemsResp)
    //     // copyListItemsResp.splice(dragOverItemResp.current, 0, dragItemContentResp);
    //     // console.log("copyListItemsResp after 2nd splice: ", copyListItemsResp)
    //     // console.log("New Arr: ", copyListItemsResp)
    //     // dragItemResp.current = null;
    //     // dragOverItemResp.current = null;
    //     // setGridArray(copyListItemsResp);
    //     // let sorted = sortGridArr(gridArray)
    //     // if (JSON.stringify(copyListItemsResp) === JSON.stringify(sorted)) {
    //     //     alert("Welcome to the team!")
    //     // }
    // };

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
        <div className='bg-black h-screen flex'>
            <div className="mx-auto my-auto p-6 bg-white md:w-[70%] w-full rounded-md">
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
                    className={`md:max-w-[70%] mx-auto grid grid-cols-${userValue} grid-rows-${userValue} rounded-md border border-1-gray-900 m-4`}>
                    {gridArray?.map((item, idx) => {
                        return (
                            <div key={idx * 1000 * Math.random()}
                                className={`p-[20px] max-h-[88px] text-[#18181B] text-center border-b border-r bg-${cardBG}`}

                                // Touch functions
                                onTouchStart={(e) => handleStart(e, idx)}

                                // Drag functions
                                onDragStart={(e) => dragStart(e, idx)}
                                onDragEnter={(e) => dragEnter(e, idx)}
                                onDragEnd={drop}
                                draggable>


                                {item}
                            </div>
                        )
                    })}
                </div>
                <div className='visible md:invisible bg-orange-400 rounded-md p-2 text-sm'>
                    <h2 className='text-red-600 mb-1'><span className='font-bold mr-2'>!</span>Important</h2>
                    <p>To move tiles on mobile, please tap on two tiles to swap. Once selected, the grid turns gray. Select second tile to swap with first tile.</p>
                </div>
            </div>
        </div>
    )
}
