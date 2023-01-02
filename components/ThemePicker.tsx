import React from 'react'
import {AiOutlineCheckCircle} from "react-icons/ai"



const ThemePicker = ({onChange = () => {}}: any ) => {
    const [selected, setSelected] = React.useState<string>("")
    // const colors = [
    //     "#310099",
    //     "#FFDF39",
    //     "#D0B8AC",
    //     "#990000",
    //     "#282828",
    //     "#004F24",
    // ]

    const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

    React.useEffect(() => {

        onChange(selected)
      
    }, [selected])
    
  return (
    <div className='flex items-center gap-3 mt-3 flex-wrap'>
        {colors.map((color, index) => (
            <div style={{backgroundColor:color}} onClick={() => setSelected(color)} key={index} className={`h-8 w-8 ${selected === color && ("border-white border-2")} flex  items-center justify-center rounded`}>
                {selected === color && (<AiOutlineCheckCircle  className='text-white' />)}
            </div>
        ))}
        

    </div>
  )
}

export default ThemePicker