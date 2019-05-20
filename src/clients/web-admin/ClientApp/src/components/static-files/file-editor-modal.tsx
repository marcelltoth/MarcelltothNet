import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FileSelector } from '../common/file-selector';

export interface UploadedFile{
    displayName: string;
    mimeType: string;
    content?: string;
}

interface FileEditorModalProps{
    isOpen: boolean;
    onSave: (file: UploadedFile) => void;
    onDismiss: () => void;

    initialDisplayName?: string;
    initialMimeType?: string;

    contentRequired: boolean;
}

interface FileEditorModalState{
    displayName: string;
    mimeType: string;
    content: string | undefined;
}

export class FileEditorModal extends React.PureComponent<FileEditorModalProps, FileEditorModalState>{

    public readonly state : FileEditorModalState = {
        displayName: this.props.initialDisplayName || "",
        mimeType: this.props.initialMimeType || "",
        content: undefined
    };

    handleDismiss = () => {
        this.setState({
            displayName: this.props.initialDisplayName || "",
            mimeType: this.props.initialMimeType || "",
            content: undefined
        });

        this.props.onDismiss();
    };

    handleSave = () => {
        this.props.onSave({
            displayName: this.state.displayName,
            mimeType: this.state.mimeType,
            content: this.state.content
        });
    };

    handleFileUploaded = (newContent: string, mimeType?: string) => {
        this.setState({
            content: newContent,
            mimeType: mimeType || this.state.mimeType
        });
    };

    handleChangeMimeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            mimeType: event.currentTarget.value
        });
    };

    handleChangeDisplayName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            displayName: event.currentTarget.value
        });
    };

    render(){
        const {isOpen, contentRequired, onDismiss} = this.props;
        const {content, displayName, mimeType} = this.state;

        return <Modal isOpen={isOpen}>
            <ModalHeader>Edit file</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>File content:</Label>
                        <FileSelector placeholderText="File" onChange={this.handleFileUploaded} requestedFormat="base64" />
                    </FormGroup>
                    <FormGroup>
                        <Label>MIME type:</Label>
                        <Input type="text" placeholder="MIME type of file" value={mimeType} onChange={this.handleChangeMimeType} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Display Name:</Label>
                        <Input type="text" placeholder="Display Name / Alt text" value={displayName} onChange={this.handleChangeDisplayName} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.handleSave} disabled={contentRequired && !content}>Save</Button>
                <Button color="danger" onClick={onDismiss}>Cancel</Button>
            </ModalFooter>
        </Modal>
    }
}