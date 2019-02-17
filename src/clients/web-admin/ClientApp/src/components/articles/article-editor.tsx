import * as React from 'react';
import { ArticleData } from '../../store/common/article';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FileSelector } from '../common/file-selector';

interface ArticleEditorProps{
    article: ArticleData;
    onChangeTitle: (newTitle: string) => void;
    onChangePublishDate: (newDate: Date) => void;
    onChangeThumbnail: (newUri: string, newAltText: string) => void;
    onChangeContent: (newContent: string) => void;
}

export class ArticleEditor extends React.Component<ArticleEditorProps>{

    private handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeTitle(event.currentTarget.value);
    }

    private handleChangePublishDate = (newDate: Date) => {
        this.props.onChangePublishDate(newDate);
    }

    private handleChangeThumbnailAltText = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeThumbnail(this.props.article.thumbnailLocation, event.currentTarget.value);
    }
    
    private handleChangeThumbnailLocation = (newValue: string) => {
        this.props.onChangeThumbnail(newValue, this.props.article.thumbnailAltText);
    }

    private handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeContent(event.currentTarget.value);
    }
    

    render(){
        const {article: {title, publishDate, content, thumbnailLocation, thumbnailAltText, tagIds}} = this.props;
        return <Form>
            <FormGroup>
                <Label>Title:</Label>
                <Input type="text" placeholder="Article title" value={title} onChange={this.handleChangeTitle} />
            </FormGroup>
            <FormGroup>
                <Label>Publish Date / Time:</Label>
                <div>
                    <DatePicker
                        className="form-control"
                        selected={new Date(publishDate)}
                        onChange={this.handleChangePublishDate} />
                </div>
            </FormGroup>
            <Row>
                <Col width={6}>
                    <FormGroup>
                        <Label>Thumbnail image:</Label>
                        <FileSelector placeholderText="Image" value={thumbnailLocation} onChange={this.handleChangeThumbnailLocation} />
                    </FormGroup>
                </Col>
                <Col width={6}>
                    <FormGroup>
                        <Label>Thumbnail alt text:</Label>
                        <Input type="text" placeholder="Alt text" value={thumbnailAltText} onChange={this.handleChangeThumbnailAltText} />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label>Content:</Label>
                <Input type="textarea" value={content} onChange={this.handleChangeContent} style={{height: 400}} />
            </FormGroup>
        </Form>
    }
}