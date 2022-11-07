import React, { useState } from 'react'

export default function Grid() {

    // let [abc] = useState("")
    const [state, setState] = useState("")

    var gridValues = []
    const getInputValue = (event) => {
        const userValue = event.target.value;
        const gridNum = userValue * userValue
        createGridValues(gridNum)
        return userValue
    }

    function createGridValues(cols) {
        for (let i = 0; i < cols; i++) {
            let num = Math.floor((Math.random() * cols)) + 1
            if (gridValues.includes(num)) {
                let num = Math.floor((Math.random() * cols)) + 1
                i = i - 1
            }
            else {
                gridValues.push(num)
            }
        }
        return gridValues
    }

    function printGrid() {
        console.log(gridValues)
        var [xyz] = gridValues
        console.log(xyz)
        setState([gridValues])
        // return xyz
    }

    const arrTest = [1, 2, 3, 4, 5]

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

                <button
                    onClick={printGrid}
                    className="items-center justify-between whitespace-nowrap rounded-md border border-transparent bg-[#18181B] px-6 py-3 text-base font-medium text-white shadow-sm">
                    {/* Button Text */}
                    <span className="">Submit</span>
                    <h2>{state}</h2>
                </button>
            </div>

            <div className="flex flex-col gap-2 mx-auto w-full h-[50%] max-w-[500px] text-center justify-center items-center border border-zinc-100">

                {/* {[{state}]?.map((item, idx) => { */}
                {arrTest?.map((item, idx) => {
                    return (
                        <div key={idx * 1000 * Math.random()} className="bg-white rounded-md p-[20px] max-h-[88px] text-[#18181B] my-4 flex gap-4 w-full">
                            <div className="bg-[#18181B] rounded-md h-[48px] w-[48px] p-2">
                                {/* {state} */}
                                {console.log(arrTest)}
                                {/* {item?.state[0]}                       */}
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}
