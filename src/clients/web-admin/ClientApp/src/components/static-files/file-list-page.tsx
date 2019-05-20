import * as React from "react";
import { connect } from "react-redux";
import { StaticFileData } from "../../store/common/static-file";
import { ApplicationState } from "../../store/reducers";
import { fetchStaticFiles } from "../../store/actions/static-file";
import { VoidFunctionOf } from "../../store/common";

interface StateProps{
    isLoading: boolean;
    fileList: StaticFileData[];
}

type DispatchProps = {
    fetchStaticFiles: VoidFunctionOf<typeof fetchStaticFiles>
};

type FileListPageImplProps = StateProps & DispatchProps;



class FileListPageImpl extends React.Component<FileListPageImplProps>{

    public componentDidMount(){
        this.props.fetchStaticFiles();
    }

    public render(){
        const {isLoading, fileList} = this.props;
        if(isLoading){
            return "Loading...";
        }
        else{
            return "Loaded";
        }
    }
}



const mapStateToProps = (state: ApplicationState) : StateProps => {
    return {
        isLoading: state.staticFile.isRefreshing,
        fileList: state.staticFile.fileList
    };
}

export const FileListPage = connect(mapStateToProps, {fetchStaticFiles})(FileListPageImpl);