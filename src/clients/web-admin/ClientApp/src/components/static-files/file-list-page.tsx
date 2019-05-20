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

    private handleEditClick = (file: StaticFileData) => {

    };

    public render(){
        const {isLoading, fileList} = this.props;
        if(isLoading){
            return "Loading...";
        }
        else{
            const DateCellFormatter : TableCellRenderer = ({ value }) => new Date(value).toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit" });
            return <ReactTable data={fileList} columns={[
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
            ]}/>
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



interface PriamryActionPanelProps{
    uri: string;
}

const PriamryActionPanel : React.FC<PriamryActionPanelProps> = ({uri}) => {
    const absoluteUri = `https://localhost:13101/v1/static/files/${uri}`;
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