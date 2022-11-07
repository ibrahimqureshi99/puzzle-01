import React, { useState } from 'react'

export default function Grid() {

    // Variable Definitions
    let gridValues = []

    // UseStates

    const [userValue, setUserValue] = useState(0)
    const [gridArray] = useState(gridValues)


    // Get value from input field
    const getInputValue = (event) => {
        let dup = event.target.value

        // set grid columns and create unique array
        setUserValue(dup)
        createGridValues(dup * dup)
        if (gridArray.length > 0) {
            document.documentElement.style.setProperty('--col-num', dup)
            console.log(gridArray.length)
        }
        else {
            document.documentElement.style.setProperty('--col-num', 0)
            console.log(gridArray.length)
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
        <div className="w-full bg-zinc-200">
            <div className="flex flex-col gap-2 mx-auto w-full h-[50%] max-w-[500px] text-center justify-center items-center border border-zinc-100">
                <h1>Evaluation Test</h1>
                <input
                    type="text"
                    onChange={getInputValue}
                    className="px-4 py-4 text-4 h-4 border border-black-200 rounded-md"
                    placeholder="Enter a number here"
                />
            </div>
            <div className={`max-w-[70%] mx-auto border border-red-400 scheduler-grid`}>
                {gridArray?.map((item, idx) => {
                    return (
                        <div key={idx * 1000 * Math.random()} className="bg-white p-[20px] max-h-[88px] text-[#18181B]">
                            <h1>{item}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
