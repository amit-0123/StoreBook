import React from 'react';

  function Alert(props) {
    const { alert } = props;

    if (!alert) {
        return null; // Don't render anything if alert is null
    }

    const Capitalize=(word)=>{
      if(word==="danger"){
        word="error"
      }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

    return (
        <div style={{height: '50px'}}>
        {<div className={`alert alert-${alert.type} alert-dismissible fade show fixed-top`} role="alert">
            <strong>{Capitalize(alert.type)}:</strong> {alert.msg}

            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        </div>
    );
}


export default Alert;
