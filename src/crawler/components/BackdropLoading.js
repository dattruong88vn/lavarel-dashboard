import React from 'react';
import Spinner from '../../commonComponents/spinner/Spinner';

const style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: '100000'
};

const BackdropLoading = () => (
    <div style={style}></div>
);

export default BackdropLoading;