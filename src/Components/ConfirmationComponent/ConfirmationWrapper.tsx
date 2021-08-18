import React, { CSSProperties } from 'react';
import Styles from './index.module.css';

interface Cordinates {
  x: Number;
  y: Number;
}

/* ------------------------ Purpose of this component ----------------------- */


/* -------------------------------------------------------------------------- */
/*                  This is a component can be used to show a  confirmation message before doing any action this component will wrap the specific action button               */
/* -------------------------------------------------------------------------- */

export default function ConfirmationWrapper({
  message,
  handler,
  children,
  position,
}: {
  message: String;
  handler: Function;
  children : React.ReactNode ;
  position?: Cordinates;
}) {
  
  // const container = React.useRef()
  const [show, setShow] = React.useState(false)

  // React.useEffect(() => {
    
  //   return () => {
      
  //   }
  // }, [])
  const containerStyle = {
    display : 'flex',
    transform:
      position
        ? `translate(${position.x}px,${position.y}px)`
        : 'none',
  };
  return (
    <div onClick={()=> setShow(!show)}>
    {
    show ?
    <div>
    {children}
    <div onMouseLeave={()=>setShow(false)} className={Styles.mainContainer} style={containerStyle} >
      <div className={Styles.message}>{message}</div>
      <div className={Styles.SelectionContainer}>
        <button className={Styles.yesBtn} onClick={() => handler()}>
          Yes
        </button>
        <button
          className={Styles.noBtn}
          onClick={() => setShow(!show)}
        >
          No
        </button>
      </div>
    </div>
    </div>
    :
    <>
    {children}
    </>
}
</div>
  );
}
