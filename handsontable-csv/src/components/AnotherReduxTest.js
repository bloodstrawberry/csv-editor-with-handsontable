//AnotherReduxTest.js

import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";

const AnotherReduxTest = ({ toDos, flagOn, flagOff }) => {
    const onClickShowFlag = () => {
        console.log(toDos);
    }

    const onClickFlagOn = () => {
        flagOn();
    }

    const onClickFlagOff = () => {
        flagOff();
    }

    return (
        <div>
            <div>Another Redux Test</div>       
            <button onClick={onClickShowFlag}>flag state</button>
            <button onClick={onClickFlagOn}>flag on</button>
            <button onClick={onClickFlagOff}>flag off</button>       
            <ul>{JSON.stringify(toDos)}</ul>     
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        flagOn : () => dispatch(actionCreators.flagOn()),
        flagOff : () => dispatch(actionCreators.flagOff()),     
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(AnotherReduxTest);