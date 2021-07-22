import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./Tooltip.css"

class Tooltip extends Component {
    constructor(props) {
        super(props);

        this.el = document.createElement('div');
        // this.el.className = "tooltipHidden"

    }
    modalRoot = document.getElementById('portals-root');

    handleMouseEnter = () => {
        this.modalRoot.append(this.el)
        setTimeout(() => {
            if (this.ref) {
                this.el.className = "tooltipContainer";
                let rect = this.ref.getBoundingClientRect()
                this.el.style.left = -10 + rect.x + window.scrollX + "px";
                this.el.style.top = -30 + rect.y + window.scrollY + "px";
            }
        }, 500);

    }

    handleMouseLeave = () => {
        // this.el.className = 'tooltipHidden';
        if (this.el) this.modalRoot.removeChild(this.el)
        // this.ref.removeChild(this.el)
    }

    // handleMouseMove = (e) => {

    // }

    render() {
        const childElement = React.Children.only(this.props.children);
        const text = this.props.text

        return (
            <>
                {React.cloneElement(
                    childElement,
                    {
                        ref: ele => this.ref = ele,
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave,
                        // onMouseMove: this.handleMouseMove
                    }
                )}


                {ReactDOM.createPortal(text, this.el)}
            </>
        );
    }
}

export default Tooltip;