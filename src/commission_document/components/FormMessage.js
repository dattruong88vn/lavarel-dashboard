import React from 'react';

const FormMessage = props => {
    const style = {
        marginBottom: '15px', 
        color: props.message.type ? 'green' : 'red',
        fontWeight: 'bold',
        textAlign: 'center' 
    };
    return (
        <div style={style}>{props.message.content}</div>
    );
};

export default FormMessage;