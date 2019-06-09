import * as React from "react";
import { connect } from "react-redux";
import { StaticFileData } from "../../store/common/static-file";
import { ApplicationState } from "../../store/reducers";
import { fetchStaticFiles } from "../../store/actions/static-file";
import { VoidFunctionOf } from "../../store/common";
import ReactTable, { TableCellRenderer } from "react-table";
import 'react-table/react-table.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt, faCopy, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './file-list-page.module.css';
import { FileEditorModal, UploadedFile } from "./file-editor-modal";
import { updateFile, createFile } from "../../store/actions/static-file";
import { Button } from "reactstrap";

interface StateProps{
    isLoading: boolean;
    fileList: StaticFileData[];
}

type DispatchProps = {
    fetchStaticFiles: VoidFunctionOf<typeof fetchStaticFiles>;
    updateFile: VoidFunctionOf<typeof updateFile>;
    createFile: VoidFunctionOf<typeof createFile>;
};

type FileListPageImplProps = StateProps & DispatchProps;

interface FileListPageImplState{
    editedItem: StaticFileData | undefined;
    uploadModalOpen: boolean;
}

class FileListPageImpl extends React.Component<FileListPageImplProps, FileListPageImplState>{
    public readonly state : FileListPageImplState = {
        editedItem: undefined,
        uploadModalOpen: false
    };

    public componentDidMount(){
        this.props.fetchStaticFiles();
    }

    private handleEditClick = (file: StaticFileData) => {
        this.setState({
            editedItem: file
        });
    };

    private handleModalDismiss = () => {
        this.setState({
            editedItem: undefined,
            uploadModalOpen: false
        })
    };

    private handleSave = (file: UploadedFile) => {
        const editedItem = this.state.editedItem;
        if(editedItem !== undefined){
            this.props.updateFile(editedItem.id, file.displayName, file.mimeType, file.content);
            this.setState({
                editedItem: undefined
            });
        }
        else if(this.state.uploadModalOpen){
            this.props.createFile(file.content as string, file.mimeType, file.displayName);
            this.setState({
                uploadModalOpen: false
            });
        }
    };

    private handleUploadClick = () => {
        this.setState({
            uploadModalOpen: true
        });
    };

    public render(){
        const {isLoading, fileList} = this.props;
        if(isLoading){
            return "Loading...";
        }
        else{
            const DateCellFormatter : TableCellRenderer = ({ value }) => new Date(value).toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit" });
            return <div className="mt-3">
                <div className="d-flex justify-content-end mb-2">
                    <Button outline color="primary" onClick={this.handleUploadClick}>Upload file</Button>
                </div>
                <ReactTable 
                    data={fileList}
                    defaultSorted={[{id: 'uploadDate', desc: true}]}
                    columns={[
                        {
                            id: "primaryActions",
                            width: 80,
                            Cell: ({original}) => <PriamryActionPanel uri={original.canonicalUri} />
                        },
                        {
                            accessor: "displayName",
                            Header: "Name"
                        },
                        {
                            accessor: "mimeType",
                            Header: "MIME Type",
                            width: 120
                        },
                        {
                            accessor: "modifyDate",
                            Header: "Modify date",
                            Cell: DateCellFormatter,
                            width: 160
                        },
                        {
                            accessor: "uploadDate",
                            Header: "Upload date",
                            Cell: DateCellFormatter,
                            width: 160
                        },
                        {
                            accessor: "secondaryActions",
                            Cell: ({original}) => <SecondaryActionPanel file={original} onEditClick={() => this.handleEditClick(original)}/>,
                            width: 50
                        }
                    ]}
                    />
                {this.renderEditorModal()}
                {this.renderUploadModal()}
            </div>
        }
    }

    private renderEditorModal(){
        const {editedItem} = this.state;
        if(!editedItem)
            return null;

        const {id, mimeType, displayName} = editedItem;

        return <FileEditorModal 
            key={id}
            isOpen={true}
            contentRequired={false}
            initialDisplayName={displayName}
            initialMimeType={mimeType}
            onDismiss={this.handleModalDismiss}
            onSave={this.handleSave}
            />;
    }

    private renderUploadModal(){
        const {uploadModalOpen} = this.state;

        return <FileEditorModal
            isOpen={uploadModalOpen}
            contentRequired={true}
            onDismiss={this.handleModalDismiss}
            onSave={this.handleSave}
            />;
    }
}


const mapStateToProps = (state: ApplicationState) : StateProps => {
    return {
        isLoading: state.staticFile.isRefreshing,
        fileList: state.staticFile.fileList
    };
}

export const FileListPage = connect(
    mapStateToProps, 
    {fetchStaticFiles, updateFile, createFile}
)(FileListPageImpl);



interface PriamryActionPanelProps{
    uri: string;
}

const PriamryActionPanel : React.FC<PriamryActionPanelProps> = ({uri}) => {
    const absoluteUri = `https://static.marcelltoth.net/files/${uri}`;
    return <>
        <a href={absoluteUri} className={styles['file-icon']} target="_blank">
            <FontAwesomeIcon icon={faCloudDownloadAlt} />
        </a>
        <a href="#" onClick={(e) => {
            copyString(absoluteUri);
            e.preventDefault();
        }}>
            <FontAwesomeIcon icon={faCopy} />
        </a>
    </>
}

interface SecondaryActionPanelProps{
    file: StaticFileData;
    onEditClick: () => void;
}

const SecondaryActionPanel : React.FC<SecondaryActionPanelProps> = ({file, onEditClick}) => {
    return <a href="#" className={styles['file-icon']} onClick={(e) => {
        onEditClick();
        e.preventDefault();
    }}>
        <FontAwesomeIcon icon={faEdit} />
    </a>
}

function copyString(string: string){
    var textField = document.createElement('textarea');
    textField.innerText = string;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
}