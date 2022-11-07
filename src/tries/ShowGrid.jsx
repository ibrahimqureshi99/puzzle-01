import React from 'react'

export default function ShowGrid({xstate}) {
 
    
    return (
            <div>
                {xstate?.map((item, idx) => {
                    return (
                        <div key={idx * 1000 * Math.random()} className="bg-white rounded-md p-[20px] max-h-[88px] text-[#18181B] my-4 flex gap-4 w-full">
                            {/* <h1>{xstate[item]}</h1> */}
                            {console.log(item)}
                        </div>)
                })}
            </div>
    )
}