import React from 'react';


function ChartRow(props){
    console.log(props)
    return (
                <tr>
                    <td>{props.cat_name}</td>
                    <td>{props.tot}</td>
                    <td>
                        <ul>
                            {props.Categories.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )}
                        </ul>
                    </td>
                    <td>{props.Awards}</td>
                </tr>
            )
    }
    
        

export default ChartRow;