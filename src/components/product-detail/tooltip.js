import React from 'react';
import withApp from '../../higherorder';
const ToolTip = (props) => {
    return (<div className="sf-fsd-tooltip">{props.text}
        <span className={'sf-fsd-tooltiptext ' +( props.toolTipLarge )}><div className="temp" style={{marginBottom: "5px", display:'flex'}}>{props.children}</div><div className="sf-fsd-tooltiptext-tip" ></div></span>
    </div>
    );
}
export default withApp(ToolTip)