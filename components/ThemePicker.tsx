import React from 'react'
import {AiOutlineCheckCircle} from "react-icons/ai"



const ThemePicker = ({onChange = () => {}}: any ) => {
    const [selected, setSelected] = React.useState<string>("")
    const colors = [
        "#310099",
        "#FFDF39",
        "#D0B8AC",
        "#990000",
        "#282828",
        "#004F24",
    ]

    React.useEffect(() => {

        onChange(selected)
      
    }, [selected])
    
  return (
    <div className='flex items-center gap-3 mt-3'>
        {colors.map((color, index) => (
            <div onClick={() => setSelected(color)} key={index} className={`h-8 w-8 ${selected === color && ("border-white border-2")} flex items-center justify-center rounded ${'bg-['+color+']'}`}>
                {selected === color && (<AiOutlineCheckCircle  className='text-white' />)}
            </div>
        ))}
        

    </div>
  )
}

export default ThemePicker