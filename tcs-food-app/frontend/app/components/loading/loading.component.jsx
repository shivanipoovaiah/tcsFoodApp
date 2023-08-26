import { connect } from 'react-redux';
import React from "react";
import { ActivityIndicator, View } from 'react-native';
import { loadingStyle } from "./loading.style";

const LoadingComponent = (props) => {
    return (
        props.loadingState.show?
        <View style={loadingStyle.backdrop}>
            <ActivityIndicator animating={true} color={loadingStyle.spinner.color}></ActivityIndicator>
        </View>
        :null
    )
}

const mapStateToProps = (store) => ({
    loadingState : store.loading
});

export default connect (mapStateToProps)(LoadingComponent);