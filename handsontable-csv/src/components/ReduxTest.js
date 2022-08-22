//ReduxTest.js

import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";

const ReduxTest = ({ fileUploadFlag, flagOn, flagOff }) => {
    const onClickShowFlag = () => {
        console.log(fileUploadFlag);
    }

    const onClickFlagOn = () => {
        flagOn();
    }

    const onClickFlagOff = () => {
        flagOff();
    }

    return (
        <div>
            <div>Redux Test</div>       
            <button onClick={onClickShowFlag}>flag state</button>
            <button onClick={onClickFlagOn}>flag on</button>
            <button onClick={onClickFlagOff}>flag off</button>       
            <ul>{JSON.stringify(fileUploadFlag)}</ul>     
        </div>
    );
};

/* mapStateToProps : store로부터 state를 가져다 준다. */
function mapStateToProps(state /* redux store에서 온 state */ , ownProps /* component의 props */) {
    //console.log(state);
    return { fileUploadFlag: state }; /* mapStateToProps는 state를 return 받기를 원한다 */
}

function mapDispatchToProps(dispatch, ownProps) {
    //console.log(dispatch);

    return { /* 해당 component의 props에서 받아올 수 있게 된다. */
        flagOn : () => dispatch(actionCreators.flagOn()),
        flagOff : () => dispatch(actionCreators.flagOff()),     
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);
/* connect()는 home으로 보내는 props에 추가될 수 있도록 허용해준다. */
/* 만약 mapStateToProps가 필요 없다면 null, mapDispatchToProps로 하면 된다. */